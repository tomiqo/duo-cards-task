import { decorateHint } from "./utils/decorateHint";
import cardsData from "./data/cardsList.json";
import type {Card} from "./model/Card.ts";

function App() {
  // loaded directly with test data
  const cards: Card[] = cardsData.cards;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>DuoCards - decorateHint Demo (offline)</h1>
      {cards.map((card, idx) => (
        <div key={idx} style={{ marginBottom: "1rem", border: "1px solid black", padding: "1rem" }}>
          <p><strong>Front:</strong> {card.front}</p>
          <p><strong>Hint:</strong> {decorateHint(card)}</p>
        </div>
      ))}
    </div>
  );
}

export default App;