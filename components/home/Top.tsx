import { useState, useEffect } from "react";

export const Top = ({ total_minted }: { total_minted: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = total_minted;
    const duration = 1000;
    const increment = end / (duration / 50);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [total_minted]);

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-xl">
        Total <strong>{count}</strong> blockspace minted
      </p>
      <div className="flex items-center gap-x-2">
        <div className="animate-pulse bg-[#82E14B] rounded-full w-[18px] h-[18px]"></div>
        <p className="text-xl">Conduit G2 Testnet</p>
      </div>
    </div>
  );
};
