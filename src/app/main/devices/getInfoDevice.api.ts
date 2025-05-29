// src/app/main/devices/getInfoDevice.api.ts

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getInfoDevice = async (deviceId: number) => {
  const res = await fetch(
    `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${deviceId}`,
    {
      method: "Get",
      credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  return data;
};

export { getInfoDevice };
