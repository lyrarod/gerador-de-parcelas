"use client";

import { tData } from "@/lib/types";
import { useRef, useState } from "react";

import styles from "./parcel.module.css";

export function Parcel() {
  console.log("render...");

  const [data, setData] = useState<tData[]>([]);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null!);
  const valueRef = useRef<HTMLInputElement>(null!);
  const percentageRef = useRef<HTMLInputElement>(null!);
  const numberOfParcelRef = useRef<HTMLInputElement>(null!);

  //Rendering on browser or client side
  // const isClientSide = typeof window !== "undefined";
  //checks if the items are not empty
  // const itemsBiggerThenZero = parcels?.length > 0;

  // useEffect(() => {
  //   const getLocalStorageData = () => {
  //     if (isClientSide) {
  //       const res = localStorage.getItem("@ParcelData");
  //       return res ? JSON.parse(res) : data;
  //     }
  //   };

  //   const res = getLocalStorageData();
  //   setParcels(res);

  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 0);

  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   if (isClientSide && itemsBiggerThenZero) {
  //     localStorage.setItem("@ParcelData", JSON.stringify(parcels));
  //   }
  // }, [parcels]);

  // const formattedTotal = new Intl.NumberFormat("pt-BR", {
  //   style: "currency",
  //   currency: "BRL",
  //   maximumSignificantDigits: 6,
  // }).format(data.total);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setBtnLoading(true);

    const title = titleRef.current?.value.trim();
    const value = Number(valueRef.current?.value);
    const percentage = Number(percentageRef.current?.value);
    const numberOfParcel = Number(numberOfParcelRef.current?.value);

    let calculatedValue: number;
    !percentage
      ? (calculatedValue = Number((value / numberOfParcel).toFixed(2)))
      : (calculatedValue = Number(((value * percentage) / 100).toFixed(2)));

    const parcels = Array.from({ length: numberOfParcel }, (_, i) => {
      const id = String(Date.now() + i + 1);
      return {
        id,
        calculatedValue,
        maturity: new Date().toLocaleString("pt-BR", {
          dateStyle: "short",
        }),
        isPaid: false,
      };
    });

    const newParcel = {
      id: String(Date.now()),
      title,
      value,
      percentage,
      numberOfParcel,
      createdAt: new Date(),
      parcels,
    };

    setTimeout(() => {
      setData([newParcel]);
      const { target } = evt as any;
      target.reset();

      console.log(newParcel);
      setBtnLoading(false);
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input ref={titleRef} placeholder="Ex: Cartão de crédito..." />

        <input
          ref={valueRef}
          type={"number"}
          step=".001"
          required
          placeholder="valor..."
          autoFocus
        />
        <input
          ref={numberOfParcelRef}
          type={"number"}
          required
          placeholder="numero de parcelas..."
        />

        <input
          ref={percentageRef}
          type={"number"}
          placeholder="porcentagem..."
        />
        <button type="submit" disabled={btnLoading}>
          {!btnLoading ? "calcular" : "calculando..."}
        </button>
      </form>

      {data.length > 0 &&
        data?.map((parcel) => {
          const { parcels, value, percentage, numberOfParcel, title } = parcel;
          const formatedValue = new Intl.NumberFormat("pt-BT", {
            style: "currency",
            currency: "BRL",
          }).format(value);

          return (
            <div key={parcel.id} style={{ padding: "1rem", width: "100%" }}>
              <h2
                style={{
                  display: "inline-block",
                  width: "100%",
                  background: "seagreen",
                  textAlign: "center",
                }}
              >
                <p>{title && title}</p>
                TOTAL: {formatedValue}
                <p>{percentage ? `PORCENTAGEM: ${percentage}%` : null}</p>
                <p>{numberOfParcel ? `PARCELAS: ${numberOfParcel}` : null}</p>
              </h2>
              {parcels.map((parcel, i) => {
                const formatedCalculatedValue = new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(parcel.calculatedValue);

                return (
                  <div
                    key={parcel.id}
                    style={{ padding: ".5rem 0", borderBottom: "1px solid" }}
                  >
                    <strong>PARCELA {i + 1}</strong>

                    <p>{formatedCalculatedValue}</p>
                    <p>pago: {parcel.isPaid ? "sim" : "não"}</p>
                    <p>vencimento: {parcel.maturity}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
    </>
  );
}