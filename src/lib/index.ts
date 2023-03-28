import { data } from "@/data";

export const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));

  return data;
};

export const toCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

type DateProps = {
  date: string | number | Date;
  style?: "full" | "long" | "medium" | "short" | undefined;
};

export const toDate = ({ date, style = "full" }: DateProps) => {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: style,
    timeStyle: "short",
  }).format(new Date(date));
};

export const toDecimal = (value: string) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    currency: "BRL",
  }).format(parseFloat(value));
};

export const getLocalStorageData = () => {
  const clientSide = typeof window !== "undefined";

  if (clientSide) {
    const res = localStorage.getItem("@ParcelData");
    return res ? JSON.parse(res) : [];
  }
};
