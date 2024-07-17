import React, { useEffect } from "react";
import { useUserStore } from "../zustand";
import { getOwnedNFTs } from "./nft";

export default function useGetUserNFT() {
  const { nfts, setNFts } = useUserStore();

  async function getUserNFTs() {
    const nfts = await getOwnedNFTs();
    setNFts(nfts);
  }

  useEffect(() => {
    if (nfts.length > 0) return;
    getUserNFTs();
  }, []);

  return { userNFT: nfts, refetch: getUserNFTs };
}
