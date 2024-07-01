import { useApp } from "../contexts/AppContext";
import styles from "./LabelledTextBox.module.css";

function LabelledTextBox({ id, children, ...textboxProps }) {
  const { shouldEncrypt } = useApp();
  return (
    <div
      className={`${styles.labelledInput} ${id} ${
        shouldEncrypt ? "" : "decrypt"
      }`}
    >
      <label htmlFor={id}>{children}</label>
      <textarea id={id} {...textboxProps}></textarea>
    </div>
  );
}

export default LabelledTextBox;
