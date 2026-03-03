"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandPalette } from "@/components/command-palette";
import { ContentView } from "@/components/content/content-view";
import { usePanel } from "@/components/panel-context";
import { MemberDetailPanel } from "@/components/members/member-detail-panel";
import { MembersTable } from "@/components/members/members-table";
import { PulseView } from "@/components/pulse/pulse-view";
import { SettingsView } from "@/components/settings/settings-view";
import { Sidebar, type ActiveView } from "@/components/sidebar";

const PANEL_WIDTH = 380;

function CommunityShell() {
  const { isOpen, closePanel } = usePanel();
  const [activeView, setActiveView] = useState<ActiveView>("members");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (activeView !== "members") {
      closePanel();
    }
  }, [activeView, closePanel]);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-hidden">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenCommand={() => setIsCommandOpen(true)}
        />

        <main className="ml-0 flex h-full flex-row pb-16 md:ml-16 md:pb-0 lg:ml-60">
          <section className="flex-1 overflow-y-auto bg-(--os-bg)">
            {activeView === "members" && <MembersTable />}
            {activeView === "pulse" && <PulseView />}
            {activeView === "content" && <ContentView />}
            {activeView === "settings" && <SettingsView />}
          </section>

          <AnimatePresence>
            {activeView === "members" && isOpen && isMobile && (
              <>
                <motion.div
                  key="mobile-panel-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/50"
                  onClick={closePanel}
                />
                <motion.div
                  key="mobile-panel"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed inset-x-0 bottom-0 z-50 h-[90vh] overflow-hidden rounded-t-2xl bg-(--os-surface)"
                >
                  <MemberDetailPanel />
                </motion.div>
              </>
            )}

            {activeView === "members" && isOpen && !isMobile && (
              <motion.div
                key="detail-panel"
                initial={{ x: PANEL_WIDTH, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: PANEL_WIDTH, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 right-0 z-10 h-full w-95 border-l bg-(--os-surface)"
                style={{ borderColor: "var(--os-border-subtle)" }}
              >
                <MemberDetailPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette
        open={isCommandOpen}
        onOpenChange={setIsCommandOpen}
        setActiveView={setActiveView}
      />
    </div>
  );
}

export default function HomePage() {
  return <CommunityShell />;
}
