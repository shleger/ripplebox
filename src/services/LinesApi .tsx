import { useState } from "react";
import { RippleAPI } from "ripple-lib";
import { FormattedGetAccountInfoResponse } from "ripple-lib/dist/npm/ledger/accountinfo";


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