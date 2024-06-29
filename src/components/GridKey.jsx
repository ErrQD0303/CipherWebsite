import styles from "./GridKey.module.css";

function GridKey({ keyTable }) {
  console.log(keyTable);
  return (
    <div className={styles.keyTable}>
      {keyTable.map(function ([ori, modi]) {
        return (
          <div key={ori} className={styles.gridItem}>
            <div>{ori}</div>
            <div>{modi}</div>
          </div>
        );
      })}
    </div>
  );
}

export default GridKey;
