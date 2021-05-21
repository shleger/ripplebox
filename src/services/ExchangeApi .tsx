import { RippleAPI } from "ripple-lib";
import { FormattedOrderSpecification } from "ripple-lib/dist/npm/common/types/objects";

export default function ExchangeApi(storageKey: string, order: FormattedOrderSpecification) {

    console.log("Place order: " + JSON.stringify(order))

    const pd = localStorage.getItem(storageKey)
    if (pd == null) {
        throw new Error("Not found creds")
    }
    const profileData = JSON.parse(String(localStorage.getItem(storageKey)));;
    const api = new RippleAPI({ server: profileData.server });

    async function doPrepare() {

        const preparedTx = await api.prepareOrder(profileData.accAddress, order)
        const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
        console.log("Prepared transaction instructions:", preparedTx.txJSON)
        console.log("Transaction cost:", preparedTx.instructions.fee, "XRP")
        console.log("Transaction expires after ledger:", maxLedgerVersion)
        return preparedTx.txJSON
    }

    // use txBlob from the previous example
    async function doSubmit(txBlob: any) {
        const latestLedgerVersion = await api.getLedgerVersion()

        const result = await api.submit(txBlob)


        console.log("Tentative result code:", result.resultCode)
        console.log("Tentative result message:", result.resultMessage)

        // Return the earliest ledger index this transaction could appear in
        // as a result of this submission, which is the first one after the
        // validated ledger at time of submission.
        return latestLedgerVersion + 1
    }


    const promise = api.connect().then(() => {
        console.log('Connected');
        return doPrepare()
    }).then(prepared => {
        console.log('Order Prepared: ' + prepared);

        const response = api.sign(prepared, profileData.accSecret)
        const txID = response.id
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
            console.log("Ledger version", ledger.ledgerVersion, "was validated??.")
            if (ledger.ledgerVersion > ledger.maxLedgerVersion) {
                console.log("If the transaction hasn't succeeded by now, it's expired")
            }
        })
    }).then((validated) => {
        console.log('validated');
        //TODO return getTran(txIdGlobal)
    }).then(() => {
        return api.disconnect()
    }).catch(console.error);

    return promise

    //--- end main ----

}