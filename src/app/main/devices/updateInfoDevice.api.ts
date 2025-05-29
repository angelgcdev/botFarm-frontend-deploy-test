const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface IFormInput {
  email: string;
  items: string[];
  dispositivo_id: number;
}

const updateInfoDevice = async (data: IFormInput) => {
  try {
    //Primera peticion: guardar cuenta_google y cuenta_red_social
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${data.dispositivo_id}`,
      {
        method: "PUT",
        credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resData = await res.json();

    console.log(resData);
    return resData;
  } catch (error) {
    return error;
  }
};

export { updateInfoDevice };
