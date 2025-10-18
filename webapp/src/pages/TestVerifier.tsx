import { useZk } from "../hooks/useZk.ts";

export function TestVerifier() {
  const zk = useZk();

  const onClick = async () => {
    const fullProof = await zk.calculateProof("holu", 'a');
    console.log(fullProof);
  }

  return <div>
    <button onClick={onClick}>Test!</button>
  </div>
}
