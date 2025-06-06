"use client";

import { TrendingUpIcon } from "lucide-react";
import { TikTokIcon } from "../../icons/tiktok-icon";
// import { FacebookIcon } from "../../icons/facebook-icon";

// import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getGeneratedComments,
  getGeneratedLikes,
  getGeneratedViews,
  getTotalTiktokInteractions,
} from "@/app/main/dashboard/api";
import { useContext, useEffect, useState } from "react";
import { DevicesContext } from "@/context/DevicesContext";

export function SectionCards() {
  //Estado para el total de interacciones realizadas
  const [totalTiktokInteractions, setTotalTiktokInteractions] = useState<
    number | null
  >(null);

  //Vistas genradas
  const [generatedViews, setGeneratedViews] = useState(0);

  // likes generados
  const [generatedLikes, setGeneratedLikes] = useState(0);

  const [generatedComments, setGeneratedComments] = useState(0);

  //Traer los dispositivos
  const devices = useContext(DevicesContext);
  // Filtrar dispositivos activos
  const activeDevices = devices.filter((device) => device.status === "ACTIVO");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //interacciones
        const resTotal = await getTotalTiktokInteractions();
        if (!resTotal.ok) {
          console.error("Error:", resTotal.message);
        }
        setTotalTiktokInteractions(resTotal.data);

        // views
        const resTotalViews = await getGeneratedViews();
        if (!resTotalViews.ok) {
          console.error("Error:", resTotalViews.message);
        }
        setGeneratedViews(resTotalViews.data);

        // likes
        const resTotalLikes = await getGeneratedLikes();
        if (!resTotalLikes.ok) {
          console.error("Error:", resTotalLikes.message);
        }
        setGeneratedLikes(resTotalLikes.data);

        // comments
        const resTotalComments = await getGeneratedComments();
        if (!resTotalComments.ok) {
          console.error("Error:", resTotalComments.message);
        }
        setGeneratedComments(resTotalComments.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setTotalTiktokInteractions(0);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Dispositivos Conectados</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {activeDevices.length}
          </CardTitle>
          {/* <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-red-600"
            >
              <TrendingDownIcon className="size-3" />
              -3%
            </Badge>
          </div> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Móviles conectados vía USB{" "}
            {/* <TrendingDownIcon className="size-4 text-red-600" /> */}
          </div>
          <div className="text-muted-foreground">
            Ligera disminución esta semana
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Interacciones Realizadas</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalTiktokInteractions}
          </CardTitle>
          {/* <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-green-600"
            >
              <TrendingUpIcon className="size-3" />
              +12%
            </Badge>
          </div> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Acciones programadas{" "}
            <TrendingUpIcon className="size-4 text-green-600" />
          </div>
          <div className="text-muted-foreground">
            Crecimiento constante en ambas plataformas
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Vistas Generadas</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {generatedViews}
          </CardTitle>
          {/* <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-green-600"
            >
              <TrendingUpIcon className="size-3" />
              +8.5%
            </Badge>
          </div> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Vistas totales en videos de TikTok <TikTokIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Aumento significativo este mes
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Likes automáticos realizados</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {generatedLikes}
          </CardTitle>
          {/* <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-green-600"
            >
              <TrendingUpIcon className="size-3" />
              +8.5%
            </Badge>
          </div> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Vistas totales en videos de TikTok <TikTokIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Aumento significativo este mes
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Comentarios automaticos realizados</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {generatedComments}
          </CardTitle>
          {/* <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-green-600"
            >
              <TrendingUpIcon className="size-3" />
              +5%
            </Badge>
          </div> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Comentarios generados en videos
            <TikTokIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Principalmente en Tiktok</div>
        </CardFooter>
      </Card>
    </div>
  );
}
