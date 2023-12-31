const ArrayCardio2 = () => {
  // ## Array Cardio Day 2

  const people = [
    { name: "Wes", year: 1988 },
    { name: "Kait", year: 1986 },
    { name: "Irv", year: 1970 },
    { name: "Lux", year: 2015 },
  ];

  const comments = [
    { text: "Love this!", id: 523423 },
    { text: "Super good", id: 823423 },
    { text: "You are the best", id: 2039842 },
    { text: "Ramen is my fav food ever", id: 123523 },
    { text: "Nice Nice Nice!", id: 542328 },
  ];

  // Some and Every Checks
  // Array.prototype.some() // is at least one person 19 or older?

  //   const isAdult = people.some(function (person) {
  //     const currentYear = new Date().getFullYear();
  //     if (currentYear - person.year >= 19) {
  //       return true;
  //     }
  //   });

  //   console.log(isAdult);

  const isAdult = people.some(
    (person) => new Date().getFullYear() - person.year >= 19
  );

  console.log(isAdult);

  // Array.prototype.every() // is everyone 19 or older?

  const adultAll = people.every(
    (person) => new Date().getFullYear() - person.year >= 19
  );

  console.log(adultAll);
  console.log(import.meta.env.VITE_JS30_ENV)

  // Array.prototype.find()
  // Find is like filter, but instead returns just the one you are looking for
  // find the comment with the ID of 823423

  const comment = comments.find((comment) => comment.id === 2039842);

  console.log(comment);

  // Array.prototype.findIndex()
  // Find the comment with this ID
  // delete the comment with the ID of 823423

  const index = comments.findIndex((comment) => comment.id === 2039842);
  console.log(index);

  //   comments.splice(index, 2)

  const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1),
  ];

  console.table(newComments);

  return (
    <>
      <div className="w-full h-screen flex justify-center mt-52 font-semibold text-3xl">
        <p className="uppercase">
          Just open the <em className="text-yellow-400 font-black">JS</em>{" "}
          console again 💁
        </p>
      </div>
    </>
  );
};

export default ArrayCardio2;
