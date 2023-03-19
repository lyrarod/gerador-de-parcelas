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

type DateProps = {
  date: string | number | Date;
  style?: "full" | "long" | "medium" | "short" | undefined;
};

export const fnFormattedDate = ({ date, style = "full" }: DateProps) => {
  return new Date(date).toLocaleString("pt-BR", {
    dateStyle: style,
    timeStyle: "short",
  });
};
