"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScheduledTiktokInteraction } from "@/app/main/schedule-posts/types";
import { TikTokScriptLoader } from "@/app/main/schedule-posts/TiktokScriptLoader";
import { Trash2, SquarePen, Loader2, Ban } from "lucide-react";
import { EditModal, TikTokInteractionForm } from "./EditModal";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/context/SocketContext";
import { toast } from "sonner";

type Props = {
  scheduledTiktokInteractions: ScheduledTiktokInteraction[];
  onExecuteInteraction: (
    interaction: ScheduledTiktokInteraction
  ) => Promise<boolean>;
  onEditInteraction: (
    id: number,
    interactionEdited: TikTokInteractionForm
  ) => Promise<void>;
  onDeleteInteraction: (id: number) => void;
  onCancelInteraction: (id: number) => void;
};

const ScheduledTiktokInteractions = ({
  scheduledTiktokInteractions,
  onExecuteInteraction,
  onEditInteraction,
  onDeleteInteraction,
  onCancelInteraction,
}: Props) => {
  //
  const { socket } = useContext(SocketContext);

  const [cancelingIds, setCancelingIds] = useState<number[]>([]);

  //Liberar el bloqueo de las interacciones
  useEffect(() => {
    if (!socket) {
      toast.error("No hay conexión con el servidor.");
      return;
    }
    // socket.on("interaction:completed", () => {
    //   setExecutingInteractionId(null);
    // });

    socket.on("interaction:canceled", () => {
      setCancelingIds([]);
    });

    return () => {
      socket.off("interaction:completed");
      socket.off("interaction:canceled");
    };
  }, [socket]);

  //
  if (scheduledTiktokInteractions.length === 0) {
    return null;
  }

  const getDataVideoId = (videoUrl: string) => {
    const match = videoUrl.match(/\/(video|photo)\/([^\/]+)/);
    const videoId = match ? match[2] : null;
    return videoId;
  };

  //En el frontend, deshabilita todos los botones si cualquier interacción está en progreso:
  const anyExecuting = scheduledTiktokInteractions.some(
    (interaction) => interaction.status === "EN_PROGRESO"
  );

  return (
    <div
      className="max-w-[1200px] mx-auto mt-4"
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fill, 373px)",
        justifyContent: "center",
      }}
    >
      <TikTokScriptLoader reloadTrigger={scheduledTiktokInteractions} />
      {scheduledTiktokInteractions.map((interaction, index) => (
        <Card key={interaction.id}>
          <CardHeader>
            <CardTitle>Interacción #{index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <blockquote
                className="tiktok-embed"
                cite={interaction.video_url}
                data-video-id={getDataVideoId(interaction.video_url)}
                style={{
                  width: "100%",
                  height: "750px",
                  borderRadius: "7px",
                  overflow: "hidden",
                  margin: "initial",
                }}
                data-embed-type="video"
              >
                <section>Loading...</section>
              </blockquote>

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center z-10 rounded-md
        bg-black/70  transition-opacity duration-200 
        ${
          interaction.status === "EN_PROGRESO"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }
      `}
              >
                <Loader2 className="h-10 w-10 animate-spin text-blue-100" />
                <p className="mt-4 text-[24px] text-blue-100">Ejecutando...</p>
              </div>

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center z-10 rounded-md
        bg-black/70  transition-opacity duration-200 
        ${
          cancelingIds.includes(interaction.id)
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }
      `}
              >
                <Loader2 className="h-10 w-10 animate-spin text-blue-100" />
                <p className="mt-4 text-[24px] text-blue-100">Cancelando...</p>
              </div>
            </div>

            <p>
              Acciones:
              {interaction.liked ? (
                <Badge variant="outline">Me Gusta</Badge>
              ) : (
                <Badge variant="outline">-</Badge>
              )}
              {interaction.saved ? (
                <Badge variant="outline">Guardar video</Badge>
              ) : (
                <Badge variant="outline">-</Badge>
              )}
            </p>

            <p>Comentario: {interaction.comment}</p>

            <p>Cantidad de vistas: {interaction.views_count}</p>

            <p>
              Estado:{" "}
              {interaction.status === "PENDIENTE" ? (
                <Badge
                  className="bg-yellow-100 text-yellow-800 border border-yellow-300"
                  variant="outline"
                >
                  Pendiente
                </Badge>
              ) : interaction.status === "EN_PROGRESO" ? (
                <Badge
                  className="bg-blue-100 text-blue-800 border border-blue-300"
                  variant="outline"
                >
                  En proceso
                </Badge>
              ) : interaction.status === "COMPLETADA" ? (
                <Badge
                  className="bg-green-100 text-green-800 border border-green-300"
                  variant="outline"
                >
                  Completada
                </Badge>
              ) : interaction.status === "CANCELADO" ? (
                <Badge
                  className="bg-red-100 text-red-800 border border-red-300"
                  variant="outline"
                >
                  Cancelado
                </Badge>
              ) : (
                <Badge variant="destructive">Fallida</Badge>
              )}
            </p>
          </CardContent>
          <CardFooter className="flex gap-4 justify-between">
            <Button
              variant="default"
              className="cursor-pointer"
              // className="cursor-pointer bg-[#007BFF] hover:bg-[#0056b3] text-white"
              onClick={async () => {
                await onExecuteInteraction(interaction);
              }}
              disabled={anyExecuting || interaction.status === "EN_PROGRESO"}
            >
              Ejecutar Interacción
            </Button>

            <div className="flex gap-2">
              <EditModal
                interaction={interaction}
                onEditInteraction={onEditInteraction}
                index={index}
                trigger={
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    // className="cursor-pointer bg-[#FFC107] hover:bg-[#e0a800] text-black"
                    disabled={
                      anyExecuting && interaction.status !== "EN_PROGRESO"
                    }
                  >
                    <SquarePen />
                  </Button>
                }
              />

              <Button
                variant="outline"
                className="cursor-pointer"
                // className="cursor-pointer bg-[#DC3545] hover:bg-[#c82333] text-white"
                onClick={() => {
                  setCancelingIds((prev) => [...prev, interaction.id]);
                  onCancelInteraction(interaction.id);
                }}
                disabled={
                  interaction.status === "PENDIENTE" ||
                  interaction.status === "COMPLETADA" ||
                  interaction.status === "CANCELADO"
                }
              >
                <Ban />
              </Button>

              <Button
                variant="outline"
                className="cursor-pointer"
                // className="cursor-pointer bg-[#DC3545] hover:bg-[#c82333] text-white"
                onClick={() => onDeleteInteraction(interaction.id)}
                disabled={anyExecuting && interaction.status !== "EN_PROGRESO"}
              >
                <Trash2 />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export { ScheduledTiktokInteractions };
