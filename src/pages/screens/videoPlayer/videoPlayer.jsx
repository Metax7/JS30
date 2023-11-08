import styles from "./videoPlayer.module.css";
import video from "../../../assets/video/652333414.mp4";
import { useEffect } from "react";

const VideoPlayer = () => {
  useEffect(() => {
    // Get our Elements
    const player = document.querySelector(`.${styles.player}`);
    const video = document.querySelector(`.${styles.player__video}`);
    const progress = document.querySelector(`.${styles.progress}`);
    const progressBar = document.querySelector(`.${styles.progress__filled}`);
    const toggle = document.querySelector(`.${styles.toggle}`);
    const skipButtons = document.querySelectorAll("[data-skip]");
    const ranges = document.querySelectorAll(`.${styles.player__slider}`);

    // Build Our Functions
    function togglePlay() {
      const method = video.paused ? "play" : "pause";
      video[method]();
    }

    function updateButton() {
      const icon = this.paused ? "►" : "❚ ❚";
      toggle.textContent = icon;
    }

    // Hook Ip The Event Listeners
    video.addEventListener("click", togglePlay);
    video.addEventListener("play", updateButton);
  }, []);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.player}>
          <video
            className={`${styles.player__video} ${styles.viewer}`}
            src={video}
          ></video>
          <div className={styles.player__controls}>
            <div className={styles.progress}>
              <div className={styles.progress__filled}></div>
            </div>
            <button
              className={`${styles.player__button} ${styles.toggle}`}
              title="Toggle Play"
            >
              ►
            </button>
            <input
              type="range"
              name="volume"
              className={styles.player__slider}
              min="0"
              max="1"
              step="0.05"
              value="1"
            />
            <input
              type="range"
              name="playbackRate"
              className={styles.player__slider}
              min="0.5"
              max="2"
              step="0.1"
              value="1"
            />
            <button data-skip="-10" className={styles.player__button}>
              « 10s
            </button>
            <button data-skip="25" className={styles.player__button}>
              25s »
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
