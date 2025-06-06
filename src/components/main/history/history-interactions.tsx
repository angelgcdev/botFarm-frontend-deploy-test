"use client";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  TrendingUp,
  Mail,
} from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
// import { FacebookIcon } from "@/components/icons/facebook-icon";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTiktokHistory } from "@/app/main/history/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

enum TiktokInteractionStatus {
  COMPLEATADA = "COMPLETADA",
  FALLIDA = "FALLIDA",
}
interface TiktokHistoryItem {
  id: number;
  device_id: number;
  finished_at: string;
  username: string;
  video_url: string;
  liked: boolean;
  video_saved: boolean;
  commented: string | null;
  total_views: number;
  status: TiktokInteractionStatus;
  device: {
    google_accounts: [
      {
        email: string;
      }
    ];
  };
}

export function HistoryInteractions() {
  const [tiktokHistoryData, setTiktokHistoryData] = useState<
    TiktokHistoryItem[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTiktokHistory();

      console.log(res);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      setTiktokHistoryData(res.data);
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Historial de Interacciones de
          <span className="flex">
            <TikTokIcon className="h-4 w-4" />
            TikTok
          </span>
        </CardTitle>
        <CardDescription>
          Registro de todas las interacciones programadas en tus Tiktok
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Correo</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Cuenta de TikTok</TableHead>
              <TableHead>Acciones</TableHead>
              <TableHead>Comentario</TableHead>
              <TableHead className="text-right">Vistas</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiktokHistoryData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{item.device.google_accounts[0].email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(item.finished_at).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Button variant="link" className="h-auto p-0" asChild>
                    <a
                      href={item.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span className="truncate max-w-[120px]">
                        {item.video_url
                          ? item.video_url.replace(/https?:\/\/www./, "")
                          : " "}
                      </span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    <span>{item.username}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      {item.liked ? "Me Gusta" : "-"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.video_saved ? "Guardado" : "-"}
                    </Badge>
                    {/* <Badge variant="outline" className="text-xs">
                      {item.commented ? "Comentado" : "-"}
                    </Badge> */}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span>{item.commented ? item.commented : "-"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {item.total_views > 0 ? (
                    <div className="flex items-center justify-end gap-1">
                      <span>{item.total_views.toLocaleString("es-ES")}</span>
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell>
                  {item.status === "COMPLETADA" ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Completado
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200"
                    >
                      <Clock className="h-3 w-3" />
                      Fallido
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
