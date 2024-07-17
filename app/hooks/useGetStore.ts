"use client";
import React, { useEffect, useState } from "react";
import { NFTItem, getMintableNFTs } from "./nft";
import useGetUserNFT from "./useGetUserNFT";

export default function useGetStore() {
  const [storeItems, setStoreItems] = useState<NFTItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { userNFT } = useGetUserNFT();

  useEffect(() => {
    async function fetchNFTs() {
      const mintableNFTs = await getMintableNFTs();
      setStoreItems(mintableNFTs);
      console.log(mintableNFTs);
    }

    fetchNFTs();
  }, []);

  return { loading };
}
