"use client";

import { useEffect, useRef, useState } from "react";
import { tData } from "../../types";
import { getLocalStorageData, toCurrency, toDate } from "@/lib";
import { Loading } from "./loading";
import { BtnLoading } from "./btnLoading";
import styles from "./parcel.module.css";

export function Parcel() {
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

    const valuePercentage = Number((value * percentage) / 100);
    const valueNumberOfParcel = Number(value / numberOfParcel);
    const parcelPercentage = Number((valueNumberOfParcel * percentage) / 100);

    let calculatedValue = !percentage ? valueNumberOfParcel : valuePercentage;

    const id = String(Date.now());

    const parcels = Array.from({ length: numberOfParcel }, (_, i) => {
      const id = String(Date.now() + (i + 1));
      return {
        id,
        isPaid: false,
        calculatedValue,
        maturity: String(new Date()),
      };
    });

    const newParcel = {
      id,
      title,
      value,
      percentage,
      numberOfParcel,
      calculatedValue,
      valuePercentage,
      valueNumberOfParcel,
      parcelPercentage,
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

      <div style={{ padding: "1rem" }}>
        {!loading &&
          data?.map((parcel) => {
            const formattedValue = toCurrency(parcel.value);

            const formattedCreatedAt = toDate({
              date: parcel.createdAt,
              style: "full",
            });

            return (
              <li key={parcel.id} className={styles.card}>
                {parcel.title && <h3>{parcel.title}</h3>}
                <p>
                  Total: <strong>{formattedValue}</strong>
                </p>

                {parcel.numberOfParcel && parcel.numberOfParcel > 1 ? (
                  <p>
                    Parcelas:{" "}
                    <strong>{toCurrency(parcel.valueNumberOfParcel)}</strong>
                    {` (${parcel.numberOfParcel}x)`}
                  </p>
                ) : (
                  <p>
                    Parcela única: <strong>{formattedValue}</strong>
                    {` (à vista)`}
                  </p>
                )}

                {parcel.percentage && parcel.numberOfParcel ? (
                  <>
                    <hr />
                    <p>
                      Total:
                      <strong>{` ${toCurrency(
                        parcel.valuePercentage
                      )}`}</strong>
                      {` (${parcel.percentage}% do total) `}
                    </p>
                    <p>
                      Parcelas:{" "}
                      <strong>{`${toCurrency(
                        parcel.parcelPercentage
                      )}`}</strong>
                      {` (${parcel.numberOfParcel}x) `}
                    </p>
                  </>
                ) : null}

                <p
                  style={{
                    fontSize: ".75rem",
                  }}
                >
                  {formattedCreatedAt}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setData((prev) => [
                      ...prev.filter((p) => p.id !== parcel.id),
                    ]);
                  }}
                  title="delete"
                >
                  x
                </button>
              </li>
            );
          })}
      </div>
    </>
  );
}
