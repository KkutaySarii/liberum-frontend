import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { SOCKET_URL } from "@/lib/api";

const SOCKET_SERVER_URL = SOCKET_URL || "http://localhost:3030";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const connectSocket = () => {
      try {
        const newSocket = io(SOCKET_SERVER_URL, {
          reconnectionAttempts: maxRetries,
          timeout: 10000,
          transports: ["websocket", "polling"],
          forceNew: true,
        });

        newSocket.on("connect", () => {
          console.log("Socket connected successfully");
          setIsConnected(true);
          setConnectionError(null);
          setSocket(newSocket);
          retryCount = 0;
        });

        newSocket.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
          setIsConnected(false);
        });

        newSocket.on("connect_error", (error) => {
          retryCount++;
          console.log(
            `Connection attempt ${retryCount} failed:`,
            error.message
          );

          if (retryCount >= maxRetries) {
            console.log("Max retries reached, stopping connection attempts");
            setConnectionError(
              `Failed to connect after ${maxRetries} attempts`
            );
            newSocket.close();
          }

          setIsConnected(false);
          setSocket(null);
        });

        return newSocket;
      } catch (error) {
        console.error("Socket initialization error:", error);
        setConnectionError(
          error instanceof Error ? error.message : "Unknown error"
        );
        setIsConnected(false);
        setSocket(null);
        return null;
      }
    };

    const socket = connectSocket();

    return () => {
      if (socket) {
        console.log("Cleaning up socket connection");
        socket.disconnect();
      }
    };
  }, []);

  return { socket, isConnected, connectionError };
};
