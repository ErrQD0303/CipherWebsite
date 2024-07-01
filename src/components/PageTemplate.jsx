import { useEffect } from "react";
import styles from "./PageTemplate.module.css";
import { useApp } from "./../contexts/AppContext";
import LabelledTextBox from "./LabelledTextBox";
import Switch from "./Switch";
import { getCiphertext, getPlaintext } from "./../encrypt-algorithm/algorithm";

function PageTemplate({ children }) {
  const {
    dispatch,
    key,
    encryptions,
    selectedEncryption,
    plaintext,
    ciphertext,
    shouldEncrypt,
  } = useApp();

  useEffect(
    function () {
      async function getAllEncryptions() {
        const response = await fetch("http://localhost:8000/encryptions");
        const data = await response.json();

        dispatch({
          type: "setEncryptions",
          payload: data,
        });
      }
      getAllEncryptions();
    },
    [dispatch]
  );

  function handleInputPlaintext(e) {
    dispatch({
      type: "setPlaintext",
      payload: e.target.value,
    });
  }

  function handleInputCiphertext(e) {
    dispatch({
      type: "setCiphertext",
      payload: e.target.value,
    });
  }

  function handleSelect(e) {
    dispatch({
      type: "setSelectedEncryption",
      payload: Number(e.target.value),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (key === null) return;

    if (shouldEncrypt)
      dispatch({
        type: "setCiphertext",
        payload: getCiphertext(
          encryptions?.[selectedEncryption].name,
          plaintext.replaceAll(" ", ""),
          { key }
        ),
      });
    else
      dispatch({
        type: "setPlaintext",
        payload: getPlaintext(
          encryptions?.[selectedEncryption].name,
          ciphertext.replaceAll(" ", ""),
          { key }
        ),
      });
  }

  function handleChange() {
    dispatch({ type: "setShouldEncrypt" });
  }

  return (
    <div className={styles.formContainer}>
      <LabelledTextBox
        id="plaintext"
        rows="7"
        value={plaintext}
        onChange={handleInputPlaintext}
      >
        Plaintext:
      </LabelledTextBox>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="algoChoose">Cipher Techniques:</label>
          <select
            id="algoChoose"
            value={selectedEncryption}
            onChange={handleSelect}
          >
            {encryptions.map(function (enc, idx) {
              return (
                <option value={idx} key={enc.name}>
                  {enc.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          Encrypt
          <Switch checked={!shouldEncrypt} onChange={handleChange} />
          Decrypt
        </div>
        {children}
        <button type="submit">{shouldEncrypt ? "Encrypt" : "Decrypt"}</button>
      </form>
      <LabelledTextBox
        id="ciphertext"
        rows="7"
        value={ciphertext}
        onChange={handleInputCiphertext}
      >
        Ciphertext:
      </LabelledTextBox>
    </div>
  );
}

export default PageTemplate;
