export type tData = {
  ano: number;
  inscricao: string;
  total: number;
  cotas: {
    title: string;
    vencimento: string;
    valor: number;
    pago: boolean;
  }[];
};

export type tCota = {
  title: string;
  vencimento: string;
  valor: number;
  pago: boolean;
};

export interface iCota {
  data: tData;
}

export const iptuData = {
  ano: 2023,
  inscricao: "0.328.055-9",
  total: 4.718,
  cotas: [
    {
      title: "cota 01",
      vencimento: "07/02/2023",
      valor: 471.8,
      pago: true,
    },
    {
      title: "cota 02",
      vencimento: "07/03/2023",
      valor: 471.8,
      pago: true,
    },
    {
      title: "cota 03",
      vencimento: "10/04/2023",
      valor: 471.8,
      pago: false,
    },
    {
      title: "cota 04",
      vencimento: "08/05/2023",
      valor: 471.8,
      pago: false,
    },
    {
      title: "cota 05",
      vencimento: "07/06/2023",
      valor: 471.8,
      pago: false,
    },
    {
      title: "cota 06",
      vencimento: "07/07/2023",
      valor: 471.8,
      pago: false,
    },
    {
      title: "cota 07",
      vencimento: "07/08/2023",
      valor: 471.8,
      pago: false,
    },
    {
      title: "cota 08",
      vencimento: "08/09/2023",
      valor: 471.8,
      pago: false,
    },
    {
      title: "cota 09",
      vencimento: "06/10/2023",
      valor: 471.8,
      pago: false,
    },
    {
      title: "cota 10",
      vencimento: "08/11/2023",
      valor: 471.8,
      pago: false,
    },
  ],
};
