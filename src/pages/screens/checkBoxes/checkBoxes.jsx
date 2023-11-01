/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import styles from "./checkBoxes.module.css";

const CheckBoxes = () => {
  useEffect(() => {
    const checkBoxes = document.querySelectorAll(
      `.${styles.inbox} input[type="checkbox"]`
    );

    let lastChecked;

    function handleCheck(e) {
      let inBetween = false;
      if (e.shiftKey && this.checked) {
        checkBoxes.forEach((checkBox) => {
          if (checkBox === this || checkBox === lastChecked) {
            inBetween = !inBetween;
          }

          if (inBetween) {
            checkBox.checked = true;
          }
        });
      }

      lastChecked = this;
    }

    checkBoxes.forEach((checkBox) =>
      checkBox.addEventListener("click", handleCheck)
    );
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-[#ffc600] pt-24">
        <div className={styles.inbox}>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>This is an inbox layout.</p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>Check one item</p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>Hold down your Shift key</p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>Check a lower item</p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>
              Everything in between should also be set to checked
            </p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>Try to do it without any libraries</p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>Just regular JavaScript</p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>Good Luck!</p>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <p className={styles.note}>Don't forget to tweet your result!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckBoxes;
