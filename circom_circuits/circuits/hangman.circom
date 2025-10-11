pragma circom 2.2.2;

include "circomlib/circuits/poseidon.circom";
include "circomlib/circuits/comparators.circom";

template Hangman(MaxLen) {
    input signal commitment;
    input signal guess;
    input signal positions[MaxLen];
    input signal word[MaxLen];

    signal calculatedCommitment <== Poseidon(MaxLen)(word);
    calculatedCommitment === commitment;

    signal xx[MaxLen];

    for(var i = 0; i < MaxLen; i++) {
        xx[i] <== IsEqual()([word[i], guess]);
        xx[i] === positions[i];
    }
}
