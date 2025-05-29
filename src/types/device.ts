export type DeviceStatus = "ACTIVO" | "INACTIVO";

export type DevieType = "FISICO" | "EMULADOR";

export interface Device {
  id: number;
  user_id: number;
  udid: string;
  device_type: DevieType;
  status: DeviceStatus;
  os_version: string;
  brand: string;
  connected_at: Date;
  last_activity: Date;
  complete_config: boolean;
}
