import { create } from "zustand";

export type NFTItem = {
  name: string;
  description: string;
  image: string;
  price: number;
  id: string;
  own: boolean;
};

type userState = {
  nfts: NFTItem[];
  setNFts: (nfts: NFTItem[]) => void;
};

export const useUserStore = create<userState>((set) => ({
  nfts: [],
  setNFts: (nfts) => set({ nfts }),
}));
