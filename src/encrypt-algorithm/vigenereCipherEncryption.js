export function getVigenereCipherEncryptionText(plaintext, key) {
  const finalKey = getFinalKey(plaintext, key);

  console.log(plaintext, finalKey);

  const ciphertext = [...plaintext].reduce((acc, char, idx) => {
    const isUpper = !(char >= "a");
    let offsetNumber = isUpper ? 65 : 97;

    return (
      acc +
      (char >= "0" && char <= "9"
        ? char
        : String.fromCharCode(
            ((char.charCodeAt(0) +
              finalKey[idx].charCodeAt(0) -
              "A".charCodeAt(0) -
              offsetNumber) %
              26) +
              offsetNumber
          ))
    );
  }, "");

  return ciphertext;
}

export function getVigenereCipherPlainText(ciphertext, key) {
  const finalKey = getFinalKey(ciphertext, key);

  const plaintext = [...ciphertext].reduce((acc, char, idx) => {
    const isUpper = !(char >= "a");
    let offsetNumber = isUpper ? 65 : 97;

    let plainChar;

    if (char >= "0" && char <= "9") plainChar = char;
    else {
      let plainCharCode =
        ((char.charCodeAt(0) -
          finalKey[idx].charCodeAt(0) +
          "A".charCodeAt(0) -
          offsetNumber) %
          26) +
        offsetNumber;

      if ((isUpper && plainCharCode < 65) || (!isUpper && plainCharCode <= 97))
        plainCharCode += 26;

      plainChar = String.fromCharCode(plainCharCode);
    }

    return acc + plainChar;
  }, "");
  return plaintext;
}

function getFinalKey(text, key) {
  const multiplyKey = Math.floor(text.length / key.length);

  let finalKey = "";
  if (multiplyKey >= 1) for (let i = 0; i < multiplyKey; ++i) finalKey += key;

  const remainingChars = text.length - multiplyKey * key.length;

  for (let i = 0; i < remainingChars; ++i) finalKey += key[i];

  return finalKey;
}
