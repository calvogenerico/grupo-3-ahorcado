import { describe, expect, it } from 'vitest';
import dedent from "dedent";
import { poseidon16 } from 'poseidon-lite'

describe('test01', () => {
  const source = dedent`
    pragma circom 2.2.2;
    include "hangman.circom";
    component main = Hangman(16);
  `;

  const MAX_WORD_LENGTH = 16;

  function buildWordSignals(word: string): bigint[] {
    let signals = word.split('').map(char => char.charCodeAt(0)).map(charCod => BigInt(charCod));

    while (signals.length < MAX_WORD_LENGTH) {
      signals.push(0n);
    }

    return signals;
  }

  function buildPositions(word: string, guess: string): bigint[] {
    const res: bigint[] = new Array(16).fill(0n);
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        res[i] = 1n;
      }
    }
    return res;
  }


  it('verifies ok when all conditions are valid', async () => {
    const word = 'chancle';
    const guess = 'a';
    const commitment = poseidon16(buildWordSignals(word));
    const positions = buildPositions(word, guess);
    positions[2] = 1n;

    await expect({
      source,
      signals: {
        commitment,
        guess: BigInt('a'.charCodeAt(0)),
        positions: positions,
        word: buildWordSignals(word),
      }
    }).toCircomExecOk();
  });

  it('verifies with error commitment does not match', async () => {
    const word = 'chancle';
    const guess = 'a';
    const positions = buildPositions(word, guess);

    const commitment = poseidon16(buildWordSignals(word)) + 1n; // wrong hash

    await expect({
      source,
      signals: {
        commitment,
        guess: BigInt('a'.charCodeAt(0)),
        positions: positions,
        word: buildWordSignals(word),
      }
    }).toCircomExecWithError();
  });

  it('verifies with extra true positions fails', async () => {
    const word = 'chancle';
    const guess = 'a';
    const commitment = poseidon16(buildWordSignals(word));
    const positions = buildPositions(word, guess);
    positions[0] = 1n; // <-- bad positions

    await expect({
      source,
      signals: {
        commitment,
        guess: BigInt('a'.charCodeAt(0)),
        positions: positions,
        word: buildWordSignals(word),
      }
    }).toCircomExecWithError();
  });

  it('verify with missing true position fail', async () => {
    const word = 'chancle';
    const guess = 'a';
    const commitment = poseidon16(buildWordSignals(word));
    const positions = buildPositions(word, guess);
    positions[2] = 0n; // <-- bad positions

    await expect({
      source,
      signals: {
        commitment,
        guess: BigInt('a'.charCodeAt(0)),
        positions: positions,
        word: buildWordSignals(word),
      }
    }).toCircomExecWithError();
  });
});