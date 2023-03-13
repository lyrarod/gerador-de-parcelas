import { getData } from "@/services";
import Cotas from "./components/Cotas";
import styles from "@/styles/Home.module.css";

export default async function Page() {
  const data = await getData();
  // console.log(data);

  return (
    <main className={styles.main}>
      <Cotas data={data} />
    </main>
  );
}
