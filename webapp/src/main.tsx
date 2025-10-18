import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WagmiProvider } from 'wagmi'
import { BrowserRouter, Route, Routes } from "react-router";
import { config } from './wagmi.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainLayout } from './MainLayout.tsx'
import { StartGame } from './pages/StartGame.tsx'
import { JoinGame } from './pages/JoinGame.tsx'
import { PlayGame } from './pages/PlayGame.tsx'
import { TestVerifier } from "./pages/TestVerifier.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout/>}>
              <Route index element={<App/>}/>
              <Route path="new" element={<StartGame/>}/>
              <Route path="join/:gameId" element={<JoinGame/>}/>
              <Route path="play/:gameId" element={<PlayGame/>}/>
              <Route path="test-verifier/" element={<TestVerifier/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
