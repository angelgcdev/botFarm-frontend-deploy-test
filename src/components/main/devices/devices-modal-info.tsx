import { ReactNode, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { DeviceForm } from "./device-form";
import { getInfoDevice } from "@/app/main/devices/api";

interface ModalDeviceInfoProps {
  children: ReactNode;
  deviceId: number;
  onComplete: () => void;
  infoCompletada: boolean;
}

interface SocialNetwork {
  name: string; // Aquí se asume que 'name' es una cadena de texto, ajusta si es diferente
}

interface SocialNetworkAccount {
  social_network: SocialNetwork;
}

interface InitialData {
  email: string;
  dispositivo_id: number;
  items: string[];
}

export function DevicesModalInfo({
  infoCompletada,
  children,
  deviceId,
  onComplete,
}: ModalDeviceInfoProps) {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<InitialData | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (open) {
        try {
          const res = await getInfoDevice(deviceId);

          if (!res.ok) {
            console.error(res.message);
            return;
          }

          const data = res.data;

          if (
            data?.cuentaGoogle?.email &&
            Array.isArray(data?.cuenta_red_social)
          ) {
            setInitialData({
              email: data.cuentaGoogle.email,
              dispositivo_id: deviceId,
              items: data.cuenta_red_social.map(
                (r: SocialNetworkAccount) =>
                  r?.social_network?.name || "Desconocido"
              ),
            });
          } else {
            console.warn("Datos incompletos para el dispositivo:", data);
            setInitialData({
              email: "No disponible",
              dispositivo_id: deviceId,
              items: [],
            });
          }
        } catch (error) {
          console.error("Error al obtener los datos del dispositivo:", error);
          setInitialData({
            email: "Error al cargar",
            dispositivo_id: deviceId,
            items: [],
          });
        }
      } else {
        setInitialData(null);
      }
    };

    if (infoCompletada) {
      fetchInitialData();
    }
  }, [open, deviceId, infoCompletada]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Información del Dispositivo</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Completar la información del dispositivo para tener informes mas
          detallados
        </DialogDescription>
        <DeviceForm
          initialData={initialData}
          deviceId={deviceId}
          onClose={() => setOpen(false)}
          onComplete={onComplete}
        />
      </DialogContent>
    </Dialog>
  );
}
