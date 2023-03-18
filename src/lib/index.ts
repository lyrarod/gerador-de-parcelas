import { data } from "@/data";

export const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));

  return data;
};

export const fnFormattedCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const fnFormattedDate = (date: string) => {
  return new Date(date).toLocaleString("pt-BR", { dateStyle: "short" });
};
