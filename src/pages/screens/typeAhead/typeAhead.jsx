import { useEffect } from "react";
import styles from "./typeAhead.module.css";

const TypeAhead = () => {
  useEffect(() => {
    const endpoint =
      "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

    const cities = [];
    fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => cities.push(...data));

    function findMatches(wordToMatch, cities) {
      return cities.filter((place) => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
      });
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function displayMatches() {
      const matchArray = findMatches(this.value, cities);
      const html = matchArray
        .map((place) => {
          const regex = new RegExp(this.value, "gi");
          const cityName = place.city.replace(
            regex,
            `<span class=${styles.hl}>${this.value}</span>`
          );
          const stateName = place.state.replace(
            regex,
            `<span class=${styles.hl}>${this.value}</span>`
          );
          return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
        })
        .join("");
      suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector(`.${styles.search}`);
    const suggestions = document.querySelector(`.${styles.suggestions}`);

    searchInput.addEventListener("change", displayMatches);
    searchInput.addEventListener("keyup", displayMatches);
  }, []);

  return (
    <>
      <div className="max-w-full h-screen bg-yellow-400 pt-20">
        <form className={`${styles.search_form}`}>
          <input
            type="text"
            className={`${styles.search}`}
            placeholder="City or State"
          />
          <ul className={`${styles.suggestions} overflow-auto h-96`}>
            <li>Filter for a city</li>
            <li>or a state</li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default TypeAhead;
