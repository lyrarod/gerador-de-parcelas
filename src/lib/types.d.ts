export type tData = {
  id: string;
  title?: string;
  value: number;
  percentage: number;
  numberOfParcel: number;
  createdAt: Date;
  parcels: {
    id: string;
    calculatedValue: number;
    maturity: string;
    isPaid: boolean;
  }[];
};

export type tParcels = {
  id: number;
  maturity: string;
  isPaid: boolean;
};

export interface iData {
  data: tData;
}
