const BallotUnit = ({ config, onVote, voteStatus, votedSlot }) => {
  const slots = Array.from({ length: 10 }, (_, i) => {
    const slotNumber = i + 1;
    if (slotNumber === config.heroSlot) {
      return { id: slotNumber, name: config.heroName, symbol: config.heroSymbol, isHero: true };
    }
    return { id: slotNumber, name: "", symbol: "", isHero: false };
  });

  return (
    <div className="bg-[#f2f2f2] w-full max-w-lg rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-gray-300 overflow-hidden relative pb-4 animate-fade-in">
      
      {/* EVM Header */}
      <div className="bg-[#f8f8f8] px-6 py-4 flex justify-between items-center border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-black">Ready</span>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${voteStatus === "ready" ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-green-900"}`}></div>
        </div>
        <div className="text-sm font-bold text-black tracking-wide">
          Model Ballot Unit
        </div>
      </div>

      {/* The List (Table) */}
      <div className="bg-white mx-3 mt-3 border border-gray-300 shadow-sm">
        {slots.map((slot) => (
          <div key={slot.id} className="flex items-stretch border-b border-gray-300 last:border-0 h-10 sm:h-12">
            
            {/* Serial Number */}
            <div className="w-10 sm:w-12 flex-shrink-0 flex justify-center items-center border-r border-gray-300 bg-gray-50 text-gray-600 font-semibold text-sm">
              {slot.id}
            </div>

            {/* Candidate Name & Symbol */}
            <div className="flex-1 px-3 flex justify-between items-center relative">
              {slot.isHero ? (
                <>
                  <span className="text-lg font-bold anek-malayalam text-black leading-tight">
                    {slot.name}
                  </span>
                  <span className="text-2xl sm:text-3xl filter drop-shadow-sm">
                    {slot.symbol}
                  </span>
                </>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>

            {/* Button Panel */}
            <div className="w-20 sm:w-24 flex items-center justify-end px-2 sm:px-3 border-l border-gray-300 bg-gray-50">
              
              {/* Red LED */}
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-red-900 flex-shrink-0 transition-colors duration-150 mr-2 sm:mr-3
                ${votedSlot === slot.id ? "bg-red-600 shadow-[0_0_10px_red]" : "bg-[#5a1a1a]"}
              `}></div>

              {/* Blue Button */}
              <button
                onClick={() => onVote(slot)}
                className={`w-10 h-6 sm:w-14 sm:h-8 bg-[#003366] rounded-md shadow-sm border-b-2 border-r-2 border-[#002244] active:border-0 active:translate-y-0.5 active:shadow-inner transition-all
                  ${voteStatus !== "ready" ? "cursor-not-allowed opacity-90" : "hover:brightness-110 cursor-pointer"}
                `}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BallotUnit;