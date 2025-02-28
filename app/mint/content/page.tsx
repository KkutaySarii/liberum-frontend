import ContentPage from "@/screens/mint-content";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <ContentPage />
    </Suspense>
  );
};

export default Page;
