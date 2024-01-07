"use client";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { TRPCProvider } from "./trpc-provider";

interface IProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProps) {
  return (
    <TRPCProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </TRPCProvider>
  );
}
