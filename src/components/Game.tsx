import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import Reveal from "./Reveal";

const checkWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
};

const getComputerMove = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // Try to win or block
  for (const player of ['O', 'X']) {
    for (const [a, b, c] of lines) {
      if (squares[a] === player && squares[b] === player && !squares[c]) return c;
      if (squares[a] === player && !squares[b] && squares[c] === player) return b;
      if (!squares[a] && squares[b] === player && squares[c] === player) return a;
    }
  }

  // Take center
  if (!squares[4]) return 4;

  // Random
  const available = squares.map((s, i) => s === null ? i : null).filter((s): s is number => s !== null);
  if (available.length === 0) return -1;
  return available[Math.floor(Math.random() * available.length)];
};

export default function Game() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [isDraw, setIsDraw] = useState(false);

  const initGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setMoves(0);
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false);
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const move = getComputerMove(board);
        if (move !== -1) {
          handleMove(move, 'O');
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner, isDraw]);

  const handleMove = (index: number, player: string) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    if (player === 'X') {
      setMoves(m => m + 1);
    }

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
    } else if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
    } else {
      setIsPlayerTurn(player === 'O');
    }
  };

  let statusText = "Your turn (X)";
  let statusColor = "bg-sky-400";
  let statusBorder = "border-sky-400/30";
  
  if (winner === 'X') {
    statusText = "You win!";
    statusColor = "bg-green-400";
    statusBorder = "border-green-400/40";
  } else if (winner === 'O') {
    statusText = "Computer wins!";
    statusColor = "bg-fuchsia-400";
    statusBorder = "border-fuchsia-400/40";
  } else if (isDraw) {
    statusText = "Draw!";
    statusColor = "bg-slate-400";
    statusBorder = "border-slate-400/40";
  } else if (!isPlayerTurn) {
    statusText = "Computer thinking...";
    statusColor = "bg-fuchsia-400";
    statusBorder = "border-fuchsia-400/30";
  }

  return (
    <section className="py-14 sm:py-20 md:py-28 border-t border-edge relative overflow-hidden bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl font-medium text-ink mb-2 sm:mb-3">
              Take a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">break</span> from the data.
            </h3>
            <p className="text-xs sm:text-sm text-muted font-mono">
              Tic-Tac-Toe • {moves} moves
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="max-w-md mx-auto flex flex-col items-center">
            
            {/* Status Bubble */}
            <div className={`mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border bg-surface2/50 backdrop-blur-sm transition-all duration-300 ${statusBorder}`}>
              <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${statusColor}`} />
              <span className="text-xs sm:text-sm font-mono text-slate-300">{statusText}</span>
            </div>

            {/* Board */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-[260px] sm:max-w-[320px] mb-8">
              {board.map((cell, idx) => {
                const isWinningCell = winningLine.includes(idx);
                const cellWinnerColor = winner === 'X' 
                  ? 'border-sky-400/50 bg-sky-400/10 shadow-[0_0_20px_rgba(56,189,248,0.2)]' 
                  : 'border-fuchsia-400/50 bg-fuchsia-400/10 shadow-[0_0_20px_rgba(232,121,249,0.2)]';
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleMove(idx, 'X')}
                    disabled={!isPlayerTurn || cell !== null || winner !== null || isDraw}
                    className={`cursor-interactive relative aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 
                      ${cell ? 'bg-surface2 border border-edge' : 'bg-surface/40 border border-edge2 hover:border-sky-500/40 hover:-translate-y-0.5 hover:bg-surface2 hover:shadow-[0_4px_20px_rgba(56,189,248,0.1)]'}
                      ${isWinningCell ? cellWinnerColor + ' scale-105 z-10' : ''}
                      ${!isPlayerTurn && !cell && !winner && !isDraw ? 'opacity-80' : ''}
                    `}
                    aria-label={`Cell ${idx}`}
                  >
                    <div className="transition-transform duration-300">
                      {cell === 'X' && (
                        <svg className="w-10 h-10 sm:w-14 sm:h-14 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                        </svg>
                      )}
                      {cell === 'O' && (
                        <svg className="w-10 h-10 sm:w-14 sm:h-14 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="8.5"/>
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Controls */}
            <div className="flex justify-center min-h-[48px]">
              <button
                onClick={initGame}
                className="cursor-interactive group flex items-center gap-2 px-5 py-2.5 rounded-full border border-edge2 text-xs sm:text-sm text-muted hover:text-ink hover:border-edge hover:bg-surface2 transition-all font-mono shadow-sm hover:shadow-md"
              >
                <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                Restart Game
              </button>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
