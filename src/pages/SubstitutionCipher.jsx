import { useApp } from "../contexts/AppContext";
import { getKey } from "../encrypt-algorithm/algorithm";
import GridKey from "./../components/GridKey";

import styles from "./SubstitutionCipher.module.css";
import PageTemplate from "../components/PageTemplate";
import { useEffect } from "react";

function SubstitutionCipher() {
  const { dispatch, key, encryptions, selectedEncryption } = useApp();

  function handleGetKey() {
    dispatch({
      type: "setKey",
      payload: getKey(encryptions?.[selectedEncryption].name),
    });
  }

  return (
    <PageTemplate>
      <div>
        <button type="button" onClick={handleGetKey}>
          Get Key
        </button>
        {key && <GridKey />}
      </div>
    </PageTemplate>
  );
}

export default SubstitutionCipher;
