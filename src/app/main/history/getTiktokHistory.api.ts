// src/app/main/history/getTiktolHistory.api.ts

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTiktokHistory = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/history`, {
    method: "Get",
    credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};

export { getTiktokHistory };
