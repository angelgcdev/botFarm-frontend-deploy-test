// src/app/main/devices/devices.api.ts

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

//Obtener datos de la tabla device
const getAllDevices = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error obtener información de los dispositivos.");
  }

  return res.json();
};

//Actualizar el estado de la tabla device al hacer logout
const updateAllStatus = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices/logout`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status: "INACTIVO" }),
  });

  if (!res.ok) {
    throw new Error("Error obtener información de los dispositivos.");
  }

  return res.json();
};

export { getAllDevices, updateAllStatus };
