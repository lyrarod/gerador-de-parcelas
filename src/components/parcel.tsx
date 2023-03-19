"use client";

import { useEffect, useRef, useState } from "react";
import { tData } from "@/lib/types";
import { fnFormattedCurrency, fnFormattedDate } from "@/lib";
import { Loading } from "./loading";
import { BtnLoading } from "./btnLoading";
import styles from "./parcel.module.css";

const clientSide = typeof window !== "undefined";

const getLocalStorageData = () => {
  if (clientSide) {
    const res = localStorage.getItem("@ParcelData");
    return res ? JSON.parse(res) : [];
  }
};

export function Parcel() {
  console.log("render...");

  const [data, setData] = useState<tData[]>(getLocalStorageData);
  const [loading, setLoading] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null!);
  const valueRef = useRef<HTMLInputElement>(null!);
  const percentageRef = useRef<HTMLInputElement>(null!);
  const numberOfParcelRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    window.scrollTo(0, 0);

    let bodyEl = document.querySelector("body")!;
    loading
      ? (bodyEl.style.overflow = "hidden")
      : (bodyEl.style.overflow = "auto");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    localStorage.setItem("@ParcelData", JSON.stringify(data));
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
      ? (calculatedValue = Number(value / numberOfParcel))
      : (calculatedValue = Number((value * percentage) / 100));

    const id = String(Date.now());

    const parcels = Array.from({ length: numberOfParcel }, (_, i) => {
      const id = String(Date.now() + (i + 1));
      return {
        id,
        calculatedValue,
        maturity: String(new Date()),
        isPaid: false,
      };
    });

    const newParcel = {
      id,
      title,
      value,
      percentage,
      numberOfParcel,
      calculatedValue,
      createdAt: String(new Date()),
      parcels,
    };

    setTimeout(() => {
      const { target } = evt as any;
      target.reset();

      setData((prev) => [newParcel, ...prev]);
      console.log(newParcel);
      setBtnLoading(false);
    }, 1500);
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
            required
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
        data?.map((parcel) => {
          const formattedValue = fnFormattedCurrency(parcel.value);
          const formattedCalculatedValue = fnFormattedCurrency(
            parcel.calculatedValue
          );
          const formattedCreatedAt = fnFormattedDate({
            date: parcel.createdAt,
            style: "full",
          });

          return (
            <div
              key={parcel.id}
              style={{
                padding: ".5rem 1rem",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "1rem",
                  color: "#121212",
                  borderRadius: "8px",
                  background: "silver",
                  position: "relative",
                }}
              >
                {parcel.title ? (
                  <p>
                    <strong>{parcel.title}</strong>
                  </p>
                ) : null}
                <p>
                  <strong>Total: {formattedValue}</strong>
                  {parcel.percentage ? ` (Pagar ${parcel.percentage}%)` : null}
                </p>
                {parcel.numberOfParcel && parcel.numberOfParcel > 1 ? (
                  <p>
                    <strong>Parcelas: {formattedCalculatedValue}</strong>
                    {` (${parcel.numberOfParcel}x)`}
                  </p>
                ) : (
                  <p>
                    <strong>Parcela única: {formattedValue}</strong>
                    {` (à vista)`}
                  </p>
                )}

                <p
                  style={{
                    fontSize: ".875rem",
                    fontStyle: "oblique",
                  }}
                >
                  {formattedCreatedAt}
                </p>

                <button
                  onClick={() =>
                    setData((prev) => [
                      ...prev.filter((p) => p.id !== parcel.id),
                    ])
                  }
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    padding: "4px 8px",
                    color: "firebrick",
                    background: "transparent",
                    border: "2px solid",
                    borderRadius: "100%",
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "1",
                    cursor: "pointer",
                  }}
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}
