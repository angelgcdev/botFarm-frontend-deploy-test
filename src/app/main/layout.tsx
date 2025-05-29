"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClientMainLayout from "./client-main-layout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
          {
            credentials: "include",
          }
        );

        console.log("Response:", res);
        if (!res.ok) {
          router.push("/login");
        } else {
          setIsAuthChecked(true); // Solo mostrar hijos si está autenticado
        }
      } catch (err) {
        router.push("/login");
        console.log(err);
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthChecked) return <div>Cargando...</div>; // Evita mostrar el layout hasta verificar

  return <ClientMainLayout>{children}</ClientMainLayout>;
}
