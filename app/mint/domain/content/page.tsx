import LinkPage from "@/screens/mint-domain-content";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <LinkPage />
    </Suspense>
  );
};

export default Page;
