"use client";

import { createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { iniciarSocketClient } from "@/lib/socket/socketClient";

interface SocketContextType {
  socket: Socket | null;
}

//1. Crear el contexto con un valor predeterminado
const SocketContext = createContext<SocketContextType>({ socket: null });

//2. Crear el proveedor
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const user_id = Number(localStorage.getItem("userId"));

    if (!user_id || isNaN(user_id)) {
      console.error("user_id invalido para iniciar sesion Socket.IO");
      return;
    }

    const newSocket = iniciarSocketClient(user_id);

    if (!newSocket) {
      console.error("No se pudo crear la sesion socket.IO");
    }

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  console.log("socket:", socket);

  // Solo renderizar hijos cuando el socket esté listo
  if (!socket) {
    return <div>Cargando conexión con servidor...</div>;
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
