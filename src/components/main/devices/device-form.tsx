"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

// 3. Librerías internas absolutas
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { completeInfoDevice } from "@/app/main/devices/api";
import { updateInfoDevice } from "@/app/main/devices/api";

// 4. Imports relativos
import { Input } from "../../ui/input";

const items = [
  {
    id: "TIKTOK",
    label: "TikTok",
  },
  {
    id: "FACEBOOK",
    label: "Facebook",
  },
] as const;

const FormSchema = z.object({
  email: z
    .string()
    .email("Debe ser un correo válido")
    .min(1, "El correo es requerido"),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos un elemento.",
  }),
});

interface InitialData {
  email: string;
  items: string[];
}

interface DeviceFormProps {
  onClose: () => void;
  deviceId: number;
  onComplete: () => void;
  initialData: InitialData | null;
}

export function DeviceForm({
  onClose,
  deviceId,
  onComplete,
  initialData,
}: DeviceFormProps) {
  console.log(initialData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: initialData?.email || "",
      items: initialData?.items ?? [],
    },
  });

  //reset
  useEffect(() => {
    if (initialData) {
      form.reset({
        email: initialData.email,
        items: initialData.items,
      });
    }
  }, [initialData, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const infoDevice = { ...data, dispositivo_id: deviceId };

      console.log(infoDevice);

      if (initialData) {
        const res = await updateInfoDevice(infoDevice);

        console.log(res);

        if (!res.ok) {
          toast.error(res.message);
          return;
        }

        toast.success(res.data.message);
        //Cerramos el modal
        onClose();
      } else {
        const res = await completeInfoDevice(infoDevice);

        if (!res.ok) {
          toast.error(res.message);
          return;
        }

        toast.success(res.data.message);

        //Marcar el boton como completado
        onComplete?.();

        //Cerramos el modal
        onClose();
      }
    } catch (error) {
      toast.error("Fallo la conexión", {
        description: "No se pudo conectar al servidor",
      });

      console.error("Error al enviar datos:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico Google</FormLabel>
                <FormControl>
                  <Input placeholder="correo@gmail.com" {...field} />
                </FormControl>
                <FormDescription>Introduce tu cuenta google</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Redes sociales</FormLabel>
                  <FormDescription>
                    Seleccion las redes sociales que tenga registrada la cuenta
                    de google.
                  </FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </>
  );
}
