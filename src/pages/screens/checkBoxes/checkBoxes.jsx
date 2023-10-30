/* eslint-disable react/no-unescaped-entities */
import styles from "./checkBoxes.module.css";

const CheckBoxes = () => {
  return (
    <>
      <div className="w-full h-screen bg-[#ffc600] pt-40">
          <div className={styles.inbox}>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>This is an inbox layout.</p>
            </div>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>Check one item</p>
            </div>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>Hold down your Shift key</p>
            </div>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>Check a lower item</p>
            </div>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>Everything in between should also be set to checked</p>
            </div>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>Try to do it without any libraries</p>
            </div>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>Just regular JavaScript</p>
            </div>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>Good Luck!</p>
            </div>
            <div className={styles.item}>
              <input className={styles.check} type="checkbox" />
              <p id={styles.note}>Don't forget to tweet your result!</p>
              input
            </div>
          </div>
      </div>
    </>
  );
};

export default CheckBoxes;
