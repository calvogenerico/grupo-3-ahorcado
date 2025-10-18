import type { Hex } from "viem";

export class PlayerState {
  remainingAttempts: number;
  wordCommitment: bigint;
  wordLength: number;
  revealedLetters: bigint[];
  guessedLetters: number;
  currentGuess: bigint;
  lastActionTime: bigint;

  constructor(
    remainingAttempts: number,
    wordCommitment: bigint,
    wordLength: number,
    revealedLetters: bigint[],
    guessedLetters: number,
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
}
