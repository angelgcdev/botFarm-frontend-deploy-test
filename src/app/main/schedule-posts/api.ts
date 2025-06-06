const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type TiktokInteractionForm = {
  video_url: string;
  views_count?: number;
  liked?: boolean;
  saved?: boolean;
  comment?: string;
};

const getInteractionsTiktokData = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const createInteractionTiktokData = async (
  scheduledTiktokDataForm: TiktokInteractionForm
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(scheduledTiktokDataForm),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const deleteInteractionTiktokData = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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

const editInteractionTiktokData = async (
  id: number,
  interactionEdited: TiktokInteractionForm
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(interactionEdited),
    });

    console.log("Edit:", res);

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

export {
  deleteInteractionTiktokData,
  editInteractionTiktokData,
  createInteractionTiktokData,
  getInteractionsTiktokData,
};
