import { RippleAPI } from "ripple-lib";
import { FormattedOrderSpecification } from "ripple-lib/dist/npm/common/types/objects";
import { FormattedSubmitResponse } from "ripple-lib/dist/npm/transaction/submit";

export default function ExchangeApi(storageKey: string, order: FormattedOrderSpecification) {

    console.log("Place order: " + JSON.stringify(order))

    const pd = localStorage.getItem(storageKey)
    if (pd == null) {
        throw new Error("Not found creds")
    }

    //TODO refactor in one method doSubmit for exchange and send
    const profileData = JSON.parse(String(localStorage.getItem(storageKey)));;
    const api = new RippleAPI({ server: profileData.server });

    order.totalPrice.counterparty = profileData.counterParty
    order.quantity.counterparty = profileData.counterParty

    async function doPrepare() {

        const preparedTx = await api.prepareOrder(profileData.accAddress, order)
        const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
        console.log("Prepared transaction instructions:", preparedTx.txJSON)
        console.log("Transaction cost:", preparedTx.instructions.fee, "XRP")
        console.log("Transaction expires after ledger:", maxLedgerVersion)
        return preparedTx
    }

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
    }).then((result) => {
        console.log('Result:' , result);
        api.disconnect()
        return result
    })

    return promise


}