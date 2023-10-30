import { useEffect } from "react";

const DevTools = () => {
  function makeGreen() {
    const p = document.querySelector("#break");
    p.style.color = "#BADA55";
    p.style.fontSize = "50px";
  }

  useEffect(() => {
    const dogs = [
      { name: "Snickers", age: 2 },
      { name: "Hugo", age: 8 },
    ];

    // Regular
    console.log("Hello");

    // Interpolated
    console.log("Hello I am a %s developer!", "💩");

    // Styled
    console.log(
      "%c Welcome to the console",
      "font-size: 50px; background-color: purple; padding: 10px; border-radius: 20px; color: tomato;"
    );

    // warning!
    console.warn("HOLD ON");

    // Error :|
    console.error("HOLY CRAP!");

    // Info
    console.info("I have a 7 fingers ;)");

    // Testing
    const p = document.querySelector("#break");

    console.assert(p.classList.contains("ouch"), "You are god damn wrong!");

    // clearing
    // console.clear()

    // Viewing DOM Elements
    console.log(p);
    console.dir(p);

    // Grouping together
    dogs.forEach((dog) => {
      console.groupCollapsed(`${dog.name}`);
      console.log(`This is ${dog.name}`);
      console.log(`He is ${dog.age} years old`);
      console.groupEnd(`${dog.name}`);
    });

    // counting
    console.count("React");
    console.count("React");
    console.count("React");
    console.count("Next");
    console.count("React");
    console.count("React");

    console.count("Next");
    console.count("Next");
    console.count("React");
    console.count("React");

    // timing
    console.time("fetching data");
    fetch("https://api.github.com/users/wesbos")
      .then((data) => data.json())
      .then((data) => {
        console.timeEnd("fetching data");
        console.log(data);
      });
  }, []);

  return (
    <>
      <p id="break" onClick={makeGreen}>
        ×BREAK×DOWN×
      </p>
    </>
  );
};

export default DevTools;
