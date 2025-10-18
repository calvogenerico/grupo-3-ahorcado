import type { Hex } from "viem";
import type { Groth16Proof } from "snarkjs";
import { z } from 'zod';
import { useCallback, useState } from "react";

const numericString = z.templateLiteral([z.number()]);
const hexSchema = z.templateLiteral(
  [z.literal('0x'), z.string().regex(/(0-9a-fA-F)+/)]
);

const proofSchema = z.object({
  pi_a: numericString.array(),
  pi_b: numericString.array().array(),
  pi_c: numericString.array(),
  protocol: z.string(),
  curve: z.string()
});

const roundDataSchema = z.object({
  roundNumber: z.number(),
  theirGuess: z.string(),
  ourCommitment: z.string(),
  ourProof: proofSchema
});

const localStateSchema = z.object({
  secretWord: z.string(),
  ourAddress: hexSchema,
  rounds: z.array(roundDataSchema)
})


export class RoundData {
  roundNumber: number;
  thirGuess: string;
  ourCommitment: string;
  ourProof: Groth16Proof;

  constructor(
    roundNumber: number,
    thirGuess: string,
    ourCommitment: string,
    ourProof: Groth16Proof,
  ) {
    this.roundNumber = roundNumber;
    this.thirGuess = thirGuess;
    this.ourCommitment = ourCommitment;
    this.ourProof = ourProof;
  }

  static fromSerialized(obj: unknown) {
    const data = roundDataSchema.parse(obj);

    return new RoundData(
      data.roundNumber,
      data.theirGuess,
      data.ourCommitment,
      data.ourProof
    )
  }

  toPlainObject(): object {
    return {
      roundNumber: this.roundNumber,
      thirGuess: this.thirGuess,
      ourCommitment: this.ourCommitment,
      ourProof: {
        pi_a: this.ourProof.pi_a,
        pi_b: this.ourProof.pi_b,
        pi_c: this.ourProof.pi_c,
        protocol: this.ourProof.protocol,
        curve: this.ourProof.curve
      }
    };
  }
}


class GameLocalState {
  secretWord: string;
  ourAddress: Hex;
  rounds: RoundData[];

  private constructor(secretWord: string, ourAddress: Hex, rounds: RoundData[]) {
    this.secretWord = secretWord;
    this.ourAddress = ourAddress;
    this.rounds = rounds;
  }

  static empty(secretWord: string, ourAddress: Hex): GameLocalState {
    return new this(
      secretWord,
      ourAddress,
      []
    );
  }

  static fromSerialized(data: string): GameLocalState {
    const obj = JSON.parse(data);
    const parsed = localStateSchema.parse(obj);

    return new GameLocalState(
      parsed.secretWord,
      parsed.ourAddress,
      parsed.rounds.map(round => RoundData.fromSerialized(round))
    );
  }

  addRound(newRound: RoundData): GameLocalState {
    return new GameLocalState(
      this.secretWord,
      this.ourAddress,
      [...this.rounds, newRound]
    )
  }

  serialize(): string {
    const plain = {
      secretWord: this.secretWord,
      ourAddress: this.ourAddress,
      rounds: this.rounds.map(r => r.toPlainObject())
    }

    return JSON.stringify(plain);
  }
}

function gameKey(id: bigint): string {
  return `game:${id.toString()}`
}

function useWrappedUpdate(setGame: (g: GameLocalState) => void, id: bigint): (g: GameLocalState) => void {
  return useCallback((g: GameLocalState) => {
    localStorage.setItem(gameKey(id), g.serialize())
    setGame(g);
  }, [setGame, id]);
}


type LoadedGame = {
  isPresent: false
} | {
  isPresent: true,
  game: GameLocalState,
  setGame: (g: GameLocalState) => void
}


export function useLocalGameState(id: bigint): LoadedGame {
  const res = localStorage.getItem(gameKey(id));
  const initialGame = res !== null
    ? GameLocalState.fromSerialized(res)
    : null;

  const [game, setGame] = useState<GameLocalState | null>(initialGame);
  const updateGame = useWrappedUpdate(setGame, id)

  if (game === null) {
    return {isPresent: false}
  }

  return {
    isPresent: true,
    game,
    setGame: updateGame
  }
}

type NewGame = (id: bigint, secretWord: string, ourAddress: Hex) => void;

export function useStoreNewGame(): NewGame {
  return useCallback((id: bigint, secretWord: string, ourAddress: Hex) => {
    const game = GameLocalState.empty(secretWord, ourAddress);
    localStorage.setItem(gameKey(id), game.serialize())
  }, [])
}
