import { createContext, useContext, useMemo, useReducer } from "react";

const AppContext = createContext();

const initialValue = {
  plaintext: "",
  ciphertext: "",
  selectedEncryption: 0,
  encryptions: [],
  key: undefined,
  shouldEncrypt: true,
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
        ...initialValue,
        encryptions: state.encryptions,
        plaintext: state.plaintext,
        selectedEncryption: action.payload,
      };
    case "setKey":
      return {
        ...state,
        key: action.payload,
      };
    case "setShouldEncrypt":
      return {
        ...state,
        shouldEncrypt: !state.shouldEncrypt,
      };
    default:
      throw new Error("Invalid action!?!");
  }
}

function AppProvider({ children }) {
  const [
    {
      plaintext,
      ciphertext,
      selectedEncryption,
      encryptions,
      shouldEncrypt,
      key,
    },
    dispatch,
  ] = useReducer(reducer, initialValue);

  const value = useMemo(
    () => ({
      plaintext,
      ciphertext,
      selectedEncryption,
      encryptions,
      key,
      shouldEncrypt,
      dispatch,
    }),
    [plaintext, ciphertext, selectedEncryption, encryptions, shouldEncrypt, key]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useApp() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("AppContext was used ousdie the AppProvider");

  return context;
}

export { AppProvider, useApp };
