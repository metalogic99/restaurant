import { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_SOCKET_API;

if (!API_URL) {
  throw new Error("Socket api not defined in env");
}
const SocketContext = createContext<Socket<any, any> | null>(null);
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => io(API_URL), []);
  console.log(socket);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    console.log("no any socket");
    return;
  }
  return socket;
};
