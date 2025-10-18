import type { Hex } from "viem";

type SerializedPlayerState = {
  remainingAttempts: number;
  wordCommitment: string;
  wordLength: number;
  revealedLetters: string[];
  guessedLetters: Hex;
  currentGuess: string;
  lastActionTime: string;
}

type SerializedHangman = {
  player1: Hex;
  player2: Hex;
  player1State: SerializedPlayerState;
  player2State: SerializedPlayerState;
  status: number;
}

export class PlayerState {
  remainingAttempts: number;
  wordCommitment: bigint;
  wordLength: number;
  revealedLetters: bigint[];
  guessedLetters: Hex;
  currentGuess: bigint;
  lastActionTime: bigint;

  constructor(
    remainingAttempts: number,
    wordCommitment: bigint,
    wordLength: number,
    revealedLetters: bigint[],
    guessedLetters: Hex,
    currentGuess: bigint,
    lastActionTime: bigint
  ) {
    this.remainingAttempts = remainingAttempts;
    this.wordCommitment = wordCommitment;
    this.wordLength = wordLength;
    this.revealedLetters = revealedLetters;
    this.guessedLetters = guessedLetters;
    this.currentGuess = currentGuess;
    this.lastActionTime = lastActionTime;
  }

  serialize(): SerializedPlayerState {
    return {
      remainingAttempts: this.remainingAttempts,
      wordCommitment: this.wordCommitment.toString(),
      wordLength: this.wordLength,
      revealedLetters: this.revealedLetters.map(l => l.toString()),
      guessedLetters: this.guessedLetters,
      currentGuess: this.currentGuess.toString(),
      lastActionTime: this.lastActionTime.toString()
    }
  }

  static fromSerialization(data: SerializedPlayerState): PlayerState {
    return new PlayerState(
      data.remainingAttempts,
      BigInt(data.wordCommitment),
      data.wordLength,
      data.revealedLetters.map(r => BigInt(r)),
      data.guessedLetters,
      BigInt(data.currentGuess),
      BigInt(data.lastActionTime)
    )
  }
}

export class HangmanGame {
  player1: Hex;
  player2: Hex;
  player1State: PlayerState;
  player2State: PlayerState;
  status: number;

  constructor(
    player1: Hex,
    player2: Hex,
    player1State: PlayerState,
    player2State: PlayerState,
    status: number
  ) {
    this.player1 = player1;
    this.player2 = player2;
    this.player1State = player1State;
    this.player2State = player2State;
    this.status = status;
  }

  serialize(): SerializedHangman {
    return {
      player1: this.player1,
      player2: this.player2,
      player1State: this.player1State.serialize(),
      player2State: this.player2State.serialize(),
      status: this.status,
    }
  }




  static fromSerialization(data: SerializedHangman) {
    return new this(
      data.player1,
      data.player2,
      PlayerState.fromSerialization(data.player1State),
      PlayerState.fromSerialization(data.player2State),
      data.status
    )
  }
}
