import { useNavigate } from "react-router";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { hangmanAbi } from "../abis/hangman-abi";
import { parseEventLogs } from "viem";
import { useAsyncAction } from "./useAsyncAction.ts";
import { HangmanGame, PlayerState } from "./HagmanState.ts";
import { useEffect, useState } from "react";

const HANGMAN_ADDRESS = import.meta.env.VITE_HANGMAN_ADDRESS;


export function useHangman() {
  const {isConnected} = useAccount();
  const navigate = useNavigate();
  const {data: walletClient} = useWalletClient();
  const publicClient = usePublicClient();

  const startGame = useAsyncAction(async (commitment: bigint) => {
    if (!isConnected || !walletClient || !publicClient) {
      navigate('/');
    }

    if (!walletClient) {
      throw new Error();
    }

    const txHash = await walletClient.writeContract({
      abi: hangmanAbi,
      functionName: 'createGame',
      address: HANGMAN_ADDRESS,
      args: [commitment, 16]
    });

    const receipt = await publicClient!.waitForTransactionReceipt({hash: txHash});
    const logs = parseEventLogs({
      abi: hangmanAbi,
      logs: receipt.logs,
    });

    const newGameLog = logs.find(l => l.eventName === 'GameCreated');

    if (newGameLog === undefined) {
      throw new Error('No new game event');
    }

    return {
      txHash: txHash,
      gameId: BigInt(newGameLog.topics[1]),
    };
  });
  //
  //
  // const joinGame = useAsyncAction(async (gameId: string, commitment: bigint) => {
  //   if (!walletClient || !publicClient) {
  //     console.log(walletClient);
  //     throw new Error('a');
  //   }
  //
  //   const txHash = await walletClient.writeContract({
  //     abi: hangmanAbi,
  //     functionName: 'joinGame',
  //     args: [BigInt(gameId), commitment, 16],
  //     address: HANGMAN_ADDRESS
  //   });
  //
  //   const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  //
  //   const logs = parseEventLogs({
  //     abi: hangmanAbi,
  //     logs: receipt.logs
  //   });
  //
  //   const log = logs.find(l => l.eventName === 'GameStarted');
  //
  //   if (!log) {
  //     throw new Error('No tiró nada');
  //   }
  //
  //
  //   return {
  //     gameId: log.topics[0],
  //     player1: log.topics[1],
  //     player2: log.topics[2],
  //   };
  // });
  //
  // const submitGuess = useAsyncAction(async(gameId: string, guess: string) => {
  //   if (!walletClient || !publicClient) {
  //     console.log(walletClient, error);
  //     throw new Error('falta algo');
  //   }
  //   console.log('guess', guess)
  //
  //   const charCode = guess.charCodeAt(0);
  //
  //   const txHash = await walletClient.writeContract({
  //     abi: hangmanAbi,
  //     functionName: 'submitGuess',
  //     args: [BigInt(gameId), BigInt(charCode)],
  //     address: HANGMAN_ADDRESS
  //   });
  //
  //   const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  //
  //   const logs = parseEventLogs({
  //     abi: hangmanAbi,
  //     logs: receipt.logs
  //   });
  //
  //   const log = logs.find(l => l.eventName === 'GuessSubmitted');
  //
  //   if (!log) {
  //     throw new Error('there should be a log');
  //   }
  //
  //   return {
  //     gameId: log.topics[0],
  //     player: log.topics[1],
  //     guess: log.topics[2]
  //   }
  // });


  return {
    startGame,
  }
}


type GameById = {
  ready: true,
  game: HangmanGame
} | {
  ready: false,
  game: null
}

export const useGameById = (gameId: bigint): GameById => {
  const publicClient = usePublicClient();
  const [game, setGame] = useState<HangmanGame | null>(null);
  if (!publicClient) {
    throw new Error();
  }

  useEffect(() => {
    publicClient.readContract({
      abi: hangmanAbi,
      functionName: 'games',
      args: [BigInt(gameId)],
      address: import.meta.env.VITE_HANGMAN_ADDRESS,
    }).then(res => {
      const state1 = new PlayerState(
        res[2].remainingAttempts,
        res[2].wordCommitment,
        res[2].wordLength,
        [...res[2].revealedLetters],
        res[2].guessedLetters,
        res[2].currentGuess,
        res[2].lastActionTime
      )

      const state2 = new PlayerState(
        res[3].remainingAttempts,
        res[3].wordCommitment,
        res[3].wordLength,
        [...res[3].revealedLetters],
        res[3].guessedLetters,
        res[3].currentGuess,
        res[3].lastActionTime
      )

      setGame(new HangmanGame(
        res[0],
        res[1],
        state1,
        state2,
        res[4]
      ));
    });
  }, [gameId]);

  if (game === null) {
    return {
      ready: false,
      game: null
    }
  } else {
    return {
      ready: true,
      game
    }
  }
};
