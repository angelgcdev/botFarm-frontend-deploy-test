// src/app/main/devices/devices.api.ts

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface IFormInput {
  email: string;
  items: string[];
  dispositivo_id: number;
}

const completeInfoDevice = async (data: IFormInput) => {
  try {
    const token = localStorage.getItem("token");
    //Primera peticion: guardar cuenta_google y cuenta_red_social
    const resSave = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/complete-info`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!resSave.ok) {
      const error = await resSave.json();
      throw new Error(error.message);
    }

    const dataSave = await resSave.json();

    //Segunda peticion: marcar como completado
    const resUpdate = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${data.dispositivo_id}/complete`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resUpdate.ok) {
      const errorUpdate = await resUpdate.json();
      throw new Error(errorUpdate.message);
    }

    return { ok: true, data: dataSave };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const updateInfoDevice = async (dataDevice: IFormInput) => {
  try {
    const token = localStorage.getItem("token");
    //Primera peticion: guardar cuenta_google y cuenta_red_social
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${dataDevice.dispositivo_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataDevice),
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

const getInfoDevice = async (deviceId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${deviceId}`,
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

//Obtener datos de la tabla device
const getAllDevices = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices`, {
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

//Actualizar el estado de la tabla device al hacer logout
const updateAllStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices/logout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "INACTIVO" }),
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

export {
  getAllDevices,
  updateAllStatus,
  getInfoDevice,
  updateInfoDevice,
  completeInfoDevice,
};
