/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";

import Image from "next/image";

import { DomianList, DomianListItem } from "@/types/home";
import { motion } from "framer-motion";

import Info from "@/assets/info.svg";
import Eye from "@/assets/eye.svg";

interface ListProps {
  title: string;
  items: DomianList;
  info?: string;
  classNames?: {
    container?: string;
    title?: string;
    item?: string;
  };
}

export const List: FC<ListProps> = ({ title, items, info, classNames }) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className={`w-full ${classNames?.container}`}>
      <div className="flex items-center gap-x-4">
        <p className="font-bold text-3xl">{title}</p>
        {info && (
          <div
            className="flex items-center cursor-pointer relative w-[18px] h-[18px]"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          >
            <Image src={Info} alt="Info" width={18} height={18} className="" />
            <div
              className={`absolute top-[100%] left-[100%] bg-zinc-600 p-2 rounded-md transition-all ${
                showInfo ? "visible" : "invisible"
              }`}
            >
              <p className="text-white">{info}</p>
            </div>
          </div>
        )}
      </div>
      <motion.div
        className="flex flex-col w-full mt-6 gap-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items?.map((item, index) => (
          <ListItem key={item.id} {...item} order={index + 1} />
        ))}
      </motion.div>
    </div>
  );
};

const ListItem = ({
  domain,
  visits,
  favicon,
  order,
}: DomianListItem & { order: number }) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-md bg-white bg-opacity-[6%] shadow-md shadow-white/15 w-full p-5 flex items-center justify-between"
    >
      <div className="flex items-center justify-center gap-x-2">
        <p className="text-white text-opacity-60 text-3xl">{order}.</p>
        <div className="flex items-center gap-x-2">
          {favicon ? (
            <div className="w-8 h-8 relative">
              <Image
                alt=""
                src={favicon}
                fill
                className="rounded-full"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="bg-primary w-8 h-8 rounded-full"></div>
          )}
          <p className="truncate text-2xl">{domain}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-6">
        <div className="flex items-center gap-x-1">
          <Image src={Eye} alt="Eye" width={18} height={18} />
          <p className="text-white text-opacity-60 text-lg">{visits}</p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.open(`http://${domain}`, "_blank");
          }}
          className="bg-primary hover:bg-primary/90 text-black text-sm px-4 py-1 rounded"
        >
          Visit
        </button>
      </div>
    </motion.div>
  );
};
