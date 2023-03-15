import { getData } from "@/lib";
import { Parcel } from "@/components/parcel";

import styles from "@/styles/Home.module.css";

export default async function Page() {
  const data = await getData();

  return (
    <main className={styles.main}>
      <Parcel data={data} />
    </main>
  );
}
