import ScriptCard from "../../../components/scriptCard";
import CardImg from "../../../assets/img/drumCardBg.webp";
import CardImg2 from "../../../assets/img/small1.webp";
import CardImg3 from "../../../assets/img/small2.webp";
import CardImg4 from "../../../assets/img/small3.jpg";
import CardImg5 from "../../../assets/img/small4.webp";
import CardImg6 from "../../../assets/img/small5.webp";
import CardImg7 from "../../../assets/img/small6.webp";
import CardImg8 from "../../../assets/img/small7.webp";
import CardImg9 from "../../../assets/img/small8.webp";
import CardImg10 from "../../../assets/img/small9.webp";
import CardImg11 from "../../../assets/img/small10.webp";

export default function Home() {
  const card = [
    {
      cardImg: CardImg,
      cardTitle: "JavaScript Drum Kit",
      cardLink: "/drum-kit",
    },
    {
      cardImg: CardImg2,
      cardTitle: "CSS + JS Clock",
      cardLink: "/clock",
    },
    {
      cardImg: CardImg3,
      cardTitle: "Playing with CSS Variables and JS",
      cardLink: "/variables",
    },
    {
      cardImg: CardImg4,
      cardTitle: "Array Cardio Day 1",
      cardLink: "/array-cardio-1",
    },
    {
      cardImg: CardImg5,
      cardTitle: "Flex Panel Gallery",
      cardLink: "/flex-panel-gallery",
    },
    {
      cardImg: CardImg6,
      cardTitle: "Type Ahead",
      cardLink: "/type-ahead",
    },
    {
      cardImg: CardImg7,
      cardTitle: "Array Cardio Day 2",
      cardLink: "/array-cardio-2",
    },
    {
      cardImg: CardImg8,
      cardTitle: "Canvas Painting",
      cardLink: "/canvas-painting",
    },
    {
      cardImg: CardImg9,
      cardTitle: "Dev Tools Domination",
      cardLink: "/dev-tools",
    },
    {
      cardImg: CardImg10,
      cardTitle: "Hold Shift to Check Multiple Checkboxes",
      cardLink: "/checkboxes",
    },
    {
      cardImg: CardImg11,
      cardTitle: "Custom Video Player",
      cardLink: "/video-player",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto mt-20 px-7 md:px-12 lg:px-7 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {card &&
          card.map((item, index) => {
            return <ScriptCard key={index} {...item} />;
          })}
      </div>
    </div>
  );
}
