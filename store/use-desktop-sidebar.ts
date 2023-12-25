import { create } from "zustand";

type SidebarState = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

export const useDesktopSidebar = create<SidebarState>((set) => ({
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
