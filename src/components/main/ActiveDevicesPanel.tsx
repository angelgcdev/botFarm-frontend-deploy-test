"use client";

import { DevicesContext } from "@/context/DevicesContext";
import { useContext } from "react";
import { Activity, Smartphone } from "lucide-react";

const ActiveDevicesPanel = () => {
  const devices = useContext(DevicesContext);

  //Filtrar dispositivos activos
  const activeDevices = devices.filter((device) => device.status === "ACTIVO");
  const total = activeDevices.length;

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 min-w-[160px] hover:shadow-xl transition-all duration-300 hover:scale-105">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
            <Activity className="w-3.5 h-3.5 text-green-600" />
          </div>

          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide block">
            Activos
          </span>
        </div>

        {/* Contador principal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-2xl font-bold text-gray-800">{total}</span>
          </div>

          <div className="flex items-center">
            <Smartphone className="w-4 h-4 text-green-500" />
          </div>
        </div>

        {/* Texto descriptivo */}
        <div className="mt-1">
          <span className="text-xs text-gray-500">
            {total === 1 ? "dispositivo" : "dispositivos"}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ActiveDevicesPanel };
