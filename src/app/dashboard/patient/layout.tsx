import Sidebar from "@/components/layouts/Sidebar";
import styles from "./layout.module.css";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.dashLayout}>
      <Sidebar role="patient" />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
