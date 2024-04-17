// AppContext.js
import { ethers } from "ethers";
import React, { createContext, useState, useContext, useEffect } from "react";
import { ABI, ContractAddress } from "./constants/Constants";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [val, setVal] = useState("hhhh");


  const [networkChanged, setNetworkChanged] = useState(false);
  const [accountChanged, setAccountChanged] = useState(false);

  useEffect(() => {
    if (networkChanged) {
      setNetworkChanged(false);
    } else if (accountChanged) {
      setAccountChanged(false);
    }
  }, [networkChanged, accountChanged]);

  //0x5DC29e716f61982B9D86A309E05b6BF0B2fB0Eb2
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //connect to our metamask

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          setNetworkChanged(true);
        });
        window.ethereum.on("accountsChanged", () => {
          setAccountChanged(true);
        });

        await provider.send("eth_requestAccounts", []); //open your metamask
        const signer = provider.getSigner(); //signer is for change in smart contract
        const address = await signer.getAddress();
        //console.log(address)
        setAccount(address);
        let contractAddress = ContractAddress;
        let contractAbi = ABI;

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        ); //create instance of our smart contract
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, [networkChanged, accountChanged]);

  return (
    <AppContext.Provider value={{ account, contract, provider }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
