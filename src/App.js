import './App.css';
import { ethers } from "ethers";
import { useState } from 'react';

function App() {

const [connected, setConnection] = useState(false);
const [name, setName] = useState("please sign in...");

const connect = async () => {
  let signer = null;
  let provider;
  if (window.ethereum == null) {
      console.log("MetaMask not installed");
      const provider = ethers.getDefaultProvider();
      console.log(provider)
  } else {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner();
      const message = "hello world!";
      const sig = await signer.signMessage(message);     
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const parsed = ethers.formatEther(balance);
        console.log(parsed);
      const verify = ethers.verifyMessage(message, sig);
        console.log(verify);
      setConnection(true);

      const { ethereum } = window;
      if(ethereum) {
        const ensProvider = new ethers.InfuraProvider('mainnet');
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const displayAddress = address?.substr(0, 6) + "...";
        const ens = await ensProvider.lookupAddress(address);
        if (ens !== null) {
          setName(ens)
  
        } else {
          setName(displayAddress)
  
        }
      } else {
        alert('no wallet detected!')
      }

  }
  console.log(provider);
  console.log(signer);
}

const disconnect = async () => {
  setConnection(false);
  setName("please sign in...")
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>{name}</h1>

        <div className='signIn'>

        {!connected && (
          <button onClick={connect}>sign in</button>
        )}
        {connected && (
          <button onClick={disconnect}>sign out</button>
        )}

        </div>

      </header>
    </div>
  );
}

export default App;
