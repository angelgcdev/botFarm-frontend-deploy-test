const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type TiktokInteractionForm = {
  video_url: string;
  views_count?: number;
  liked?: boolean;
  saved?: boolean;
  comment?: string;
};

const createInteractionTiktokData = async (
  scheduledTiktokDataForm: TiktokInteractionForm
) => {
  console.log(scheduledTiktokDataForm);

  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule`, {
      method: "POST",
      credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduledTiktokDataForm),
    });

    console.log("Create:", res);

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorBody}`);
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error("Error al crear la interaccion de tiktok:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

const deleteInteractionTiktokData = async (id: number) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule/${id}`, {
      method: "DELETE",
      credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Delete:", res);

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorBody}`);
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error("Error al eliminar la interaccion de tiktok:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

const editInteractionTiktokData = async (
  id: number,
  interactionEdited: TiktokInteractionForm
) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule/${id}`, {
      method: "PATCH",
      credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interactionEdited),
    });

    console.log("Edit:", res);

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorBody}`);
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error("Error al eliminar la interaccion de tiktok:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export {
  deleteInteractionTiktokData,
  editInteractionTiktokData,
  createInteractionTiktokData,
};
