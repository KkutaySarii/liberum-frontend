import MintDomainPage from "@/screens/mint-domain";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <MintDomainPage />
    </Suspense>
  );
};

export default Page;
