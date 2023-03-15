"use client";

import { useRef, useState } from "react";
import { iData, tData } from "@/lib/types";
// import Loading from "./loading";

import styles from "./parcel.module.css";

export function Parcel({ data }: iData) {
  console.log("render...");

  // const [loading, setLoading] = useState(true);
  // const [parcels, setParcels] = useState<tData[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);

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

    const parcels = Array.from({ length: numberOfParcel }, (_, i) => {
      const id = String(Date.now() + i + 1);
      return {
        id,
        index: i + 1,
      };
    });

    const newParcel = {
      id: String(Date.now()),
      title,
      value,
      percentage,
      numberOfParcel,
      parcels,
    };

    setTimeout(() => {
      const { target } = evt as any;
      target.reset();

      console.log(newParcel);
      setBtnLoading(false);
    }, 1000);
  };

  return (
    <>
      {
        <form onSubmit={handleSubmit} className={styles.form}>
          <input ref={titleRef} placeholder="title..." required />

          <input
            ref={valueRef}
            type={"number"}
            required
            placeholder="value..."
          />
          <input
            ref={numberOfParcelRef}
            type={"number"}
            required
            placeholder="numberOfParcel..."
          />

          <input
            ref={percentageRef}
            type={"number"}
            required
            placeholder="percentage..."
          />
          <button type="submit" disabled={btnLoading}>
            {btnLoading ? "calculating..." : "calculate"}
          </button>
        </form>
      }
    </>
  );
}
