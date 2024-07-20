import { useEffect, useRef, useState } from 'react';
import './App.css';
import Block from './components/Block';

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const win = checkWinner();
    if (win) {
      setMessage(`${currentTurn} won!`);
      setGameOver(true);
    } else if (state.every(block => block != null)) {
      setMessage("It's a draw!");
      setGameOver(true);
    } else {
      setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
    }
  }, [state]);

  const checkWinner = () => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] != null && state[a] === state[b] && state[a] === state[c]) {
        return true;
      }
    }
    return false;
  };

  const handleBlockClick = (index: number) => {
    if (state[index] != null || gameOver) {
      return;
    }
    const stateCopy = Array.from(state);
    stateCopy[index] = currentTurn;
    setState(stateCopy);
  };

  return (
    <div className='board'>
      <div className="row">
        <Block onClick={() => handleBlockClick(0)} value={state[0]} />
        <Block onClick={() => handleBlockClick(1)} value={state[1]} />
        <Block onClick={() => handleBlockClick(2)} value={state[2]} />
      </div>
      <div className="row">
        <Block onClick={() => handleBlockClick(3)} value={state[3]} />
        <Block onClick={() => handleBlockClick(4)} value={state[4]} />
        <Block onClick={() => handleBlockClick(5)} value={state[5]} />
      </div>
      <div className="row">
        <Block onClick={() => handleBlockClick(6)} value={state[6]} />
        <Block onClick={() => handleBlockClick(7)} value={state[7]} />
        <Block onClick={() => handleBlockClick(8)} value={state[8]} />
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;
