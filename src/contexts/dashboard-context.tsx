import { useState, useContext, createContext, useEffect } from "react";
import { OrderType } from "../App";
import { Asset } from "./classes/Assets";
import { Bank } from "./classes/Bank";
import { MyPricer } from "./classes/Pricer";
import { AssetExchange, ITrade } from "./classes/Exchange";

const bank = new Bank();
const myPricer = new MyPricer();
const assetExchange = new AssetExchange(myPricer, bank);

const dashboardContext = createContext(null);

export function ProvideDashboard({ children }: any) {
  const dashboard = useProvideDashboard();
  return (
    // @ts-ignore
    <dashboardContext.Provider value={dashboard}>
      {children}
    </dashboardContext.Provider>
  );
}

export const useDashboard = () => {
  return useContext(dashboardContext);
};

function useProvideDashboard() {
  const [trades, setTrades] = useState([] as ITrade[]);
  const [errorMsg, setErrorMsg] = useState("");

  const [btcPrice, setBtcPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [adaPrice, setAdaPrice] = useState(0);

  const [usdWallet, setUsdWallet] = useState(bank.getBalance(Asset.USD));
  const [ethWallet, setEthWallet] = useState(bank.getBalance(Asset.ETH));
  const [adaWallet, setAdaWallet] = useState(bank.getBalance(Asset.ADA));
  const [btcWallet, setBtcWallet] = useState(bank.getBalance(Asset.BTC));

  const getCurrentCoinPrices = async () => {
    const btc = await myPricer.getCoinPrice(Asset.USD, Asset.BTC);
    const eth = await myPricer.getCoinPrice(Asset.USD, Asset.ETH);
    const ada = await myPricer.getCoinPrice(Asset.USD, Asset.ADA);
    setBtcPrice(btc.Price);
    setEthPrice(eth.Price);
    setAdaPrice(ada.Price);
  };

  const initDashboard = async () => {
    getCurrentCoinPrices();
    setInterval(getCurrentCoinPrices, 15000);
  };

  const updateWalletState = () => {
    setUsdWallet(bank.getBalance(Asset.USD));
    setEthWallet(bank.getBalance(Asset.ETH));
    setAdaWallet(bank.getBalance(Asset.ADA));
    setBtcWallet(bank.getBalance(Asset.BTC));
    setTrades(assetExchange.trades);
  }

  const executeTrade = async (amount: number, destinationAsset: Asset, orderType: OrderType) => {
    try {
      if (!amount) {
        setErrorMsg("Please enter an amount");
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
      else if (orderType === OrderType.BUY) {
        await assetExchange.exchange(Asset.USD, destinationAsset, amount);
      } else {
        await assetExchange.exchange(destinationAsset, Asset.USD, amount);
      }
      // Calling to update wallet state to react to class value changes
      updateWalletState();
    } catch (e: any) {
      setErrorMsg(e.message);
      setTimeout(() => {
        setErrorMsg("");
      },3000)
    }
  };

  return {
    btcPrice,
    ethPrice,
    adaPrice,
    usdWallet,
    ethWallet,
    adaWallet,
    btcWallet,
    trades,
    errorMsg,
    initDashboard,
    executeTrade,
  };
}
