"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useContext } from "react";

// 3. Librerías internas absolutas
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DevicesContext } from "@/context/DevicesContext";

// 4. Imports relativos
import { TikTokIcon } from "../../icons/tiktok-icon";
import { FacebookIcon } from "../../icons/facebook-icon";
import { ScheduledTiktokInteractions } from "./ScheduledTiktokInteractions";
import { getInteractionsTiktokData } from "@/app/main/schedule-posts/getInteractionsTiktokData.api";
import { ScheduledTiktokInteraction } from "@/app/main/schedule-posts/types";
import { SocketContext } from "@/context/SocketContext";
import {
  createInteractionTiktokData,
  deleteInteractionTiktokData,
  editInteractionTiktokData,
} from "@/app/main/schedule-posts/api";

const tiktokInteractionSchema = z.object({
  video_url: z.string().url().min(1, "El enlace es requerido"),
  views_count: z
    .number()
    .min(0, "El número de vistas no puede ser menor que 0.")
    .optional(),
  liked: z.boolean().optional(),
  saved: z.boolean().optional(),
  comment: z.string().optional(),
});

export type TikTokInteractionForm = z.infer<typeof tiktokInteractionSchema>;

export function ScheduleInteractionsForm() {
  //
  const [scheduledTiktokInteractions, setscheduledTiktokInteractions] =
    useState<ScheduledTiktokInteraction[]>([]);
  //
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      toast.error("No hay conexión con el servidor.");
      return;
    }

    const fetchData = async () => {
      await loadData();
    };

    fetchData(); // Obtener datos

    //Listener que vuelve a cargar los datos cuando llega el evento
    const handleUpdate = async () => {
      await loadData();
    };

    socket.on("schedule:tiktok:interaction:update", handleUpdate);

    return () => {
      socket.off("schedule:tiktok:interaction:update", handleUpdate);
    };
  }, [socket]);

  //obtener datos
  const loadData = async () => {
    const interacciones = await getInteractionsTiktokData();
    console.log(
      "Datos de la tabla de schedule_tiktok_interactions:",
      interacciones
    );
    setscheduledTiktokInteractions(interacciones);
  };

  //Obtener datos de los dispositivos mediante useContext
  const devices = useContext(DevicesContext);

  //Use form
  const form = useForm<z.infer<typeof tiktokInteractionSchema>>({
    resolver: zodResolver(tiktokInteractionSchema),
    defaultValues: {
      video_url: "",
      views_count: 0,
      liked: false,
      saved: false,
      comment: "",
    },
  });

  const [activeTab, setActiveTab] = useState("tiktok");

  //por si acaso
  if (!socket) {
    toast.error("No hay conexión con el servidor.");
    return;
  }

  const onSubmit = async (scheduledTiktokDataForm: TikTokInteractionForm) => {
    console.log("Datos de la interaccion de tiktok:", scheduledTiktokDataForm);

    const res = await createInteractionTiktokData(scheduledTiktokDataForm);

    if (res?.error) {
      toast.error(`Error al crear la interacción: ${res.message}`);
    }

    //Actualizar datos del servidor
    await loadData();

    toast.success("Creado correctamente");

    form.reset();
  };

  //Funcion para ejecutar interaccion
  const handleExecuteScheduledTiktokInteraction = async (
    scheduledTiktokInteractionData: ScheduledTiktokInteraction
  ) => {
    //Filtrar dispositivos conectados
    const activeDevices = devices.filter(
      (device) => device.status === "ACTIVO"
    );
    console.log("Dispositivos activos:", activeDevices);
    console.log("Datos de la interaccion", scheduledTiktokInteractionData);

    if (activeDevices.length === 0) {
      toast.warning("🚨 No se encontraron dispositivos conectados.");
      return false;
    }

    console.log("enviando datos a socket io... ");

    // Enviar los datos al servidor
    socket.emit("schedule:tiktok:start", {
      scheduledTiktokInteractionData,
      activeDevices,
    });

    toast.success(
      `Interacción de ${
        activeTab === "tiktok" ? "TikTok" : "Facebook"
      } iniciada correctamente`
    );

    return true;
  };

  //Funcion para editar interaccion
  const handleEditScheduledTiktokInteraction = async (
    id: number,
    interactionEdited: TikTokInteractionForm
  ) => {
    console.log("Datos editados", interactionEdited);

    const res = await editInteractionTiktokData(id, interactionEdited);

    if (res?.error) {
      toast.error(`Error al editar: ${res.message}`);
    }

    //Actualizar datos del servidor
    await loadData();

    toast.success("Editado correctamente");
  };

  //Funcion para eliminar interaccion
  const handleDeleteScheduledTiktokInteraction = async (id: number) => {
    const res = await deleteInteractionTiktokData(id);

    if (res?.error) {
      toast.error(`Error al eliminar: ${res.message}`);
    }

    //Actualizar datos del servidor
    await loadData();

    toast.success("Eliminado correctamente");
  };

  //Funcion para cancelar la interaccion
  const handleCancelScheduledTiktokInteraction = async (
    interaction_id: number
  ) => {
    socket.emit("cancel:tiktok:interaction", interaction_id);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tiktok" className="flex items-center gap-2">
            <TikTokIcon className="h-4 w-4" />
            <span>TikTok</span>
          </TabsTrigger>

          <TabsTrigger value="facebook" className="flex items-center gap-2">
            <FacebookIcon className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600">Facebook</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tiktok">
          <Card className="w-full border-t-0 rounded-tl-none rounded-tr-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TikTokIcon className="h-5 w-5" />
                Potencia tu visibilidad en TikTok
              </CardTitle>
              <CardDescription>
                Amplifica tu alcance automáticamente generando interacciones
                reales en tus videos favoritos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-8">
                  <FormField
                    control={form.control}
                    name="video_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enlace del video</FormLabel>
                        <FormControl>
                          <Input
                            id="video_url"
                            placeholder="Pega aquí la URL del video (ej: https://tiktok.com/@usuario/video/123456789)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Alguna descripcion</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="text-base">¿Qué acciones quieres realizar?</p>

                  <FormField
                    control={form.control}
                    name="liked"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Me gusta</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="saved"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Guardar video
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Escribe el comentario a publicar</FormLabel>
                        <FormControl>
                          <Textarea
                            id="tiktok-comment-text"
                            placeholder="Escribe......"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>alguna descripcion</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="views_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          ¿Cuántas visualizaciones deseas generar?
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="tiktok-views"
                            type="number"
                            placeholder="100"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>Alguna descripcion</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="bg-black hover:bg-black/40 text-white"
              >
                Crear Interacción
              </Button>
            </CardFooter>
          </Card>
          {scheduledTiktokInteractions.length > 0 && (
            <ScheduledTiktokInteractions
              scheduledTiktokInteractions={scheduledTiktokInteractions}
              onExecuteInteraction={handleExecuteScheduledTiktokInteraction}
              onEditInteraction={handleEditScheduledTiktokInteraction}
              onDeleteInteraction={handleDeleteScheduledTiktokInteraction}
              onCancelInteraction={handleCancelScheduledTiktokInteraction}
            />
          )}
        </TabsContent>

        <TabsContent value="facebook"></TabsContent>
      </Tabs>
    </>
  );
}
