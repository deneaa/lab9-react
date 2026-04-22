import styles from "./Results.module.css";

const Stat = ({ label, value }) => (
  <div className={styles.statBox}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
);

export default Stat;
