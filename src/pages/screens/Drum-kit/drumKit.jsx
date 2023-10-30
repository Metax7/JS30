import notyDo from "../../../assets/audio/noty-do.mp4";
import re from "../../../assets/audio/re.mp3";
import mi from "../../../assets/audio/mi.mp3";
import fa from "../../../assets/audio/fa.mp3";
import sol from "../../../assets/audio/sol.mp3";
import lja from "../../../assets/audio/lja.mp3";
import si from "../../../assets/audio/si.mp3";
import styles from "./drumKit.module.css";

export default function About() {
  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(
      `.${styles.key}[data-key="${e.keyCode}"]`
    );
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add(styles.playing);

    function removeTransition(e) {
      if (e.propertyName !== "transform") return;
      this.classList.remove(styles.playing);
    }

    const keys = Array.from(document.getElementsByClassName(styles.key));
    keys.forEach((key) =>
      key.addEventListener("transitionend", removeTransition)
    );
  }
  window.addEventListener("keydown", playSound);

  return (
    <>
      <div className={styles.bgdiv}>
        <div className={styles.keys}>
          <div data-key="65" className={styles.key}>
            <kbd>A</kbd>
            <span className={styles.sound}>DO</span>
          </div>
          <div data-key="83" className={styles.key}>
            <kbd>S</kbd>
            <span className={styles.sound}>RE</span>
          </div>
          <div data-key="68" className={styles.key}>
            <kbd>D</kbd>
            <span className={styles.sound}>MI</span>
          </div>
          <div data-key="70" className={styles.key}>
            <kbd>F</kbd>
            <span className={styles.sound}>FA</span>
          </div>
          <div data-key="71" className={styles.key}>
            <kbd>G</kbd>
            <span className={styles.sound}>SOL</span>
          </div>
          <div data-key="72" className={styles.key}>
            <kbd>H</kbd>
            <span className={styles.sound}>LJA</span>
          </div>
          <div data-key="74" className={styles.key}>
            <kbd>J</kbd>
            <span className={styles.sound}>SI</span>
          </div>
        </div>
        <audio data-key="65" src={notyDo}></audio>
        <audio data-key="83" src={re}></audio>
        <audio data-key="68" src={mi}></audio>
        <audio data-key="70" src={fa}></audio>
        <audio data-key="71" src={sol}></audio>
        <audio data-key="72" src={lja}></audio>
        <audio data-key="74" src={si}></audio>
      </div>
    </>
  );
}
