pragma circom 2.2.2;

include "./hangman.circom";

component main{public [commitment, guess, positions]} = Hangman(16);