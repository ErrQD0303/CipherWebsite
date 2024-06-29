import { useEffect, useReducer } from "react";
import LabelledTextBox from "./components/LabelledTextBox";
import { getCiphertext } from "./encrypt-algorithm/algorithm";
import { getCipherEncryptionKey } from "./encrypt-algorithm/cipherEncryption";

import styles from "./pages/SubstitutionCipher.module.css";
import GridKey from "./components/GridKey";

const initialValue = {
  plaintext: "",
  ciphertext: "",
  selectedEncryption: 0,
  encryptions: [],
  key: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setEncryptions":
      return { ...state, encryptions: action.payload };
    case "setPlaintext":
      return {
        ...state,
        plaintext: action.payload,
      };
    case "setCiphertext":
      return {
        ...state,
        ciphertext: action.payload,
      };
    case "setSelectedEncryption":
      return {
        ...state,
        selectedEncryption: action.payload,
      };
    case "setKey":
      return {
        ...state,
        key: action.payload,
      };
    default:
      throw new Error("Invalid action!?!");
  }
}

function App() {
  const [
    { plaintext, ciphertext, selectedEncryption, encryptions, key },
    dispatch,
  ] = useReducer(reducer, initialValue);

  useEffect(function () {
    async function getAllEncryptions() {
      const response = await fetch("http://localhost:8000/encryptions");
      const data = await response.json();

      dispatch({
        type: "setEncryptions",
        payload: data,
      });
    }
    getAllEncryptions();
  }, []);

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

  function handleGetKey() {
    dispatch({
      type: "setKey",
      payload: getCipherEncryptionKey(),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (key === null) return;

    dispatch({
      type: "setCiphertext",
      payload: getCiphertext(
        encryptions?.[selectedEncryption].name,
        plaintext.replaceAll(" ", ""),
        { key }
      ),
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <LabelledTextBox
          id="plaintext"
          rows="7"
          value={plaintext}
          onChange={handleInputPlaintext}
        >
          Plaintext:
        </LabelledTextBox>
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
          <button type="button" onClick={handleGetKey}>
            Get Key
          </button>
          {key && <GridKey keyTable={key} />}
        </div>
        <button type="submit">Encrypt</button>
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

export default App;
