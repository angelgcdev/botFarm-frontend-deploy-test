//src/app/main/layout.tsx
"use client";

import { MainSiteHeader } from "@/components/main/main-site-header";
import { MainSidebar } from "@/components/main/main-sidebar";
import { DevicesProvider } from "@/context/DevicesContext";
// import { useSocket } from "@/hooks/useSocket";
import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SendUserIdOnLoad from "./ClientUserSender";
import { SocketProvider } from "@/context/SocketContext";
import { ActiveDevicesPanel } from "@/components/main/ActiveDevicesPanel";

const ClientMainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  //Iniciando la conexion socket io client
  // useSocket();

  return (
    <>
      <SocketProvider>
        <DevicesProvider>
          <SendUserIdOnLoad />

          <Toaster position="bottom-right" richColors closeButton />
          <SidebarProvider>
            <MainSidebar variant="inset" />

            <SidebarInset>
              <MainSiteHeader />
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {children}
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
          <ActiveDevicesPanel />
        </DevicesProvider>
      </SocketProvider>
    </>
  );
};

export default ClientMainLayout;
