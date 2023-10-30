/* eslint-disable react/no-unescaped-entities */
import styles from "./panel.module.css";
import { useEffect } from "react";

const FlexPanelGallery = () => {

    useEffect(() => {
        const panels = document.querySelectorAll(`.${styles.panel}`)

        function toggleOpen() {
            this.classList.toggle(`${styles.open}`)
        }

        function toggleActive(e) {
            if (e.propertyName.includes('flex')) {
                this.classList.toggle(`${styles.open_active}`)
            }
        }

        panels.forEach(panel => panel.addEventListener('click', toggleOpen))
        panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))
    }, [])

    

  return (
    <>
      <div className={`${styles.panels}`}>
        <div className={`${styles.panel} ${styles.panel1}`}>
          <p>Hey</p>
          <p>Let's</p>
          <p>Dance</p>
        </div>
        <div className={`${styles.panel} ${styles.panel2}`}>
          <p>Give</p>
          <p>Take</p>
          <p>Receive</p>
        </div>
        <div className={`${styles.panel} ${styles.panel3}`}>
          <p>Experience</p>
          <p>It</p>
          <p>Today</p>
        </div>
        <div className={`${styles.panel} ${styles.panel4}`}>
          <p>Give</p>
          <p>All</p>
          <p>You can</p>
        </div>
        <div className={`${styles.panel} ${styles.panel5}`}>
          <p>Life</p>
          <p>In</p>
          <p>Motion</p>
        </div>
      </div>
    </>
  );
};

export default FlexPanelGallery;
