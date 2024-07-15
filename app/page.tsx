"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getMintableNFTs } from "./hooks/nft";

export default function Home() {
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchNFTs() {
      const mintableNFTs = await getMintableNFTs();
      setNfts(mintableNFTs);
      console.log(mintableNFTs);
    }

    fetchNFTs();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Game Playground</h1>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Games
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Store
          </Link>
          <Button variant="ghost" size="icon">
            <ShoppingCartIcon className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <UserIcon className="w-6 h-6" />
          </Button>
        </div>
      </header>
      <main className="flex-1 bg-background p-8">
        <h2 className="text-xl font-bold mb-6">Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <img
              src="/FlappyBirdAssets/bird.png"
              alt="FlappyBirdAssets"
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Flappy Bird</h3>
              <Link href="flappyBird">
                <Button size="sm" className="w-full">
                  Play
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <img
              src="/placeholder.svg"
              alt="Game 2"
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Shooter</h3>
              <Button size="sm" className="w-full">
                Play
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <img
              src="/placeholder.svg"
              alt="Game 3"
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Puzzle</h3>
              <Button size="sm" className="w-full">
                Play
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <img
              src="/placeholder.svg"
              alt="Game 4"
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Racing</h3>
              <Button size="sm" className="w-full">
                Play
              </Button>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold mt-12 mb-6">Store</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <img
                src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                alt={nft.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{nft.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">
                    {nft.price} ETH
                  </span>
                  <Button size="sm" onClick={() => mintNFT(nft.id)}>
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
