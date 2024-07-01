export function getSubstitutionCipherEncryptionText(plaintext, key) {
  const ciphertext = [...plaintext].reduce(function (acc, value) {
    let charCode = value.charCodeAt(0);
    charCode = charCode < 97 ? charCode - 65 : charCode - 97 + 26;

    return acc + key[charCode][1];
  }, "");

  return ciphertext;
}

export function getSubstitutionCipherEncryptionKey() {
  const key = Array.from({ length: 52 }, (v, i) => {
    const character = String.fromCharCode(
      i < 26 ? "A".charCodeAt(0) + i : +"a".charCodeAt(0) + (i % 26)
    );

    return [character, character];
  });

  key.forEach(function (value, index, arr) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const temp = arr[index][1];
    arr[index][1] = arr[randomNumber][1];
    arr[randomNumber][1] = temp;
  });

  return key;
}

export function getSubstitutionCipherPlainText(ciphertext, key) {
  const plaintext = [...ciphertext].reduce(function (acc, value) {
    const originalChar = key.filter((val) => val[1] === value)[0][0];
    return acc + originalChar;
  }, "");

  return plaintext;
}
