import {
  getSubstitutionCipherEncryptionText,
  getSubstitutionCipherPlainText,
  getSubstitutionCipherEncryptionKey,
} from "./substitutionCipherEncryption";
import {
  getVigenereCipherEncryptionText,
  getVigenereCipherPlainText,
} from "./vigenereCipherEncryption";

export function getCiphertext(algoName, plaintext, props) {
  switch (algoName.toLowerCase()) {
    case "substitution cipher":
      return getSubstitutionCipherEncryptionText(plaintext, props.key);
    case "vigenere cipher":
      return getVigenereCipherEncryptionText(plaintext, props.key);
    default:
      throw new Error("Not implemented Encryption Techniques");
  }
}

export function getPlaintext(algoName, ciphertext, props) {
  switch (algoName.toLowerCase()) {
    case "substitution cipher":
      return getSubstitutionCipherPlainText(ciphertext, props.key);
    case "vigenere cipher":
      return getVigenereCipherPlainText(ciphertext, props.key);
    default:
      throw new Error("Not implemented Encryption Techniques");
  }
}

export function getKey(algoName) {
  switch (algoName.toLowerCase()) {
    case "substitution cipher":
      return getSubstitutionCipherEncryptionKey();
    default:
      throw new Error("Not implemented Encryption Techniques");
  }
}
