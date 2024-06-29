import styles from "./LabelledInput.module.css";

function LabelledInput({ id, children, ...inputProps }) {
  return (
    <div className={styles.labelledInput}>
      <label htmlFor={id}>{children}</label>
      <input id={id} type="text" {...inputProps} />
    </div>
  );
}

export default LabelledInput;
