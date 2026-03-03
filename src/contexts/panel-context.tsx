"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Member } from "@/lib/data/members";

type PanelContextValue = {
  isOpen: boolean;
  selectedMember: Member | null;
  openPanel: () => void;
  openPanelWithMember: (member: Member) => void;
  closePanel: () => void;
  togglePanel: () => void;
};

const PanelContext = createContext<PanelContextValue | undefined>(undefined);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const openPanel = useCallback(() => {
    setIsOpen(true);
  }, []);

  const openPanelWithMember = useCallback((member: Member) => {
    setSelectedMember(member);
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    setSelectedMember(null);
  }, []);

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      selectedMember,
      openPanel,
      openPanelWithMember,
      closePanel,
      togglePanel,
    }),
    [
      isOpen,
      selectedMember,
      openPanel,
      openPanelWithMember,
      closePanel,
      togglePanel,
    ]
  );

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}

export function usePanel() {
  const context = useContext(PanelContext);

  if (!context) {
    throw new Error("usePanel must be used within a PanelProvider");
  }

  return context;
}
