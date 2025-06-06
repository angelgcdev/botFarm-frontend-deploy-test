"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 3. Librerías internas absolutas
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Device, DeviceStatus } from "@/types/device";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// 4. Imports relativos
import Image from "next/image";
import { DevicesModalInfo } from "./devices-modal-info";
import { SocketContext } from "@/context/SocketContext";
import { toast } from "sonner";

export function DevicesCardInfo({ device }: { device: Device }) {
  const { socket } = useContext(SocketContext);

  const [status, setStatus] = useState<DeviceStatus>(device.status);

  const [infoCompletada, setInfoCompletada] = useState<boolean>(
    device.complete_config
  );
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      toast.error("No hay conexión con el servidor.");
      return;
    }

    const handleDeviceConnectedStatus = (payload: {
      udid: string;
      status: DeviceStatus;
    }) => {
      if (payload.udid === device.udid) {
        setStatus(payload.status); // Cambia a "ACTIVO"
      }
    };

    const handleDeviceDisconnectedStatus = (payload: {
      udid: string;
      status: DeviceStatus;
    }) => {
      if (payload.udid === device.udid) {
        setStatus(payload.status); // Cambia a "INACTIVO"
      }
    };

    socket.on("device:connected:status", handleDeviceConnectedStatus);
    socket.on("device:disconnected:status", handleDeviceDisconnectedStatus);

    return () => {
      socket.off("device:connected:status", handleDeviceConnectedStatus);
      socket.off("device:disconnected:status", handleDeviceDisconnectedStatus);
    };
  }, [device.udid, socket]);

  const isActive = status === "ACTIVO";

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">
          {device.brand} {device.udid}
        </CardTitle>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className={
                  isActive
                    ? "text-green-600 border-green-600"
                    : "text-gray-400 border-gray-400"
                }
              >
                {isActive ? "Conectado" : "Desconectado"}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-medium">
                Última conexión:{" "}
                {isActive
                  ? new Date(device.connected_at).toLocaleString()
                  : device.last_activity
                  ? new Date(device.last_activity).toLocaleString()
                  : "Nunca"}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-3 bg-white w-40 rounded m-auto mb-8">
          <Image
            src="/device.png"
            alt="Dispositivo Móvil"
            className=" h-[150px] w-auto object-contain"
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col space-y-1.5 mb-4">
          <Label className="mb-4">Información del dispositivo</Label>
          <div className="text-sm rounded-md border p-3 space-y-1">
            <p>
              <span className="font-medium">Sistema Operativo: </span>
              {device.os_version}
            </p>
            <p>
              <span className="font-medium">Tipo de dispositivo: </span>
              {device.device_type}
            </p>
            <p>
              <span className="font-medium">Estado: </span>
              {device.status}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <DevicesModalInfo
          infoCompletada={infoCompletada}
          deviceId={device.id}
          onComplete={() => {
            setInfoCompletada(true);
            router.refresh();
          }}
        >
          <Button className={`w-full ${infoCompletada ? "" : "bg-yellow-200"}`}>
            {infoCompletada ? "Modificar información" : "Completar información"}
          </Button>
        </DevicesModalInfo>
      </CardFooter>
    </Card>
  );
}
