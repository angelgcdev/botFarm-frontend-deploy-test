// 1. Librerías de Node.js

// 2. Librerías de terceros
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// 3. Librerías internas absolutas
import {
  Form,
  FormControl,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 4. Imports relativos
import { TikTokIcon } from "../../icons/tiktok-icon";
import { ScheduledTiktokInteraction } from "@/app/main/schedule-posts/types";

type Props = {
  interaction: ScheduledTiktokInteraction;
  onEditInteraction: (id: number, data: TikTokInteractionForm) => void;
  index: number;
  trigger: React.ReactNode;
};

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

function EditModal({ interaction, onEditInteraction, index, trigger }: Props) {
  //Estado para controlar el modal
  const [open, setOpen] = useState(false);

  //Use form
  const form = useForm<z.infer<typeof tiktokInteractionSchema>>({
    resolver: zodResolver(tiktokInteractionSchema),
    defaultValues: {
      video_url: interaction.video_url,
      views_count: interaction.views_count,
      liked: interaction.liked,
      saved: interaction.saved,
      comment: interaction.comment,
    },
  });

  const onSubmit = async (interactionEdited: TikTokInteractionForm) => {
    onEditInteraction(interaction.id, interactionEdited);
    setOpen(false); // Cierra el modal
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)}>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar interacción #{index + 1}</DialogTitle>
          <DialogDescription>Alguna descripción </DialogDescription>
        </DialogHeader>

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
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                      <FormLabel>Comentario</FormLabel>
                      <FormControl>
                        <Textarea
                          id="tiktok-comment-text"
                          placeholder="Escribe......"
                          {...field}
                        />
                      </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Guardar cambios</Button>
                </DialogFooter>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end"></CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export { EditModal };
