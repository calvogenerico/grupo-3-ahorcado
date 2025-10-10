import { useState } from 'react'
import './App.css'
import { useAccount, useSwitchChain, useWalletClient } from 'wagmi'
import { Account } from './components/account-info'
import { WalletOptions } from './components/wallet-options'
import { useZk } from './hooks/useZk'
import { hangmanAbi } from './abis/hangman-abi'
import { numberToHex } from 'viem'

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

function SwitchChainButton() {
  const { chains, switchChain } = useSwitchChain()

  return (
    <div className="section">
      <h3>🌐 Cambiar de red</h3>
      <p>Seleccioná la red en la que querés jugar.</p>
      <div className="button-group">
        {chains.map((chain) => (
          <button
            key={chain.id}
            className="btn chain-btn"
            onClick={() => switchChain({ chainId: chain.id })}
          >
            {chain.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const zk = useZk()
  const { data: walletClient } = useWalletClient()

  const onClick = async () => {
    if (!walletClient) return

    const { commitment } = await zk.calculateProof('holu', 'o')
    const res = await walletClient.writeContract({
      abi: hangmanAbi,
      functionName: 'createGame',
      address: import.meta.env.VITE_HANGMAN_ADDRESS,
      args: [numberToHex(commitment), 16],
    })
    console.log(res)
  }

  return (
    <div className="app-container">
      <h1 className="app-title">🎮 Hangman zk</h1>

      <div className="section">
        <h3>🔑 Conectar Billetera</h3>
        <p>Usá este botón para conectar tu wallet y empezar a jugar.</p>
        <ConnectWallet />
      </div>

      <SwitchChainButton />

      <div className="section">
        <h3>⚙️ Contador de Prueba</h3>
        <p>Este botón incrementa el contador local del juego.</p>
        <button className="btn" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="info">
          Editá <code>src/App.tsx</code> y guardá para probar HMR.
          Verifier: {import.meta.env.VITE_VERIFIER_ADDRESS}
        </p>
      </div>

      <div className="section">
        <h3>🧠 Generar Witness</h3>
        <p>Con este botón generamos el witness de la prueba del ahorcado.</p>
        <button className="btn primary" onClick={onClick}>
          WITNESS
        </button>
      </div>

      <p className="read-the-docs">
        Hecho con ❤️ usando Vite + React + wagmi
      </p>
    </div>
  )
}

export default App
