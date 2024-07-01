import { useApp } from "../contexts/AppContext";
import { getSubstitutionCipherEncryptionKey } from "./../encrypt-algorithm/substitutionCipherEncryption";
import GridKey from "./../components/GridKey";

import styles from "./SubstitutionCipher.module.css";
import PageTemplate from "../components/PageTemplate";

function SubstitutionCipher() {
  const { dispatch, key } = useApp();

  function handleGetKey() {
    dispatch({
      type: "setKey",
      payload: getSubstitutionCipherEncryptionKey(),
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
