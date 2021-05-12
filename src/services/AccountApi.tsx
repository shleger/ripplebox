import { useState } from "react";
import ripple, { RippleAPI } from "ripple-lib";


export default function AccountApi(): string {

    const api = new RippleAPI({
        server: 'wss://s.altnet.rippletest.net:51233'
    });

    api.connect().then(() => {
        /* begin adress to check ------------------------------------ */
        const myAddress = localStorage.getItem("accAddress") + "";;

        console.log('getting account info for', myAddress);
        return api.getAccountInfo(myAddress);
        /* end adress to check -------------------------------------- */

    }).then(info => {
        console.log(JSON.stringify(info));
        console.log('getAccountInfo done');
    }).then(() => {
        return api.disconnect();
    }).then(() => {
        console.log('done and disconnected.');
    }).catch(console.error);

    return "fffff"

}