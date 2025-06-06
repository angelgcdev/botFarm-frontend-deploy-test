"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { Device } from "@/types/device";
import { getAllDevices } from "@/app/main/devices/api";
import { SocketContext } from "@/context/SocketContext";
import { toast, Toaster } from "sonner";

//1. Crear el contexto
const DevicesContext = createContext<Device[]>([]);

//2. Crear el proveedor
const DevicesProvider = ({ children }: { children: React.ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await getAllDevices();

        if (!res.ok) {
          toast.error(res.message);
          console.error("Error:", res.message);
          return;
        }

        const resData = res.data;

        setDevices(resData);
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
    <>
      <Toaster />
      <DevicesContext.Provider value={devices}>
        {children}
      </DevicesContext.Provider>
    </>
  );
};

export { DevicesContext, DevicesProvider };
