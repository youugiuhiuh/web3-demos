import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import Head from "next/head";
import { messageBoardAddress, messageBoardAbi } from "../utils/contracts";

export default function Home() {
  const [newMessage, setNewMessage] = useState("");
  const { address, isConnected } = useAccount();

  const { data: currentMessage, refetch, isLoading: isReading } = useReadContract({
    address: messageBoardAddress as `0x${string}`,
    abi: messageBoardAbi,
    functionName: "getMessage",
  });

  const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: confirmError } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSetMessage = async () => {
    if (!newMessage || !isConnected) return;
    writeContract({
      address: messageBoardAddress as `0x${string}`,
      abi: messageBoardAbi,
      functionName: "setMessage",
      args: [newMessage],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      setNewMessage("");
      refetch();
    }
  }, [isConfirmed, refetch]);

  const error = writeError || confirmError;

  return (
    <div className="min-h-screen bg-[#010409] text-[#c9d1d9] font-sans flex flex-col items-center py-16 px-6 lg:px-8">
      <Head>
        <title>Decentralised MessageBoard</title>
        <meta name="description" content="A Web3 MessageBoard on Sepolia" />
      </Head>

      <main className="max-w-2xl w-full flex flex-col items-center space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
            Sepolia MessageBoard
          </h1>
          <p className="text-slate-400 text-lg">Connected, immutable, open to everyone.</p>
        </div>

        <div className="w-full flex justify-end">
          <ConnectButton />
        </div>

        <div className="w-full bg-[#0d1117] rounded-3xl shadow-2xl border border-slate-800 p-8 space-y-10">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-purple-400">Current Broadcast</span>
              {isReading && <span className="text-sm px-2 py-1 rounded-full bg-slate-800 text-slate-400 font-mono">syncing...</span>}
            </h2>
            <div className="p-8 bg-[#161b22] rounded-2xl border border-slate-700/50 shadow-inner min-h-[140px] flex items-center justify-center text-center">
              {currentMessage ? (
                <p className="text-3xl font-semibold text-cyan-400 leading-relaxed ">{currentMessage as string}</p>
              ) : (
                <p className="text-slate-500 italic text-lg">Space is empty. Leave the first message.</p>
              )}
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-800/80">
            <h2 className="text-xl font-semibold text-slate-300">Set New Message</h2>
            
            <div className="flex flex-col gap-4">
              <textarea
                placeholder={isConnected ? "Type your message..." : "Please connect your wallet first."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!isConnected || isPending || isConfirming}
                rows={3}
                className="w-full px-5 py-4 bg-[#0d1117] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-100 placeholder-slate-600 transition-all resize-none shadow-sm disabled:opacity-50"
              />
              
              <button
                onClick={handleSetMessage}
                disabled={!isConnected || !newMessage || isPending || isConfirming}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-[0.99] transform"
              >
                {!isConnected 
                  ? "Connect Wallet to Send" 
                  : isPending 
                    ? "Awaiting Wallet Signature..." 
                    : isConfirming 
                      ? "Tx Sent, Mining..." 
                      : "Broadcast to Chain"}
              </button>
            </div>

            {error && (
              <div className="text-rose-400 text-sm bg-rose-400/10 px-5 py-4 rounded-xl border border-rose-400/20 break-words mt-4">
                <span className="font-bold block mb-1">Error processing transaction</span>
                {(error as any).shortMessage || error.message}
              </div>
            )}
            
            {isConfirmed && (
              <div className="text-emerald-400 text-sm bg-emerald-400/10 px-5 py-4 rounded-xl border border-emerald-400/20 mt-4">
                <span className="font-bold block mb-1">Success!</span>
                Your message is now permanently on the Sepolia blockchain.
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
