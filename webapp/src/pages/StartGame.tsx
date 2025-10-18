import { type InputEvent, useCallback, useState } from "react";
import { useHangman } from "../hooks/useHangman"
import { useZk } from "../hooks/useZk";
import { When } from "../components/When.tsx";
import { Link } from "react-router";
import * as React from "react";

export function StartGame() {
  const {startGame} = useHangman();
  const [secretWord, setSecretWord] = useState<string>('');
  const {calculateCommitment} = useZk();
  const onChange = useCallback(async(e: React.ChangeEvent<HTMLElement>) => {
    setSecretWord(e.target.value)
  }, [setSecretWord])

  const onClick = useCallback(async () => {
    const {commitment} = calculateCommitment('hola');

    await startGame.call(commitment);
  }, [startGame.call]);

  return <div>
    <When cond={startGame.waiting}>
      <div>
        waiting...
      </div>
    </When>


    <When cond={!startGame.waiting && startGame.res !== undefined}>
      <div>
        <p><b>Game id:</b>{startGame.res?.gameId}</p>
        <Link to={`/play/${startGame.res?.gameId}`}/>
      </div>
    </When>

    <When cond={!startGame.waiting && startGame.res === undefined}>
      <div>
        <input type="text" onChange={setSecretWord}>{secretWord}</input>
        <button onClick={onClick}>
          Nuevo juego
        </button>
      </div>
    </When>
  </div>
}
