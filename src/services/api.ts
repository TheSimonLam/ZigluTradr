import { Asset } from "../contexts/classes/Assets";

// Get price and info of a specific cryptocurrency
export const getCoin = async (coinId: Asset): Promise<any> => {
  const response = await fetch(
    `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    {
      headers: {
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        "x-rapidapi-key": "4f595641e9msh632b93c44485fd9p1457bdjsn52b8997b7166",
      },
    }
  );
    const jsonRes = await response.json();
  try {
    return jsonRes.data;
  } catch (e) {
    return "error getting coin";
  }
};
