"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { messageBoardAddress, messageBoardAbi } from "../utils/contracts";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export default function MessageBoardCard() {
  const [mounted, setMounted] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: currentMessage,
    refetch,
    isFetching,
  } = useReadContract({
    address: messageBoardAddress,
    abi: messageBoardAbi,
    functionName: "getMessage",
    query: {
      refetchInterval: 10000, // Automatically poll every 10s
    },
  });

  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSetMessage = async () => {
    if (!newMessage || !isConnected) return;
    writeContract({
      address: messageBoardAddress,
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

  if (!mounted) return null;

  const error = writeError || confirmError;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] -z-10 transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] -z-10 transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Header & Wallet Connect */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Message Board
          </h2>
          <span className="text-sm font-medium text-slate-400 mt-1 flex items-center gap-2">
            Sepolia Network
            {isFetching && (
              <RefreshCw size={14} className="animate-spin text-cyan-400" />
            )}
          </span>
        </div>
        <ConnectButton />
      </div>

      {/* Current Message Display */}
      <div className="space-y-3 mb-10">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest pl-1">
          Latest Broadcast
        </h3>
        <motion.div
          layout
          className="relative px-8 py-10 bg-black/40 rounded-2xl border border-white/5 shadow-inner min-h-[160px] flex items-center justify-center text-center group"
        >
          <AnimatePresence mode="wait">
            {currentMessage ? (
              <motion.p
                key={currentMessage as string}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-3xl sm:text-4xl font-semibold text-slate-100 leading-tight"
              >
                "{currentMessage as string}"
              </motion.p>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-500 italic text-lg"
              >
                The void is quiet. Be the first to speak.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Subtle hover effect */}
          <div className="absolute inset-0 border border-cyan-500/0 rounded-2xl group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />
        </motion.div>
      </div>

      {/* Input Action Area */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!isConnected || isPending || isConfirming}
            placeholder={
              isConnected
                ? "Broadcast your thoughts to the world..."
                : "Please connect your wallet to broadcast."
            }
            rows={3}
            className="w-full px-6 py-5 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-slate-100 placeholder-slate-600 transition-all resize-none shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Character counter / Visual affordance */}
          {isConnected && (
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span
                className={`text-xs font-mono font-medium ${
                  newMessage.length > 0 ? "text-cyan-400" : "text-slate-600"
                }`}
              >
                {newMessage.length} chars
              </span>

              <button
                onClick={handleSetMessage}
                disabled={!newMessage || isPending || isConfirming}
                className="flex items-center justify-center p-3 bg-gradient-to-tr from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white rounded-xl transition-all shadow-lg active:scale-95 group"
                aria-label="Send message"
              >
                {isPending || isConfirming ? (
                  <RefreshCw size={20} className="animate-spin" />
                ) : (
                  <Send
                    size={20}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Status Indicators */}
        <AnimatePresence mode="popLayout">
          {isPending && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-cyan-400 text-sm flex items-center gap-2 mt-2 px-1"
            >
              <RefreshCw size={16} className="animate-spin" />
              <span>Please sign the transaction in your wallet...</span>
            </motion.div>
          )}

          {isConfirming && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-purple-400 text-sm flex items-center gap-2 mt-2 px-1"
            >
              <RefreshCw size={16} className="animate-spin" />
              <span>
                Transaction sent! Awaiting block confirmation on Sepolia (
                {hash?.slice(0, 8)}...)...
              </span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 flex gap-3 text-sm mt-4 items-start"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div className="flex-1 overflow-hidden">
                <span className="font-semibold block mb-1">
                  Transaction Failed
                </span>
                <p className="opacity-90 truncate">
                  {(error as any).shortMessage || error.message}
                </p>
              </div>
            </motion.div>
          )}

          {isConfirmed && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 flex items-center gap-3 text-sm mt-4"
            >
              <CheckCircle2 size={18} className="shrink-0" />
              <span>
                Your message has been permanently stored on the blockchain!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
