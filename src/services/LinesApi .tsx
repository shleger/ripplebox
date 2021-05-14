import { RippleAPI } from "ripple-lib";

export default function LinesApi(storageKey: string) {
    const pd = localStorage.getItem(storageKey)
    if (pd == null) {
        throw new Error("Not found creds for LinesApi")
    }
    const profileData = JSON.parse(String(localStorage.getItem(storageKey)));;
    const api = new RippleAPI({ server: profileData.server });

    const promise = api.connect().then(() => {
        console.log('Connected')

        return api.getTrustlines(profileData.accAddress)
    }).then(response => {
        console.log("account_lines response:", JSON.stringify(response))

        // Disconnect and return
        return response
    }).then((response) => {
        api.disconnect()
        // .then(() => {
        //     console.log('Disconnected')
        //     process.exit()
        // })
        return response
    }).catch(console.error)

    return promise

}

//https://testnet.xrpl.org/ --see explorer
export function CreateTrustLineApi(storageKey: string, dest:string) {

    const pd = localStorage.getItem(storageKey)
    if (pd == null) {
        throw new Error("Not found creds for LinesApi")
    }
    const profileData = JSON.parse(String(localStorage.getItem(storageKey)));;
    const api = new RippleAPI({ server: profileData.server });

    console.log("Reciever address: {}", dest)

    async function doPrepare() {
        const trustLine = {
            "currency": "USD",
            // "currency": "EUR",
            "counterparty": dest,
            "limit": "100",
            // "qualityIn": 0.91,
            // "qualityOut": 0.87,
            "ripplingDisabled": false,
            "frozen": false,
            "memos": [
                {
                    "type": "test_trustline",
                    "format": "text/plain",
                    "data": "extend trustline for ...DgB67x address"
                }
            ]
        };
        const preparedTx = await api.prepareTrustline(profileData.accAddress, trustLine);
        const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
        console.log("Prepared transaction instructions:", preparedTx.txJSON)
        console.log("Transaction cost:", preparedTx.instructions.fee, "XRP")
        console.log("Transaction expires after ledger:", maxLedgerVersion)
        return preparedTx.txJSON
    }

    // use txBlob from the previous example
    async function doSubmit(txBlob:any) {
        const latestLedgerVersion = await api.getLedgerVersion()

        const result = await api.submit(txBlob)


        console.log("Tentative result code:", result.resultCode)
        console.log("Tentative result message:", result.resultMessage)

        // Return the earliest ledger index this transaction could appear in
        // as a result of this submission, which is the first one after the
        // validated ledger at time of submission.
        return latestLedgerVersion + 1
    }

    async function getTran(txID:any, minLedgerVersion:number) {
        try {
           const tx = await api.getTransaction(txID, { minLedgerVersion: minLedgerVersion })
            console.log("Transaction result:", tx.outcome.result)
            console.log("Balance changes:", JSON.stringify(tx.outcome.balanceChanges))
        } catch (error) {
            console.log("Couldn't get transaction outcome:", error)
        }
    }

    // ------main----- dont forget apply ladger: rippled ledger_accept --conf ~/dev/ripple/cfg/rippled.cfg

    var txIdGlobal;

    api.connect().then(() => {
        console.log('Connected');
        return doPrepare()
    }).then(prepared => {
        console.log('Order Prepared: ' + prepared);

        const response = api.sign(prepared, profileData.accSecret)
        const txID = response.id
        txIdGlobal = txID
        console.log("Identifying hash:", txID)
        const txBlob = response.signedTransaction
        console.log("Signed blob:")

        return txBlob;
    }).then(blob => {
        console.log('Order Prepared' + blob);
        return doSubmit(blob);
    }).then((ladgerNumber) => {
        console.log('ledgerNumber: ', ladgerNumber);
        return api.on('ledger', ledger => {
            console.log("Ledger version", ledger.ledgerVersion, "was validated?.")
            if (ledger.ledgerVersion > ledger.maxLedgerVersion) {
                console.log("If the transaction hasn't succeeded by now, it's expired")
            }
        })
    }).then((validated) => {
        console.log('validated');
        //TODO return getTran(txIdGlobal)
        
    }).then(() => {
        api.disconnect().then(() => {
            console.log('api disconnected');
            // process.exit();
        });
    }).catch(console.error);

    //--- end main ----

}