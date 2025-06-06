"use client";

// hooks/useSocket.ts
import { iniciarSocketClient } from "@/lib/socket/socketClient";
import { useEffect } from "react";

export const useSocket = () => {
  useEffect(() => {
    const user_id = Number(localStorage.getItem("userId"));

    if (!user_id || isNaN(user_id)) {
      console.warn("user_id inválido o no encontrado en cookies");
      return;
    }

    iniciarSocketClient(user_id);
  }, []);

  return null;
};
