"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros
import { useContext } from "react";

// 3. Librerías internas absolutas
import { DevicesCardInfo } from "@/components/main/devices/devices-card-info";
import { DevicesContext } from "@/context/DevicesContext";

// 4. Imports relativos

const DevicesPage = () => {
  const devices = useContext(DevicesContext);

  console.log(devices);

  return (
    <div className="grid  grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 p-6 justify-items-center">
      {devices.map((device, index) => (
        <DevicesCardInfo key={index} device={device} />
      ))}
    </div>
  );
};

export default DevicesPage;
