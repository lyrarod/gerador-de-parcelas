"use client";

import { useEffect, useRef, useState } from "react";
import { tData } from "@/lib/types";
import { fnFormattedCurrency, fnFormattedDate } from "@/lib";
import { Loading } from "./loading";
import { BtnLoading } from "./btnLoading";
import styles from "./parcel.module.css";

export function Parcel() {
  console.log("render...");

  const [data, setData] = useState<tData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null!);
  const valueRef = useRef<HTMLInputElement>(null!);
  const percentageRef = useRef<HTMLInputElement>(null!);
  const numberOfParcelRef = useRef<HTMLInputElement>(null!);

  //checks if the data state are not empty
  const isData = data?.length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);

    let bodyEl = document.querySelector("body")!;
    loading
      ? (bodyEl.style.overflow = "hidden")
      : (bodyEl.style.overflow = "auto");

    const getLocalStorageData = () => {
      const res = localStorage.getItem("@ParcelData");
      return res ? JSON.parse(res) : data;
    };

    const res = getLocalStorageData();
    setData(res);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (isData) {
      localStorage.setItem("@ParcelData", JSON.stringify(data));
    }
  }, [data]);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setBtnLoading(true);

    const title = titleRef.current?.value.trim();
    const value = Number(valueRef.current?.value);
    const percentage = Number(percentageRef.current?.value);
    const numberOfParcel = Number(numberOfParcelRef.current?.value);

    let calculatedValue: number = 0;
    !percentage
      ? (calculatedValue = Number((value / numberOfParcel).toFixed(2)))
      : (calculatedValue = Number(((value * percentage) / 100).toFixed(2)));

    const parcels = Array.from({ length: numberOfParcel }, (_, i) => {
      const id = String(Date.now() + i + 1);
      return {
        id,
        calculatedValue,
        maturity: new Date().toString(),
        isPaid: false,
      };
    });

    const newParcel = {
      id: String(Date.now()),
      title,
      value,
      percentage,
      numberOfParcel,
      calculatedValue,
      createdAt: new Date().toString(),
      parcels,
    };

    setTimeout(() => {
      const { target } = evt as any;
      target.reset();
      titleRef.current.focus();

      setData([newParcel]);
      console.log(newParcel);
      setBtnLoading(false);
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={titleRef}
            placeholder="Ex: Cartão de crédito..."
            autoFocus
          />

          <input
            ref={valueRef}
            type={"number"}
            step=".01"
            required
            placeholder="valor..."
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
          <button className={styles.btn} type="submit" disabled={btnLoading}>
            {!btnLoading ? "calcular" : <BtnLoading />}
          </button>
        </form>
      )}

      {!loading &&
        !btnLoading &&
        data?.map((parcel) => {
          const {
            calculatedValue,
            parcels,
            value,
            percentage,
            numberOfParcel,
            title,
          } = parcel;

          const formattedValue = fnFormattedCurrency(value);
          const formattedCalculatedValue = fnFormattedCurrency(calculatedValue);

          return (
            <div key={parcel.id} style={{ padding: "1rem", width: "100%" }}>
              <div
                style={{
                  display: "inline-block",
                  width: "100%",
                  color: "#121212",
                  background: "silver",
                  padding: "1rem",
                  borderRadius: "8px",
                  // textAlign: "center",
                }}
              >
                {title ? (
                  <p>
                    <strong>{title}</strong>
                  </p>
                ) : null}
                <p>
                  <strong>Total: {formattedValue}</strong>
                  {percentage ? ` (Pagar ${percentage}%)` : null}
                </p>
                <p>
                  <strong>Parcelas: {formattedCalculatedValue}</strong>
                  {numberOfParcel ? ` (${numberOfParcel}x)` : null}
                </p>
              </div>
              {/* {parcels?.map((parcel, i) => {
                const formattedCalculatedValue = fnFormattedCurrency(
                  parcel.calculatedValue
                );
                const formattedMaturity = fnFormattedDate(parcel.maturity);

                return (
                  <div
                    key={parcel.id}
                    style={{ padding: ".5rem 0", borderBottom: "1px solid" }}
                  >
                    <strong>PARCELA {i + 1}</strong>

                    <p>{formattedCalculatedValue}</p>
                    <p>pago: {parcel.isPaid ? "sim" : "não"}</p>
                    <p>vencimento: {formattedMaturity}</p>
                  </div>
                );
              })} */}
            </div>
          );
        })}
    </>
  );
}
