"use client";
import Image from "next/image";
import { List } from "./List";
import { Top } from "./Top";
import Map from "@/assets/Map.svg";
import { useEffect, useState } from "react";
import { DomainMap } from "./DomainMap";
import { DomianList } from "@/types/home";

const HomeScreen = () => {
  const [screenType, setScreenType] = useState<"list" | "map">("list");

  const [trendingItems, setTrendingItems] = useState<DomianList>([]);

  const [newestItems, setNewestItems] = useState<DomianList>([]);

  const [allItems, setAllItems] = useState<DomianList>([]);

  const [totalMinted, setTotalMinted] = useState<number>(0);

  const getTrendingItems = async () => {
    try {
      const res = await fetch("/api/trending");
      const data = await res.json();
      setTrendingItems(data?.trendings);
    } catch (error) {
      console.error(error);
    }
  };

  const getNewestItems = async () => {
    try {
      const res = await fetch("/api/newest");
      const data = await res.json();
      setNewestItems(data?.newest);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllDomains = async () => {
    try {
      const res = await fetch("/api/domains");
      const data = await res.json();
      setAllItems(data?.domains);
      setTotalMinted(data?.total_minted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrendingItems();
    getNewestItems();
    getAllDomains();
  }, []);

  const changeScreenType = () => {
    setScreenType(screenType === "list" ? "map" : "list");
  };

  return (
    <div className="mt-[112px] mb-10">
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Top total_minted={totalMinted} />
        {screenType === "list" && (
          <div className="grid md:grid-cols-2 grid-cols-1 mt-7 gap-x-16">
            <List title="Trending" items={trendingItems} info="asdasd" />
            <List
              classNames={{
                container: "mt-10 md:mt-0",
              }}
              title="Newest"
              items={newestItems}
            />
          </div>
        )}
        {screenType === "map" && <DomainMap domains={allItems} />}
      </div>
      <button
        onClick={changeScreenType}
        className="fixed px-2 right-[50px] flex items-center rounded-md gap-x-4 bottom-10 py-1 bg-primary hover:bg-primary/90"
      >
        <Image src={Map} alt="map" />
        <p className="text-black">Blockspace Map</p>
      </button>
    </div>
  );
};

export default HomeScreen;
