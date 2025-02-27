"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DomianListItem {
  domain: string;
  id: string;
  visits: number;
  favicon: string;
}

type DomianList = DomianListItem[];

export const DomainMap = ({ domains }: { domains: DomianList }) => {
  return (
    <div className="relative">
      <motion.div className="flex flex-wrap gap-6 my-10" layout>
        {domains.map((domain, index) => (
          <MapItem key={domain.id} domain={domain} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

const MapItem = ({
  domain,
  index,
}: {
  domain: DomianListItem;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.1,
      },
    }),
    hover: {
      scale: 1.4,
      zIndex: 10,
      transition: { duration: 0.1 }, // Animasyonu hızlandırdık
    },
  };

  const getPopoverPosition = () => {
    if (!itemRef.current) return {};
    const rect = itemRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (rect.left < windowWidth / 2) {
      return {
        left: "100%",
        top: rect.top < windowHeight / 2 ? "0" : "auto",
        bottom: rect.top >= windowHeight / 2 ? "100%" : "auto",
      };
    } else {
      return {
        right: "100%",
        top: rect.top < windowHeight / 2 ? "0" : "auto",
        bottom: rect.top >= windowHeight / 2 ? "100%" : "auto",
      };
    }
  };

  return (
    <motion.div
      ref={itemRef}
      className="relative"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      <div className="h-16 w-16 rounded-full overflow-hidden shadow-lg">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.2 }}
        />
        {domain?.favicon ? (
          <Image
            src={domain.favicon || "/placeholder.svg"}
            alt={domain.domain}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-primary text-white text-xl font-bold">
            {domain.domain.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.2,
            }}
            className="absolute z-20 bg-white text-black p-2 rounded-md shadow-lg w-48"
            style={getPopoverPosition()}
          >
            <h3 className="font-bold text-sm mb-1">{domain.domain}</h3>
            <p className="text-xs">Visits: {domain.visits}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
