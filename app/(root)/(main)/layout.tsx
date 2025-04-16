"use client";

import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SideBarNavigation from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/signin");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={25} minSize={0} maxSize={40}>
        <SideBarNavigation />
      </Panel>
      <PanelResizeHandle className="border" />
      <Panel className="flex">{children}</Panel>
    </PanelGroup>
  );
}
