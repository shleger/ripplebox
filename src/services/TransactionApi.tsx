import { Prepare, RippleAPI } from "ripple-lib";
import { FormattedSubmitResponse } from "ripple-lib/dist/npm/transaction/submit";


// use txBlob from the previous example
async function doSubmit(txBlob: any, api: RippleAPI): Promise<FormattedSubmitResponse> {

  // const fee = '12'
  // const maxLedgerVersionOffset = 5
  const latestLedgerVersion = await api.getLedgerVersion()

  const result = await api.submit(txBlob)


  console.log("Tentative result code:", result.resultCode)
  console.log("Tentative result message:", result.resultMessage)

  // Return the earliest ledger index this transaction could appear in
  // as a result of this submission, which is the first one after the
  // validated ledger at time of submission.
  console.log("The earliest ledger index for tx:", latestLedgerVersion + 1)

  return result
}

export function rippleTx(api: RippleAPI,profileData:any, prepare: Promise<Prepare>): Promise<FormattedSubmitResponse> {

  const promise = api.connect().then(() => {
    console.log('Connected');
    console.log("isConected from rippleTx: {} " ,api.isConnected())

    return prepare
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
    return doSubmit(blob, api);

  }).then((result) => {
    console.log('Result:' + result.resultCode);
    api.disconnect()
    return result
  })

  return promise;
}

