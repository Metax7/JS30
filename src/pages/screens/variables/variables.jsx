import { useEffect, useState } from "react";
import styles from "./variables.module.css";

export default function Variables() {
  const [spacing, setSpacing] = useState(10);
  const [blur, setBlur] = useState(10);
  const [base, setBase] = useState("#ffc600");

  useEffect(() => {
    const inputs = document.querySelectorAll(`.${styles.controls} input`);
    const image = document.querySelector("#imageDisplay");

    function handleUpdate() {
      const suffix = this.dataset.sizing || "";
      image.style.setProperty(`--${this.name}`, this.value + suffix);
      console.log(this.name);
    }

    inputs.forEach((input) => {
      input.addEventListener("input", handleUpdate);
      input.addEventListener("mousemove", handleUpdate);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("input", handleUpdate);
        input.removeEventListener("mousemove", handleUpdate);
      });
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.main} flex flex-col items-center justify-center space-y-4 h-[100vh]`}
      >
        <h2 className="text-4xl font-semibold text-center">
          Update CSS
          <p>
            Variables with <span className={styles.hl}>JS</span>
          </p>
        </h2>
        <div
          className={`${styles.controls} flex flex-col items-center space-y-1`}
        >
          <div className="space-x-2">
            <label htmlFor="spacing"></label>
            <input
              type="range"
              id="spacing"
              name="spacing"
              min="10"
              max="200"
              value={spacing}
              data-sizing="px"
              onChange={(e) => setSpacing(e.target.value)}
            />
            <label htmlFor="blur"></label>
            <input
              type="range"
              id="blur"
              name="blur"
              min="0"
              max="25"
              value={blur}
              data-sizing="px"
              onChange={(e) => setBlur(e.target.value)}
            />
          </div>
          <label htmlFor="base"></label>
          <input
            type="color"
            id="base"
            name="base"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          />
        </div>
        <img
          id="imageDisplay"
          className="rounded-2xl"
          src="https://source.unsplash.com/7bwQXzbF6KE/800x500"
        ></img>
      </div>
    </>
  );
}
