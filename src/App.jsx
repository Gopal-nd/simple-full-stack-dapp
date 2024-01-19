

import { ethers } from 'ethers';
import abi from './contractABI/chai.json';
import './App.css';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Buy from './components/Buy.jsx';
import Memos from './components/Memos.jsx';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const AppContainer = styled.div`
  background-color: #EFEFEF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease;
`;

const ConnectedAccount = styled.p`
  margin-top: 10px;
  margin-left: 5px;
  font-size: 14px;
  color: #6c757d;
`;

const BraveLogo = styled.img`
  width: 100%;
  max-width: 860px;
  margin-bottom: 20px;
`;

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState('None');

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = '0x21FA535D8f2a4ceE8b02625e9D6eD0637dAa35b3';
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert('Please install Metamask');
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <AppContainer>
      <BraveLogo
        src="https://imgs.search.brave.com/m5EZaKB7e1qx6bB9EOCYcqYjsPxfbL7D556EHfjG7fs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/ZS9lMy9CdXlfTWVf/YV9Db2ZmZWVfTG9n/by5zdmcvNTEycHgt/QnV5X01lX2FfQ29m/ZmVlX0xvZ28uc3Zn/LnBuZw"
        alt="Brave Logo"
        className="img-fluid"
      />
      <Header>
        <ConnectedAccount>
          <small>Connected Account - {account}</small>
        </ConnectedAccount>
      </Header>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </AppContainer>//done
  );
};

export default App;
