import { useState } from "react";
import { OrderType } from "../App";
import { Asset } from "../contexts/classes/Assets";

interface CommodityProps {
  label: string;
  price: number;
  clickCallback: (value: number, assetKey: Asset, orderType: OrderType) => void;
  placeholder: string;
  assetKey: Asset;
  orderType: OrderType;
}

function Commodity({
  label,
  price,
  clickCallback,
  placeholder,
  assetKey,
  orderType,
}: CommodityProps) {
  const [value, setValue] = useState("");

  return (
    <>
      <div className="row-price">
        {label} @ {price}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          clickCallback(parseInt(value), assetKey, orderType);
        }}
      >
        Execute
      </button>
    </>
  );
}

export default Commodity;
