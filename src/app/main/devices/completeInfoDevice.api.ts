const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface IFormInput {
  email: string;
  items: string[];
  dispositivo_id: number;
}

const completeInfoDevice = async (data: IFormInput) => {
  try {
    //Primera peticion: guardar cuenta_google y cuenta_red_social
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/complete-info`,
      {
        method: "POST",
        credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    //Segunda peticion: marcar como completado
    const patchRes = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${data.dispositivo_id}/complete`,
      {
        method: "PATCH",
        credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!patchRes.ok) {
      const errorPatch = await patchRes.json();
      throw new Error(errorPatch.message || "Error al marcar como completado");
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    return error;
  }
};

export { completeInfoDevice };
