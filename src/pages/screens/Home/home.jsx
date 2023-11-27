import { cards } from "../../../assets/data/CardsData";
import ScriptCard from "../../../components/scriptCard";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto mt-20 px-7 md:px-12 lg:px-7 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards &&
          cards.map((card) => {
            return <ScriptCard key={card.id} {...card} />;
          })}
      </div>
    </div>
  );
}
