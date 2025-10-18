import './App.css'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { WalletOptions } from './components/wallet-options'
import { anvil } from 'viem/chains'
import { Link } from "react-router";

function ConnectWallet() {
  const { isConnected } = useAccount()

  if (isConnected) {
    return null
  }

  return <WalletOptions />
}

function SwitchChainButton() {
  const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();

  const chain = chains.find(chain => chain.id === anvil.id);

  if (!chain) {
    return <div>Algo salió mal. El chain id está mal configurado.</div>
  }

  return <div>
    <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
      {chain.name} {chainId}
    </button>
  </div>
}

function App() {
  return (
    <>
      <h1>¡Buenas! Conectate para arrancar</h1>
      <div>
        <ConnectWallet />
      </div>
      <div>
        <SwitchChainButton />
      </div>
      <div className="card">
        <Link to={'/new'}>Crear un juego</Link>
      </div>
    </>
  )
}

export default App
