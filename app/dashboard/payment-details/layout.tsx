import type { Metadata } from "next";
import '@/components/MainLayoutGrid'
import PaymentDetailProvider from "@/context/PaymentDetailProvider";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function PaymentDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PaymentDetailProvider>
      {children}
    </PaymentDetailProvider>
  );
}
