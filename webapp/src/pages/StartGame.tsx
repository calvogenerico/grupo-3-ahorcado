import { useCallback, useState } from "react";
import { useHangman } from "../hooks/useHangman"
import { useZk } from "../hooks/useZk";
import { When } from "../components/When.tsx";
import { Link } from "react-router";
import type { ChangeEvent } from "../types/html.ts";
import { useStoreNewGame } from "../hooks/useLocalState.tsx";
import { useAccount } from "wagmi";

export function StartGame() {
  const { address } = useAccount();
  const [secretWord, setSecretWord] = useState<string>('');
  const {startGame} = useHangman();
  const {calculateCommitment} = useZk();
  const storeNewGame = useStoreNewGame();


  const onChange = useCallback(async (e: ChangeEvent) => {
    setSecretWord(e.target.value)
  }, [setSecretWord])

  const onClick = useCallback(async () => {
    if (!address) {
      return null;
    }

    const {commitment} = calculateCommitment(secretWord);
    const createGame = await startGame.call(commitment);
    storeNewGame(createGame.gameId, secretWord, address);
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
        <Link to={`/play/${startGame.res?.gameId}`}>
          Ir al jueguito!
        </Link>
      </div>
    </When>

    <When cond={!startGame.waiting && startGame.res === undefined}>
      <div>
        <input type="text" onChange={onChange}/>
        <button onClick={onClick}>
          Nuevo juego
        </button>
      </div>
    </When>
  </div>
}
