import { useEffect } from "react";
import "./App.css";
import { useDashboard } from "./contexts/dashboard-context";
import chartImage from "./assets/chart.png";
import Commodity from "./components/Commodity";
import { Asset } from "./contexts/classes/Assets";
import TradeHistory from "./components/TradeHistory";
import { ITrade } from "./contexts/classes/Exchange";

export enum OrderType {
  SELL = "sell",
  BUY = "buy",
}

function App() {
  //@ts-ignore
  const {initDashboard,usdWallet,ethWallet,btcWallet,adaWallet,btcPrice,ethPrice,adaPrice,executeTrade,trades,errorMsg
  } = useDashboard();

  useEffect(() => {
    initDashboard();
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>
          <span className="first-color">Ziglu</span>
          <span className="second-color">Tradr</span>
        </h1>
        <span className="error-msg">{errorMsg}</span>
      </nav>
      <div className="panels-container">
        <div className="panel">
          <h1 className="panel-title">Wallet</h1>
          <div className="wallet-prices-container">
            <h3 className="wallet-price">{usdWallet} USD</h3>
            <h3 className="wallet-price">{ethWallet} ETH</h3>
            <h3 className="wallet-price">{btcWallet} BTC</h3>
            <h3 className="wallet-price">{adaWallet} ADA</h3>

            <h2>Trade History</h2>

            <div className="trade-history-wrapper">
              {trades &&
                trades.length > 0 &&
                trades.map(
                  ({
                    ExecutedAt,
                    Source,
                    Destination,
                    Volume,
                    Price,
                  }: ITrade) => (
                    <TradeHistory
                      ExecutedAt={ExecutedAt}
                      Source={Source}
                      Destination={Destination}
                      Volume={Volume}
                      Price={Price}
                    />
                  )
                )}
            </div>
          </div>
        </div>
        <div
          className="panel chart-panel"
          style={{ backgroundImage: 'url("' + chartImage + '")' }}
        >
          <h1 className="panel-title">Chart</h1>
          <div className="current-prices-container">
            <h3 className="current-live-prices-title">🔴 Live Prices</h3>
            <h3>BTC {btcPrice}</h3>
            <h3>ETH {ethPrice}</h3>
            <h3>ADA {adaPrice}</h3>
          </div>
        </div>
        <div className="panel">
          <h1 className="panel-title">Buy</h1>
          <div className="buy-sell-container">
            <div className="row">
              <Commodity
                clickCallback={executeTrade}
                label={"BTC"}
                placeholder={"BTC"}
                price={btcPrice}
                assetKey={Asset.BTC}
                orderType={OrderType.BUY}
              />
            </div>
            <div className="row">
              <Commodity
                clickCallback={executeTrade}
                label={"ETH"}
                placeholder={"ETH"}
                price={ethPrice}
                assetKey={Asset.ETH}
                orderType={OrderType.BUY}
              />
            </div>
            <div className="row">
              <Commodity
                clickCallback={executeTrade}
                label={"ADA"}
                placeholder={"ADA"}
                price={adaPrice}
                assetKey={Asset.ADA}
                orderType={OrderType.BUY}
              />
            </div>
          </div>
        </div>
        <div className="panel">
          <h1 className="panel-title">Sell</h1>
          <div className="buy-sell-container">
            <div className="row">
              <Commodity
                clickCallback={executeTrade}
                label={"BTC"}
                placeholder={"$"}
                price={btcPrice}
                assetKey={Asset.BTC}
                orderType={OrderType.SELL}
              />
            </div>
            <div className="row">
              <Commodity
                clickCallback={executeTrade}
                label={"ETH"}
                placeholder={"$"}
                price={ethPrice}
                assetKey={Asset.ETH}
                orderType={OrderType.SELL}
              />
            </div>
            <div className="row">
              <Commodity
                clickCallback={executeTrade}
                label={"ADA"}
                placeholder={"$"}
                price={adaPrice}
                assetKey={Asset.ADA}
                orderType={OrderType.SELL}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
