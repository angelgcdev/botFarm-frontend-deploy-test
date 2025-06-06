const NEXT_PUBLIC_LOCAL_BACKEND_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

interface UserData {
  user_id: number;
}

const sendUserIdApi = async (data: UserData) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_LOCAL_BACKEND_URL}/identify-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const resData = await res.json();
    return { ok: true, data: resData };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

export { sendUserIdApi };
