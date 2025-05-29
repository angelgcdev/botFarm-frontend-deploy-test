const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getInteractionsTiktokData = async () => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule`, {
      method: "GET",
      credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorBody}`);
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    return error;
  }
};

export { getInteractionsTiktokData };
