import { useState } from "react";
import Reveal from "./Reveal";

const CARDS = ["📊", "📈", "🤖", "🧠", "💻", "🐍"];

type CardState = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function Game() {
  const initGameData = () => {
    return [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
  };

  const [cards, setCards] = useState<CardState[]>(initGameData);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const initGame = () => {
    setCards(initGameData());
    setFlipped([]);
    setMoves(0);
    setWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    setCards(prev => {
      const next = [...prev];
      next[index] = { ...next[index], isFlipped: true };
      return next;
    });

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setCards(prev => prev.map((c, i) => 
          (i === first || i === second) ? { ...c, isMatched: true, isFlipped: true } : c
        ));
        setFlipped([]);
        
        // Use functional state check for win condition because setCards is async
        setCards(prev => {
          if (prev.every(c => c.isMatched)) {
            setWon(true);
          }
          return prev;
        });
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => 
            (i === first || i === second) ? { ...c, isFlipped: false } : c
          ));
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <section className="py-14 sm:py-20 md:py-28 border-t border-edge relative overflow-hidden bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl font-medium text-ink mb-2 sm:mb-3">
              Take a break from the data.
            </h3>
            <p className="text-xs sm:text-sm text-muted font-mono">
              Memory Match • {moves} moves
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-4 gap-2.5 xs:gap-3 sm:gap-4 mb-8 sm:mb-10 perspective-1000">
              {cards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`cursor-interactive relative aspect-square rounded-lg sm:rounded-xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-500 transform-style-3d ${
                    card.isFlipped || card.isMatched
                      ? "rotate-y-180 bg-surface2 border border-accent/40 shadow-inner"
                      : "bg-surface border border-edge2 hover:border-accent/30 hover:-translate-y-1 hover:shadow-md"
                  }`}
                  aria-label="Memory Card"
                >
                  <span className={`transition-all duration-300 ${card.isFlipped || card.isMatched ? "opacity-100 scale-100 rotate-y-180" : "opacity-0 scale-50"}`}>
                    {card.emoji}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-center min-h-[48px]">
              {won ? (
                <div className="text-accent font-medium animate-fadeUp flex flex-col sm:flex-row items-center justify-center text-center gap-2.5 sm:gap-4 bg-accent/10 px-4 sm:px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-full border border-accent/20 w-full sm:w-auto">
                  <span className="text-xs sm:text-sm">Great job! You won in {moves} moves.</span>
                  <button onClick={initGame} className="cursor-interactive px-3.5 py-1.5 rounded-full bg-accent text-[#0B0F1C] text-xs font-semibold hover:scale-105 transition-transform shrink-0">Play Again</button>
                </div>
              ) : (
                <button
                  onClick={initGame}
                  className="cursor-interactive px-6 py-2.5 rounded-full border border-edge2 text-xs sm:text-sm text-muted hover:text-ink hover:border-edge transition-colors font-mono"
                >
                  Restart Game
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
