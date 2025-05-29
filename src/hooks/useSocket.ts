"use client";

// hooks/useSocket.ts
import { iniciarSocketClient } from "@/lib/socket/socketClient";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useSocket = () => {
  useEffect(() => {
    const user_id = Number(Cookies.get("user_id"));

    if (!user_id || isNaN(user_id)) {
      console.warn("user_id inválido o no encontrado en cookies");
      return;
    }

    iniciarSocketClient(user_id);
  }, []);

  return null;
};
