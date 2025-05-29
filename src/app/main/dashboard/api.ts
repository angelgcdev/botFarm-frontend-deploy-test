const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTotalTiktokInteractions = async () => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/interactions/count`,
      {
        credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorBody}`);
    }

    const resData = await res.json();

    if (!resData.success) {
      throw new Error(resData.message || "Error en la respuesta del servidor");
    }

    return resData.data.count;
  } catch (error) {
    console.error("Error al obtener la información", error);
    throw error;
  }
};

const getGeneratedViews = async () => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/views/count`,
      {
        credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorBody}`);
    }

    const resData = await res.json();

    if (!resData.success) {
      throw new Error(resData.message || "Error en la respuesta del servidor");
    }

    return resData.data.count;
  } catch (error) {
    console.error("Error al obtener la información", error);
    throw error;
  }
};

const getGeneratedLikes = async () => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/likes/count`,
      {
        credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorBody}`);
    }

    const resData = await res.json();

    if (!resData.success) {
      throw new Error(resData.message || "Error en la respuesta del servidor");
    }

    return resData.data.count;
  } catch (error) {
    console.error("Error al obtener la información", error);
    throw error;
  }
};

const getGeneratedComments = async () => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/comments/count`,
      {
        credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
      }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorBody}`);
    }

    const resData = await res.json();

    if (!resData.success) {
      throw new Error(resData.message || "Error en la respuesta del servidor");
    }

    return resData.data.count;
  } catch (error) {
    console.error("Error al obtener la información", error);
    throw error;
  }
};

export {
  getTotalTiktokInteractions,
  getGeneratedViews,
  getGeneratedLikes,
  getGeneratedComments,
};
