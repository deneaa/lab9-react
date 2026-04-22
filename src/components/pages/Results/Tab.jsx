import styles from "./Results.module.css";

const Tab = ({ active, children, ...props }) => (
  <button className={active ? styles.activeTab : ""} {...props}>
    {children}
  </button>
);

export default Tab;
