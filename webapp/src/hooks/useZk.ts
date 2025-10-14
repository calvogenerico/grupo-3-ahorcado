import { poseidon16 } from 'poseidon-lite';
import { groth16 } from 'snarkjs';



export function useZk() {
  
  const calculateCommitment = (word: string) => {
    if (word.length > 16) {
      throw new Error('Words longer than 16 characters do not exist in this realm');
    }

    const chars = word.split('').map(char => char.charCodeAt(0));

    while (chars.length < 16) {
      chars.push(0);
    }

    const commitment = poseidon16(chars.map(c => BigInt(c)));
    return {
      commitment,
      chars
    };
  }

  const calculateProof = async (word: string, guess: string) => {
    if (guess.length !== 1) {
      throw new Error('Exactly 1 letter at the time should be guessed');
    }

    const guessCode = guess.charCodeAt(0);
    const {commitment, chars} = calculateCommitment(word);
    const positions = chars.map(c => c === guessCode);

    const { proof, publicSignals} = await groth16.fullProve(
      {
        commitment,
        guess: guessCode,
        positions: positions.map(g => g ? 1n : 0n),
        word: chars
      },
      '/circuit.wasm',
      '/circuit.zkey',
      console
    )


    return {
      proof,
      publicSignals
    };
  }

  return {
    calculateCommitment,
    calculateProof
  }
}
