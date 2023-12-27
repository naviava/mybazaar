import { create } from "zustand";

type BannerType = "success" | "error" | "warning" | "info" | "hidden";

type SidebarState = {
  message: string;
  type: BannerType;
  showBanner: (message: string, type: BannerType) => void;
  hideBanner: () => void;
};

export const useNotificationBanner = create<SidebarState>((set) => ({
  type: "hidden",
  message: "",
  showBanner: (message: string, type: BannerType) => set({ message, type }),
  hideBanner: () => set({ message: "", type: "hidden" }),
}));
