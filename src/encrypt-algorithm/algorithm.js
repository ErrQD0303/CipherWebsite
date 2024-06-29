import { getCipherEncryptionText } from "./cipherEncryption";

export function getCiphertext(algoName, plaintext, props) {
  switch (algoName.toLowerCase()) {
    case "substitution cipher":
      return getCipherEncryptionText(plaintext, props.key);
    default:
      throw new Error("Not implemented Encryption Techniques");
  }
}
