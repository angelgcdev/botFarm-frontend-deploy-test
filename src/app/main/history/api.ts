// src/app/main/history/getTiktolHistory.api.ts

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTiktokHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

export { getTiktokHistory };
