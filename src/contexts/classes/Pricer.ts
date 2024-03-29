import { Asset } from "./Assets";
import { getCoin } from "../../services/api"

// ICoinPrice represents the price for an asset pair, which is a source (what
// we are selling) and destination (what we are buying).
export interface ICoinPrice {
  // Source is the currency we are pricing from.
  Source: Asset;

  // Destination is the currency we are pricing to. i.e. we want to sell Source
  // to buy Destination.
  Destination: Asset;

  // Price is the price of one unit of the destination currency, expressed in
  // terms of the Source currency. The price is returned from RapidAPI.
  //
  // For example:
  //
  // - if Source is USD and Destination is BTC, Price is the amount of USD
  //   required to buy one BTC.
  // - if Source is ETH and Destination is USD, Price is the amount of ETH
  //   required to buy one USD.
  //
  // For this exercise, you can represent money in floating point arithmetic.
  // Ignore any accuracy/rounding issues.
  Price: number;
}

// TODO implement this interface to retrieve the price for the requested asset
// from the RapidAPI "Get Coin" endpoint.
//
// You need to support six pairs:
//
// - USD to BTC
// - USD to ETH
// - USD to ADA
// - BTC to USD
// - ETH to USD
// - ADA to USD
//
// As RapidAPI only provides pairs with USD, you don't need to support crypto
// source to crypto destination.
//
// One of source and destination must be USD.
// Source and destination must not be the same.
//
// An exception should be thrown if an unsupported combination of assets is
// requested.
//
// https://rapidapi.com/Coinranking/api/coinranking1/
export interface IPricingProvider {
  getCoinPrice: (source: Asset, destination: Asset) => ICoinPrice;
}

// TODO implement MyPricer using the RapidAPI Get Coin endpoint.
//
// Hint: the Asset enum's values correspond with the ID of the USD/coin pairs
// in the GetCoin API.
export class MyPricer implements IPricingProvider {
  // @ts-ignore: on-going issue: https://github.com/microsoft/TypeScript/issues/26781
  public getCoinPrice = async (source: Asset, destination: Asset): ICoinPrice => {
    const requestedCoinId = (source === Asset.USD ? destination : source);
    const requestedCoin = await getCoin(requestedCoinId);

    return {
      Source: source,
      Destination: destination,
      Price:
        source === Asset.USD
          ? requestedCoin.coin.price
          : 1 / requestedCoin.coin.price,
    };
  }
}

// LocalPricer is a simple implementation that just prices all assets at 100
// USD. It can be used for simple testing.
export class LocalPricer implements IPricingProvider {
  public getCoinPrice(source: Asset, destination: Asset): ICoinPrice {
    const assetPrice = 100.0;

    return {
      Source: source,
      Destination: destination,
      Price: source === Asset.USD ? assetPrice : 1 / assetPrice,
    };
  }
}
