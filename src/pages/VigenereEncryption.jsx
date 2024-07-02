import { useApp } from "../contexts/AppContext";
import { getKey } from "../encrypt-algorithm/algorithm";

import styles from "./VigenereEncryption.module.css";
import PageTemplate from "../components/PageTemplate";
import LabelledTextBox from "../components/LabelledTextBox";
import { useEffect } from "react";

function VigenereCipher() {
  const { dispatch, key: keyValue } = useApp();

  function handleInputKey(e) {
    const value = e.target.value;

    if (value.match(/[^A-Za-z]/)) return;

    dispatch({ type: "setKey", payload: value.toUpperCase() });
  }

  return (
    <PageTemplate>
      <LabelledTextBox
        id="plaintext"
        rows="1"
        value={keyValue}
        onChange={handleInputKey}
      >
        Key:
      </LabelledTextBox>
    </PageTemplate>
  );
}

export default VigenereCipher;
