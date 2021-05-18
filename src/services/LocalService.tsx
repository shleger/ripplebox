export default function LocalServiceSave(obj: any) {

}

export declare type ProfileData = {
    accUser: string,
    accAddress: string,
    accSecret: string,
    server: string
};
export const initProfileData: ProfileData = {
    accUser: "",
    accAddress: "",
    accSecret: "",
    server: "wss://s.altnet.rippletest.net:51233"
}

 export const CurrencyLabel = new Map<string, string>([
    ['EUR', '€'],
    ['GBP', '£'],
    ['JPY', '¥'],
    ['USD', '$'],
  ]);
