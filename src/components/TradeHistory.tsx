import "./TradeHistory.css";
import { ITrade } from "../contexts/classes/Exchange";
import { assetMapper } from "../services/mapper";

function TradeHistory({
  ExecutedAt,
  Source,
  Destination,
  Volume,
  Price,
}: ITrade) {
  return (
    <div className="trade-history-container">
      {ExecutedAt.toString()} - {Volume}: {assetMapper(Source)} to{" "}
      {assetMapper(Destination)} at @{Price}
    </div>
  );
}

export default TradeHistory;
