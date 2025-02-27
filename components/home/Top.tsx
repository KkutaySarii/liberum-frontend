export const Top = ({ total_minted }: { total_minted: number }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-xl">
        Total <strong>{total_minted}</strong> blockspace minted
      </p>
      <div className="flex items-center gap-x-2">
        <div className="animate-pulse bg-[#82E14B] rounded-full w-[18px] h-[18px]"></div>
        <p className="text-xl">Conduit G2 Testnet</p>
      </div>
    </div>
  );
};
