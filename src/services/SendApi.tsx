import { Prepare, RippleAPI, TransactionJSON } from "ripple-lib";
import { FormattedSubmitResponse } from "ripple-lib/dist/npm/transaction/submit";
import { rippleTx } from "./TransactionApi";

export default function SendApi(storageKey: string, dest: string, currency: string, amount: number, issuerAccount: string) {
    const pd = localStorage.getItem(storageKey)
    if (pd == null) {
        throw new Error("Not found creds")
    }
    const profileData = JSON.parse(String(localStorage.getItem(storageKey)));;
    const api = new RippleAPI({ server: profileData.server });
    const fee = '12'
    const maxLedgerVersionOffset = 5


    console.log("Reciever address: {}", dest)

    async function doPrepare(): Promise<Prepare> {
        let payload:TransactionJSON;
        console.log("isConected: {} " ,api.isConnected())


        if (currency !== 'XRP') {
            payload = {
                "TransactionType": "Payment",
                "Account": profileData.accAddress,
                "Destination": dest,
                "Amount": {
                    "currency": currency,
                    "value": String(amount),
                    "issuer": issuerAccount
                    // "issuer": issuerAccount ? issuerAccount : profileData.accAddress // TODO ???

                },
                "Fee": fee
            }

        }else{
            payload = {
                "TransactionType": "Payment",
                "Account": profileData.accAddress,
                 "Amount": api.xrpToDrops(String(amount)), 
                "Destination": dest
              }

        }


        console.log("Payload: {} ", payload)

        const preparedTx = await api.prepareTransaction(payload, {
            // Expire this transaction if it doesn't execute within ~5 minutes:
            "maxLedgerVersionOffset": maxLedgerVersionOffset
        })
        const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
        console.log("Prepared transaction instructions:", preparedTx.txJSON)
        console.log("Transaction cost:", preparedTx.instructions.fee, "XRP")
        console.log("Transaction expires after ledger:", maxLedgerVersion)
        return preparedTx
    }



    // if(true){
    //     return rippleTx(apiInit, profileData, doPrepare(apiInit))
    // }

    // use txBlob from the previous example
    async function doSubmit(txBlob: any) : Promise<FormattedSubmitResponse>{
        const latestLedgerVersion = await api.getLedgerVersion()

        const result = await api.submit(txBlob)


        console.log("Tentative result code:", result.resultCode)
        console.log("Tentative result message:", result.resultMessage)

        // Return the earliest ledger index this transaction could appear in
        // as a result of this submission, which is the first one after the
        // validated ledger at time of submission.
        console.log("The earliest ledger index for tx:",  latestLedgerVersion+1)

        return result
    }


    const promise = api.connect().then(() => {
        console.log('Connected');
        return doPrepare()
    }).then(prepared => {
        console.log('Order Prepared: ' + prepared);

        const response = api.sign(prepared.txJSON, profileData.accSecret)
        const txID = response.id
        console.log("Identifying hash:", txID)
        const txBlob = response.signedTransaction
        console.log("Signed blob:")

        return txBlob;
    }).then(blob => {
        console.log('Order Prepared' + blob);
        return doSubmit(blob);
    // }).then((ladgerNumber) => {
    //     console.log('ledgerNumber: ', ladgerNumber);
    //     return api.on('ledger', ledger => {
    //         // console.log("Ledger version", ledger.ledgerVersion, "was validated??.")
    //         if (ledger.ledgerVersion > ledger.maxLedgerVersion) {
    //             console.log("If the transaction hasn't succeeded by now, it's expired")
    //         }
    //     })
    }).then((result) => {
        console.log('Result:' + result.resultCode);
        api.disconnect()
        //TODO return getTran(txIdGlobal)
        return result
    })
    // }).then(() => {
    //     return api.disconnect()
    // }).catch(console.error);

    return promise

    //--- end main ----

}