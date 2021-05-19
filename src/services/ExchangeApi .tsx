import { RippleAPI } from "ripple-lib";

export default function LinesApi(storageKey: string) {
    
    const pd = localStorage.getItem(storageKey)
    if (pd == null) {
        throw new Error("Not found creds for LinesApi")
    }
    const profileData = JSON.parse(String(localStorage.getItem(storageKey)));;
    const api = new RippleAPI({ server: profileData.server });

    api.on('error', (errorCode, errorMessage) => {
        console.log(errorCode + ': ' + errorMessage);
    });
    api.on('connected', () => {
        console.log('==connected==');
    });
    api.on('disconnected', (code) => {
        // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
        // will be 1000 if this was normal closure
        if (code !== 1000) {
            console.log('Connection is closed due to error: ' + code);
        } else {
            console.log('==connection is closed normally==: ' + code);
        }
    });

    console.log('Connect to ' + profileData.server )

    const promise = api.connect().then(() => {
        console.log('Connected')

        return api.getBalanceSheet(profileData.accAddress)
    }).then(response => {
        console.log("account_lines response:", JSON.stringify(response))
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

