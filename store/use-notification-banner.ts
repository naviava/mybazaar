import { create } from "zustand";

export type BannerType = "success" | "error" | "warning" | "info" | "hidden";

type SidebarState = {
  message: string;
  type: BannerType;
  showBanner: ({
    message,
    type,
  }: {
    message: string;
    type: BannerType;
  }) => void;
  showConsistentBanner: ({
    message,
    type,
  }: {
    message: string;
    type: BannerType;
  }) => void;
  hideBanner: () => void;
};

export const useNotificationBanner = create<SidebarState>((set) => ({
  type: "hidden",
  message: "",
  showBanner: ({ message, type }) => {
    set({ message, type });
    setTimeout(() => set({ message: "", type: "hidden" }), 5000);
  },
  showConsistentBanner: ({ message, type }) => set({ message, type }),
  hideBanner: () => set({ message: "", type: "hidden" }),
}));
