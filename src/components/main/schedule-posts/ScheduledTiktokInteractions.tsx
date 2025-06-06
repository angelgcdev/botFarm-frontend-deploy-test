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
import {
  EstimatedTimeData,
  ScheduledTiktokInteraction,
} from "@/app/main/schedule-posts/types";
import { TikTokScriptLoader } from "@/app/main/schedule-posts/TiktokScriptLoader";
import {
  Trash2,
  SquarePen,
  Loader2,
  Ban,
  Clock,
  Play,
  Heart,
  Bookmark,
  Eye,
  MessageCircle,
} from "lucide-react";
import { EditModal, TikTokInteractionForm } from "./EditModal";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/context/SocketContext";
import { toast } from "sonner";

type Props = {
  scheduledTiktokInteractions: ScheduledTiktokInteraction[];
  onExecuteInteraction: (interaction: ScheduledTiktokInteraction) => void;
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
  const [estimatedTimeData, setEstimatedTimeData] =
    useState<EstimatedTimeData | null>(null);

  //Liberar el bloqueo de las interacciones
  useEffect(() => {
    if (!socket) {
      toast.error("No hay conexión con el servidor.");
      return;
    }

    socket.on("interaction:canceled", () => {
      setCancelingIds([]);
    });

    socket.on("schedule:tiktok:estimated_time_all", (data) => {
      setEstimatedTimeData(data);
    });

    return () => {
      socket.off("interaction:canceled");
      socket.off("schedule:tiktok:estimated_time_all");
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
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold ">
              Interacción #{index + 1}
            </CardTitle>
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
                Completado
              </Badge>
            ) : interaction.status === "CANCELADO" ? (
              <Badge
                className="bg-red-50 text-red-600 border-red-200"
                variant="outline"
              >
                Cancelado
              </Badge>
            ) : (
              <Badge variant="destructive">Fallida</Badge>
            )}
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

            <div className="space-y-3">
              <h4 className="font-bold text-sm flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Acciones configuradas:
              </h4>

              <div className=" p-3 rounded-lg space-y-2 border border-blue-100">
                <div className="flex items-center space-x-4 text-sm">
                  {interaction.liked ? (
                    <div className="flex items-center space-x-1">
                      <Heart
                        className="w-4 h-4 text-red-500"
                        fill="currentColor"
                      />
                      <span>Me Gusta</span>
                    </div>
                  ) : (
                    ""
                  )}

                  {interaction.saved ? (
                    <div className="flex items-center space-x-1">
                      <Bookmark
                        className="w-4 h-4 text-yellow-600"
                        fill="currentColor"
                      />
                      <span>Guardar video</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 ">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Comentario:</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 bg-white p-2 rounded border italic">
                  {interaction.comment}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Cantidad de vistas:</span>
                  </div>
                  <span className="font-bold text-purple-600">
                    {interaction.views_count}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-blue-50 py-2 px-3 rounded-lg">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>
                  Tiempo estimado:{" "}
                  <strong>
                    {estimatedTimeData?.interactionId === interaction.id
                      ? estimatedTimeData?.estimatedTime
                      : 0}
                  </strong>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="">
            <div className="space-y-3 flex-1">
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium" // className="cursor-pointer bg-[#007BFF] hover:bg-[#0056b3] text-white"
                onClick={() => {
                  onExecuteInteraction(interaction);
                }}
                disabled={anyExecuting || interaction.status === "EN_PROGRESO"}
              >
                <Play className="w-4 h-4 mr-2" />
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
                      className="cursor-pointer flex-1 border-gray-300 hover:bg-gray-50"
                      size="sm"
                      disabled={
                        anyExecuting && interaction.status !== "EN_PROGRESO"
                      }
                    >
                      <SquarePen className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  }
                />

                <Button
                  variant="outline"
                  className="cursor-pointer flex-1 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                  size="sm"
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
                  Cancelar
                </Button>

                <Button
                  variant="outline"
                  className="cursor-pointer flex-1 border-red-300 text-red-700 hover:bg-red-50"
                  size="sm"
                  onClick={() => onDeleteInteraction(interaction.id)}
                  disabled={
                    anyExecuting && interaction.status !== "EN_PROGRESO"
                  }
                >
                  <Trash2 />
                  Eliminar
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export { ScheduledTiktokInteractions };
