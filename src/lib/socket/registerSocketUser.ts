"use client";
import { Socket } from "socket.io-client";

let userRegistered = false;

export const registerSocketUser = (user_id: number, socket: Socket) => {
  if (!user_id || isNaN(user_id)) {
    console.error("🚨 No se encontró user_id válido en la cookie");
    return;
  }

  //Verifica si el usuario ya fue registrado antes
  if (!userRegistered) {
    socket.emit("user:register", { user_id });
    userRegistered = true; // Marca que el usuario ya fue registrado
  }
};
