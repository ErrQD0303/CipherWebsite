import {
  getSubstitutionCipherEncryptionText,
  getSubstitutionCipherPlainText,
} from "./substitutionCipherEncryption";

export function getCiphertext(algoName, plaintext, props) {
  switch (algoName.toLowerCase()) {
    case "substitution cipher":
      return getSubstitutionCipherEncryptionText(plaintext, props.key);
    default:
      throw new Error("Not implemented Encryption Techniques");
  }
}

export function getPlaintext(algoName, ciphertext, props) {
  switch (algoName.toLowerCase()) {
    case "substitution cipher":
      return getSubstitutionCipherPlainText(ciphertext, props.key);
    default:
      throw new Error("Not implemented Encryption Techniques");
  }
}
