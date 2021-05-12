import { useState } from "react";
import { RippleAPI } from "ripple-lib";
import { FormattedGetAccountInfoResponse } from "ripple-lib/dist/npm/ledger/accountinfo";


export default function AccountApi() {

    const api = new RippleAPI({
        server: 'wss://s.altnet.rippletest.net:51233'
    });

    const promise = api.connect().then(() => {
        /* begin adress to check ------------------------------------ */
        const myAddress = localStorage.getItem("accAddress") + "";;

        console.log('getting account info for', myAddress);
        return api.getAccountInfo(myAddress);
        /* end adress to check -------------------------------------- */

    }).then(info => {

        console.log(JSON.stringify(info));
        console.log('getAccountInfo done');
        return info

    }).then((info) => {
        api.disconnect();
        return info
    }).then((info: FormattedGetAccountInfoResponse) => {
        console.log('done and disconnected.' + info.xrpBalance);
        return info.xrpBalance
    }).catch(console.error);

    return promise

}