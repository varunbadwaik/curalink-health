import Sidebar from "@/components/Sidebar";
import styles from "../patient/layout.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.dashLayout}>
      <Sidebar role="admin" />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
