"use client";

import { useEffect, useState } from "react";
import { iCota, tCota } from "@/data";
import Loading from "./loading";
import styles from "./cotas.module.css";

export default function Cotas({ data }: iCota) {
  // console.log(cotas);

  const [items, setItems] = useState<tCota[]>([]);
  const [loading, setLoading] = useState(true);

  //Rendering on browser or client side
  const isClientSide = typeof window !== "undefined";
  //checks if the items are not empty
  const itemsBiggerThenZero = items?.length > 0;

  useEffect(() => {
    const getLocalStorageData = (arrCotas: tCota[]) => {
      if (isClientSide) {
        const res = localStorage.getItem("@Cotas");
        return res ? JSON.parse(res) : arrCotas;
      }
    };

    const res = getLocalStorageData(data.cotas);
    setItems(res);
    // console.log(res);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isClientSide && itemsBiggerThenZero) {
      localStorage.setItem("@Cotas", JSON.stringify(items));
    }
  }, [items]);

  const handleClick = (cota: tCota) => {
    setItems((prevState) => [
      ...prevState.map((prevCota) => {
        if (prevCota === cota) {
          return {
            ...prevCota,
            pago: !prevCota.pago,
          };
        }
        return {
          ...prevCota,
        };
      }),
    ]);
  };

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumSignificantDigits: 6,
  }).format(data.total);

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <h2
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10px",
          }}
        >
          <span>IPTU {data.ano}</span> <span>{formattedTotal}</span>
        </h2>
      )}

      {!loading &&
        itemsBiggerThenZero &&
        items?.map((cota) => {
          const formatValor = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            // maximumSignificantDigits: 4,
          }).format(cota.valor);

          return (
            <div
              key={cota.title}
              className={`${styles.main} ${
                cota.pago ? styles.bgPaid : styles.bgNotPaid
              }`}
            >
              <li
                style={{
                  listStyle: "none",
                }}
              >
                <h4 style={{ textTransform: "uppercase" }}>{cota.title}</h4>
                <p>valor: {formatValor}</p>
                <p>vencimento: {cota.vencimento}</p>
              </li>
              <button
                onClick={() => handleClick(cota)}
                className={`${styles.btn} ${
                  cota.pago ? styles.btnPaid : styles.btnNotPaid
                }`}
              >
                Pago? {cota.pago ? "SIM" : "NÃO"}
              </button>
            </div>
          );
        })}
    </>
    // <main
    //   className={`${styles.main} ${
    //     item.pago ? styles.bgPaid : styles.bgNotPaid
    //   }`}
    // >
    //   <li
    //     style={{
    //       listStyle: "none",
    //     }}
    //   >
    //     <h4 style={{ textTransform: "uppercase" }}>{item.title}</h4>
    //     <p>valor: {formatValor}</p>
    //     <p>vencimento: {item.vencimento}</p>
    //   </li>
    //   <button
    //     onClick={handleClick}
    //     className={`${styles.btn} ${
    //       item.pago ? styles.btnPaid : styles.btnNotPaid
    //     }`}
    //   >
    //     Pago? {item.pago ? "SIM" : "NÃO"}
    //   </button>
    // </main>
  );
}
