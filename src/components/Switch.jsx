import styles from "./Switch.module.css";

function Switch({ onChange, ...inputProps }) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onChange} {...inputProps} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
}

export default Switch;
