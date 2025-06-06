"use client";

import { io, Socket } from "socket.io-client";
import { registerSocketUser } from "./registerSocketUser";
import { socketDeviceConnectionNotification } from "./socketDeviceConnectionNotification";

//Singleton para el socket
let socket: Socket | null = null;

export function iniciarSocketClient(user_id: number): Socket | null {
  if (!user_id || isNaN(user_id)) {
    console.error("user_id inválido para iniciar Socket.IO");
    return null;
  }

  if (socket && socket.connected) {
    console.log(
      "⚠️ Socket ya ha sido inicializado. Usando instancia existente."
    );
    return socket;
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  socket = io(backendUrl);

  socket.on("connect", () => {
    console.log("🔗 Conectado al servidor Socket.IO");

    if (socket) {
      // Activar evento para registrar usuario a su sala privada socket io
      registerSocketUser(user_id, socket);
      // Activa los listeners de notificaciones de la conexion de dispositivos
      socketDeviceConnectionNotification(socket);
    }
  });

  socket.on("reconnect", () => {
    console.log("🔄 Reconectado al servidor Socket.IO");
    if (socket) {
      registerSocketUser(user_id, socket);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Desconectado del servidor Socket.IO");
  });

  socket.on("connect_error", (error) => {
    console.error("🚨 Error de conexión:", error.message);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
