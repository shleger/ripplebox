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

  export const directions = [
    {
      value: 'sell',
      label: 'SELL',
    },
    {
      value: 'buy',
      label: 'BUY',
    }]
  
  export const currencies = [
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'GBP',
      label: '£',
    },
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  export  const logClickCell = (p:any) => console.log(p.value)
   
