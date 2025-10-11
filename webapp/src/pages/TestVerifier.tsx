import { useHangman } from "../hooks/useHangman.ts";
import { useZk } from "../hooks/useZk.ts";
import { type Hex, pad } from "viem";

export function TestVerifier() {
  const {testVerifier} = useHangman();
  const {calculateProof} = useZk();

  const onClick = async () => {
    console.log('a');
    const {proof} = await calculateProof('hola', 'a');
    console.log('2');
    await testVerifier.call(proof.proof, proof.publicInputs.map(p => pad(p as Hex)));
    console.log('3');
  }

  return <div>
    <h1>¿Anda el verifier?</h1>
    <button onClick={onClick} >chequear</button>
  </div>
}
