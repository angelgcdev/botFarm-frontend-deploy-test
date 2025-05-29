import { useEffect } from "react";

export function TikTokScriptLoader({
  reloadTrigger,
}: {
  reloadTrigger: unknown;
}) {
  useEffect(() => {
    // Eliminar cualquier script anterior solo si existe y tiene el mismo src
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.tiktok.com/embed.js"]'
    );

    if (existingScript) {
      existingScript.remove();
    }

    // Crear un nuevo script de TikTok
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    script.defer = true; // (opcional, ayuda con carga no bloqueante)
    document.body.appendChild(script);

    // Cleanup por si el componente se desmonta
    return () => {
      script.remove();
    };
  }, [reloadTrigger]);

  return null; // No renderiza nada visible
}
