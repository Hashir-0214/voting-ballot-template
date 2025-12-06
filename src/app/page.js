"use client";
import React, { useState } from "react";
import Head from 'next/head';

export default function CampaignEVM() {
  const [voteStatus, setVoteStatus] = useState("ready"); // ready, voting, voted
  const [votedSlot, setVotedSlot] = useState(null);

  // --- ⚙️ CONFIGURATION ⚙️ ---
  const CAMPAIGN_CONFIG = {
    heroName: "നസീമ സൈജുബിൻ",   // Malayalam Name
    heroSymbol: "🪜",             // Ladder Symbol
    heroSlot: 4,                  // Slot number
  };
  // ---------------------------

  const slots = Array.from({ length: 10 }, (_, i) => {
    const slotNumber = i + 1;
    if (slotNumber === CAMPAIGN_CONFIG.heroSlot) {
      return { id: slotNumber, name: CAMPAIGN_CONFIG.heroName, symbol: CAMPAIGN_CONFIG.heroSymbol, isHero: true };
    }
    return { id: slotNumber, name: "", symbol: "", isHero: false };
  });

  const handleVote = (slot) => {
    if (voteStatus !== "ready") return;

    // 1. Lock machine & Light up LED
    setVoteStatus("voting");
    setVotedSlot(slot.id);

    // 2. Play Beep Sound
    const audio = new Audio("/beep.mp3");
    audio.play().catch(e => console.log("Audio play failed"));

    setTimeout(() => {
      setVoteStatus("voted");
    }, 2000);
  };

  const resetMachine = () => {
    setVoteStatus("ready");
    setVotedSlot(null);
  };

  // --- VIEW 1: THE CONFIRMATION PAGE (Simulated Redirect) ---
  if (voteStatus === "voted") {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 animate-fade-in font-sans">
         <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border-t-8 border-green-500">
            
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-green-600">✓</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">Vote Successful!</h1>
            <p className="text-gray-500 mb-6">Your vote has been securely recorded.</p>

            {/* Candidate Details Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase font-bold">You Voted For</p>
                <p className="text-lg font-bold text-gray-800 mt-1">{CAMPAIGN_CONFIG.heroName}</p>
              </div>
              <div className="text-4xl">{CAMPAIGN_CONFIG.heroSymbol}</div>
            </div>

            {/* Vote Again Button */}
            <button 
              onClick={resetMachine}
              className="w-full bg-[#003366] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#002244] hover:shadow-xl transition-all active:scale-95"
            >
              Vote Again ↺
            </button>

            <div className="mt-6 text-xs text-gray-400">
              Thank you for participating in the digital campaign.
            </div>
         </div>
      </div>
    );
  }

  // --- VIEW 2: THE VOTING MACHINE (Default) ---
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 font-sans select-none">
      <Head>
        <title>Vote for {CAMPAIGN_CONFIG.heroName}</title>
      </Head>

      {/* --- TOP TABS --- */}
      <div className="flex gap-4 mb-6 w-full max-w-lg px-4 justify-center">
        <div className="bg-gray-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-sm">Ward</div>
        <div className="bg-pink-200 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-sm">Block</div>
        <div className="bg-blue-200 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-sm">District</div>
      </div>

      {/* --- EVM DEVICE --- */}
      <div className="bg-[#f2f2f2] w-full max-w-lg rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-gray-300 overflow-hidden relative pb-4">
        
        {/* Header */}
        <div className="bg-[#f8f8f8] px-6 py-4 flex justify-between items-center border-b border-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-black">Ready</span>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${voteStatus === "ready" ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-green-900"}`}></div>
          </div>
          <div className="text-sm font-bold text-black tracking-wide">
            Ballot Unit 1
          </div>
        </div>

        {/* Ballot Paper Area */}
        <div className="bg-white mx-3 mt-3 border border-gray-300 shadow-sm">
          {slots.map((slot) => (
            <div key={slot.id} className="flex items-stretch border-b border-gray-300 last:border-0 h-14 sm:h-16">
              
              {/* 1. Serial Number */}
              <div className="w-10 sm:w-12 flex-shrink-0 flex justify-center items-center border-r border-gray-300 bg-gray-50 text-gray-600 font-semibold text-sm">
                {slot.id}
              </div>

              {/* 2. Candidate Name & Symbol */}
              <div className="flex-1 px-3 flex justify-between items-center relative">
                {slot.isHero ? (
                  <>
                    <span className="text-lg font-bold text-black leading-tight">
                      {slot.name}
                    </span>
                    <span className="text-2xl sm:text-3xl filter drop-shadow-sm">
                      {slot.symbol}
                    </span>
                  </>
                ) : (
                  // Empty Slot styling
                  <div className="w-full h-full"></div>
                )}
              </div>

              {/* 3. Button Panel */}
              <div className="w-20 sm:w-24 flex items-center justify-end px-2 sm:px-3 border-l border-gray-300 bg-gray-50">
                
                {/* Red LED */}
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-red-900 flex-shrink-0 transition-colors duration-150 mr-2 sm:mr-3
                  ${votedSlot === slot.id ? "bg-red-600 shadow-[0_0_10px_red]" : "bg-[#5a1a1a]"}
                `}></div>

                {/* Blue Button */}
                <button
                  onClick={() => handleVote(slot)}
                  className={`w-10 h-6 sm:w-14 sm:h-8 bg-[#003366] rounded-md shadow-sm border-b-2 border-r-2 border-[#002244] active:border-0 active:translate-y-0.5 active:shadow-inner transition-all
                    ${voteStatus !== "ready" ? "cursor-not-allowed opacity-90" : "hover:brightness-110 cursor-pointer"}
                  `}
                ></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}