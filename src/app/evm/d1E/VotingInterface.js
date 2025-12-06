// src/app/evm/d1E/VotingInterface.js

"use client";

import React, { useState, useEffect } from "react";
import BallotUnit from "@/components/balletUnit"; // Ensure this matches your actual filename

const ELECTION_DATA = {
  ward: {
    type: "Ward",
    color: "bg-gray-600",
    heroName: "എൻ. കെ സുലൈഖ",
    heroSymbol: "🪜",
    heroSlot: 3
  },
  block: {
    type: "Block",
    color: "bg-pink-500",
    heroName: "എൻ. കുഞ്ഞീതു",
    heroSymbol: "🪜",
    heroSlot: 1
  },
  district: {
    type: "Panchayath",
    color: "bg-blue-500",
    heroName: "കെ. വി. മുഹമ്മദാലി",
    heroSymbol: "🪜",
    heroSlot: 2
  }
};

const ConfirmationView = ({ config, onReset }) => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 animate-fade-in font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border-t-8 border-green-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-green-600">✓</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Vote Successful!</h1>
        <p className="text-gray-500 mb-6">Recorded for <span className="font-bold">{config.type}</span> Election.</p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs text-gray-400 uppercase font-bold">You Voted For</p>
            <p className="text-lg font-bold text-gray-800 mt-1">{config.heroName}</p>
          </div>
          <div className="text-4xl">{config.heroSymbol}</div>
        </div>

        <button
          onClick={onReset}
          className="w-full bg-[#003366] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#002244] hover:shadow-xl transition-all active:scale-95"
        >
          Vote Again ↺
        </button>
      </div>
    </div>
  );
};

export default function VotingInterface() {
  const [activeTab, setActiveTab] = useState("ward");
  const [voteStatus, setVoteStatus] = useState("ready");
  const [votedSlot, setVotedSlot] = useState(null);

  const currentConfig = ELECTION_DATA[activeTab];

  // Dynamic title update on the client side
  useEffect(() => {
    document.title = `Vote for ${currentConfig.heroName}`;
  }, [currentConfig.heroName]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setVoteStatus("ready");
    setVotedSlot(null);
  };

  const handleVote = (slot) => {
    if (voteStatus !== "ready") return;
    
    // Critical: Only allow hero vote
    if (!slot.isHero) return;

    setVoteStatus("voting");
    setVotedSlot(slot.id);

    const audio = new Audio("/beep.mp3");
    audio.play().catch(e => console.error("Audio play failed:", e));

    setTimeout(() => {
      setVoteStatus("voted");
    }, 2000);
  };

  if (voteStatus === "voted") {
    return <ConfirmationView config={currentConfig} onReset={() => setVoteStatus("ready")} />;
  }

  return (
    <div className="min-h-screen h-full my-auto bg-white flex flex-col items-center justify-center py-8 font-sans select-none">
      
      {/* --- TAB NAVIGATION --- */}
      <div className="flex gap-2 sm:gap-4 mb-6 w-full max-w-lg px-4 justify-center">
        <button
          onClick={() => switchTab("ward")}
          className={`flex-1 py-2 rounded-full text-sm font-bold shadow-sm transition-all ${activeTab === 'ward' ? 'bg-gray-600 text-white scale-105 ring-2 ring-gray-300' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
        >
          Ward
        </button>

        <button
          onClick={() => switchTab("block")}
          className={`flex-1 py-2 rounded-full text-sm font-bold shadow-sm transition-all ${activeTab === 'block' ? 'bg-pink-500 text-white scale-105 ring-2 ring-pink-300' : 'bg-pink-100 text-pink-400 hover:bg-pink-200'}`}
        >
          Block
        </button>

        <button
          onClick={() => switchTab("district")}
          className={`flex-1 py-2 rounded-full text-sm font-bold shadow-sm transition-all ${activeTab === 'district' ? 'bg-blue-500 text-white scale-105 ring-2 ring-blue-300' : 'bg-blue-100 text-blue-400 hover:bg-blue-200'}`}
        >
          District
        </button>
      </div>

      <BallotUnit
        config={currentConfig}
        onVote={handleVote}
        voteStatus={voteStatus}
        votedSlot={votedSlot}
      />
    </div>
  );
}