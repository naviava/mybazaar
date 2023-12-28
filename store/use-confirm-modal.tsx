import { create } from "zustand";

type ConfirmModalState = {
  imageKey?: string;
  isOpen: boolean;
  onOpen: (imageKey: string) => void;
  onClose: () => void;
};

export const useConfirmModal = create<ConfirmModalState>((set) => ({
  imageKey: undefined,
  isOpen: false,
  onOpen: (imageKey: string) => set({ isOpen: true, imageKey }),
  onClose: () => set({ isOpen: false, imageKey: undefined }),
}));
