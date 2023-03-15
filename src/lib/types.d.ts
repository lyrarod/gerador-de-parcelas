export type tData = {
  id: number;
  title: string;
  value: number;
  percentage: number;
  numberOfParcel: number;
  parcel: {
    id: number;
    maturity: string;
    isPaid: boolean;
  }[];
}[];

export type tParcel = {
  id: number;
  maturity: string;
  isPaid: boolean;
};

export interface iData {
  data: tData;
}
