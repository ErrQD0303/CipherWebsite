import styles from "./LabelledTextBox.module.css";

function LabelledTextBox({ id, children, ...textboxProps }) {
  return (
    <div className={styles.labelledInput}>
      <label htmlFor={id}>{children}</label>
      <textarea id={id} {...textboxProps}></textarea>
    </div>
  );
}

export default LabelledTextBox;
