export type tData = {
  id: string;
  value: number;
  title?: string;
  createdAt: string;
  percentage: number;
  numberOfParcel: number;
  calculatedValue: number;
  parcels: {
    id: string;
    maturity: string;
    isPaid: boolean;
    calculatedValue: number;
  }[];
};

export type tParcels = {
  id: string;
  maturity: string;
  isPaid: boolean;
  calculatedValue: number;
};

export interface iData {
  data: tData;
}
