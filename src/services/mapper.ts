import { Asset } from "../contexts/classes/Assets";

export let assetMapper = (asset: Asset) => {
    switch (asset) {
      case 0:
        return "USD";
      case 1:
        return "BTC";
      case 2:
        return "ETH";
      case 9:
        return "ADA";
    }
}