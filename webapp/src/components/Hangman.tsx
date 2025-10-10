import { useState } from "react";

export default function Hangman() {
    const [word, setWord] = useState("HOLA"); // palabra secreta
    const [guessed, setGuessed] = useState(Array(word.length).fill("_"));
    const [letter, setLetter] = useState("");
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

    const handleGuess = () => {
        const upperLetter = letter.toUpperCase();
        let newGuessed = [...guessed];
        let correct = false;

        for (let i = 0; i < word.length; i++) {
            if (word[i] === upperLetter) {
                newGuessed[i] = upperLetter;
                correct = true;
            }
        }

        if (!correct) {
            setWrongGuesses([...wrongGuesses, upperLetter]);
        }

        setGuessed(newGuessed);
        setLetter("");
    };

    return (
        <div className="flex flex-col items-center p-6 space-y-6">
            <h1 className="text-3xl font-bold">Juego del Ahorcado ZK 🕵️‍♂️</h1>

            <div className="text-4xl tracking-widest">
                {guessed.map((ch, i) => (
                    <span key={i} className="mx-2">{ch}</span>
                ))}
            </div>

            <div className="flex space-x-2">
                <input
                    type="text"
                    value={letter}
                    maxLength={1}
                    onChange={(e) => setLetter(e.target.value)}
                    className="border p-2 text-lg uppercase text-center w-12"
                />
                <button
                    onClick={handleGuess}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Probar letra
                </button>
            </div>

            <div className="text-red-500">
                Letras incorrectas: {wrongGuesses.join(", ")}
            </div>
        </div>
    );
}
