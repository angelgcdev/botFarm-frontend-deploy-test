"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { Device } from "@/types/device";
import { getAllDevices } from "@/app/main/devices/api";
import { SocketContext } from "@/context/SocketContext";

//1. Crear el contexto
const DevicesContext = createContext<Device[]>([]);

//2. Crear el proveedor
const DevicesProvider = ({ children }: { children: React.ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await getAllDevices();
        setDevices(fetchedDevices);
      } catch (error) {
        console.error("Error al obtener los dispositivos:", error);
      }
    };

    fetchDevices();

    if (!socket) {
      return;
    }

    // Escucha eventos de conexión/desconexión
    socket.on("device:connected:notification", fetchDevices);
    socket.on("device:disconnected:notification", fetchDevices);

    // Limpieza al desmontar
    return () => {
      socket.off("device:connected:notification", fetchDevices);
      socket.off("device:disconnected:notification", fetchDevices);
    };
  }, [socket]);

  console.log(devices);

  return (
    <DevicesContext.Provider value={devices}>
      {children}
    </DevicesContext.Provider>
  );
};

export { DevicesContext, DevicesProvider };
