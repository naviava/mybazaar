"use client";

import { memo } from "react";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

interface IProps {
  id: string;
}

export const OTPFormInput = memo(_OTPFormInput);
function _OTPFormInput({ id }: IProps) {
  return <div>otp-form-input</div>;
}
