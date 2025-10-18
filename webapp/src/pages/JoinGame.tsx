import { useParams } from "react-router";
import { useGameById } from "../hooks/useHangman";

export function JoinGame() {
  const params = useParams();
  const gameRes = useGameById(BigInt(params.gameId!));

  if (!gameRes.ready) {
    return <div>waiting...</div>
  }

  const game = gameRes.game;

  return <div>
    <div>
      <div>Player 1: {game.player1}</div>
      <div>Player 2: {game.player2}</div>
    </div>
  </div>
}
