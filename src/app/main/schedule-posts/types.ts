export type InteractionStatus =
  | "PENDIENTE"
  | "EN_PROGRESO"
  | "COMPLETADA"
  | "FALLIDA"
  | "CANCELADO";

export interface ScheduledTiktokInteraction {
  id: number;
  user_id: number;
  video_url: string;
  liked: boolean;
  saved: boolean;
  comment: string;
  views_count: number;
  status: InteractionStatus;
}

export type EstimatedTimeData = {
  estimatedTime: string;
  interactionId: number;
};
