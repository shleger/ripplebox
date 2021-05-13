import { useState } from "react";
import { RippleAPI } from "ripple-lib";
import { FormattedGetAccountInfoResponse } from "ripple-lib/dist/npm/ledger/accountinfo";


export default function AccountApi() {
    const profileData = JSON.parse(String(localStorage.getItem("profileData")));;
    const api = new RippleAPI({ server: profileData.server });
    const promise = api.connect().then(() => {
        /* begin adress to check ------------------------------------ */

        console.log('getting account info for', profileData);
        return api.getAccountInfo(profileData.accAddress);
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