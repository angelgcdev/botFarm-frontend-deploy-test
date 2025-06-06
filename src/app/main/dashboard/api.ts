const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTotalTiktokInteractions = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/interactions/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

const getGeneratedViews = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/views/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return { ok: true, data: data._sum.total_views };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getGeneratedLikes = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/likes/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

const getGeneratedComments = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/comments/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
  getTotalTiktokInteractions,
  getGeneratedViews,
  getGeneratedLikes,
  getGeneratedComments,
};
