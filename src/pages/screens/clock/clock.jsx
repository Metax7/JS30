import { useEffect, useRef } from "react";
import styles from "./clock.module.css";

export default function Clock() {
  const secondHandRef = useRef(null);
  const minHandRef = useRef(null);
  const hourHandRef = useRef(null);

  useEffect(() => {
    const secondHand = secondHandRef.current;
    const minHand = minHandRef.current;
    const hourHand = hourHandRef.current;

    function setDate() {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = (seconds / 60) * 360 + 90;
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

      const mins = now.getMinutes();
      const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
      minHand.style.transform = `rotate(${minsDegrees}deg)`;

      const hours = now.getHours();
      const hourDegrees = (hours / 12) * 360 + (mins / 60) * 30 + 90;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    const intervalId = setInterval(setDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div
        className={`${styles.clock_bg} h-[100vh] flex justify-center items-center`}
      >
        <div className={styles.clock}>
          <div className={styles.clock_face}>
            <div
              className={`${styles.hand} ${styles.hour_hand} rounded-xl`}
              ref={hourHandRef}
            ></div>
            <div
              className={`${styles.hand} ${styles.min_hand} rounded-xl`}
              ref={minHandRef}
            ></div>
            <div
              className={`${styles.hand} ${styles.second_hand} rounded-xl bg-red-600`}
              ref={secondHandRef}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
