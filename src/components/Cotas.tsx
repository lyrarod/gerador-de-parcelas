"use client";

import { useEffect, useState } from "react";
import { iData, tCota } from "@/data";
import Loading from "./loading";
import styles from "./cotas.module.css";

export default function Cotas({ data }: iData) {
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

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isClientSide && itemsBiggerThenZero) {
      localStorage.setItem("@Cotas", JSON.stringify(items));
    }
  }, [items]);

  const handleCotaPaid = (cota: tCota) => {
    setItems((prevState) => [
      ...prevState.map((prevCota) => {
        if (prevCota === cota) {
          return {
            ...prevCota,
            pago: true,
          };
        }
        return {
          ...prevCota,
        };
      }),
    ]);
  };

  const handleCotaNotPaid = (cota: tCota) => {
    setItems((prevState) => [
      ...prevState.map((prevCota) => {
        if (prevCota === cota) {
          return {
            ...prevCota,
            pago: false,
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

      {!loading && <h2>Gerador de parcelas</h2>}

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
                cota.pago ? styles.bPaid : styles.bNotPaid
              }`}
            >
              <li
                style={{
                  listStyle: "none",
                }}
              >
                <h3
                  className={styles.cotaTitle}
                  style={{ color: `${cota.pago ? "seagreen" : "firebrick"}` }}
                >
                  {cota.title}
                </h3>
                <p>
                  <strong>valor:</strong> {formatValor}
                </p>
                <p>
                  <strong>vencimento:</strong> {cota.vencimento}
                </p>
                <div className={styles.paidOrNotPaid}>
                  <strong>pago: </strong>
                  <button
                    onClick={() => handleCotaPaid(cota)}
                    className={`${styles.btn} ${cota.pago && styles.btnPaid}`}
                  >
                    sim
                  </button>
                  <button
                    onClick={() => handleCotaNotPaid(cota)}
                    className={`${styles.btn} ${
                      !cota.pago && styles.btnNotPaid
                    }`}
                  >
                    não
                  </button>
                </div>
              </li>
            </div>
          );
        })}
    </>
  );
}
