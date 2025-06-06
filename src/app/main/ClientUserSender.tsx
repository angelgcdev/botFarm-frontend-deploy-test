// app/main/ClientUserSender.tsx
"use client";
import { useEffect } from "react";
import { sendUserIdApi } from "@/app/login/localBackend.api";

const SendUserIdOnLoad = () => {
  useEffect(() => {
    const sendUserId = async () => {
      const user_id = Number(localStorage.getItem("userId"));

      if (!user_id) {
        console.error("No se encontro el user_id en las cookies");
        return;
      }

      //Envia el usuario_id al servidor local
      const res = await sendUserIdApi({ user_id });

      //Verificar si el envio fue exitoso
      if (!res.ok) {
        console.error(
          "Envio de datos al servidor local fallido: ",
          res.message
        );
      }

      const restData = res.data;
      console.log(
        "Se enviaron datos al servidor local exitosamente:",
        restData
      );
    };
    sendUserId();
  }, []);

  return null; // no renderiza nada
};

export default SendUserIdOnLoad;
