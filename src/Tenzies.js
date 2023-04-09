import React, { useState } from "react";
import "./index.scss";

const Tenzies = () => {
  const initialDice = Array(10)
    .fill()
    .map(() => Math.floor(Math.random() * 6) + 1);
  const [dice, setDice] = useState(initialDice);
  const [frozen, setFrozen] = useState([]);
  const [rolls, setRolls] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const rollDice = () => {
    const newDice = [...dice];
    let newRolls = rolls + 1;
    for (let i = 0; i < newDice.length; i++) {
      if (!frozen.includes(i)) {
        newDice[i] = Math.floor(Math.random() * 6) + 1;
        if (frozen.includes(i) && newDice[i] !== dice[i]) {
          newDice[i] = dice[i];
        }
      }
    }
    setDice(newDice);
    setRolls(newRolls);
    if (newDice.every((val) => val === newDice[0])) {
      setGameOver(true);
    }
  };

  const toggleFreeze = (index) => {
    if (frozen.includes(index)) {
      setFrozen(frozen.filter((i) => i !== index));
    } else {
      setFrozen([...frozen, index]);
    }
  };

  const resetGame = () => {
    setDice(initialDice);
    setFrozen([]);
    setRolls(0);
    setGameOver(false);
  };

  const allDiceEqual = dice.every((val) => val === dice[0]);
  const score = allDiceEqual ? rolls : null;

  return (
    <div className="tenzies-container">
      <div className="active">
        <h1 className="tenzies-title">Tenzies 7.0 🎲</h1>
        <p className="tenzies-instruction">
          Roll until all dices 🎲 are the same. Click each dice 🎲 to freeze it
          at its current value between rolls.
        </p>
        <div className="tenzies-dice-container">
          {dice.map((value, index) => (
            <div
              key={index}
              className={`tenzies-dice ${
                frozen.includes(index) ? "frozen" : ""
              }`}
              onClick={() => toggleFreeze(index)}
            >
              {value}
            </div>
          ))}
        </div>
        <button
          className="tenzies-roll-button"
          onClick={gameOver ? resetGame : rollDice}
        >
          {gameOver ? "Play Again" : "Roll 🎲"}
        </button>
        {score !== null && (
          <div>
            <p className="tenzies-score">You won in {score} rolls 🎉</p>
          </div>
        )}
        <p className="tenzies-rolls">Rolls: {rolls}</p>
      </div>
    </div>
  );
};

export default Tenzies;
