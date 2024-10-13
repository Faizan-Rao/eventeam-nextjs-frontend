import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PersistStore from "@/components/PersistStore";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="en">
      <head>
    
        {(process.env.NODE_ENV === "development" ||
          process.env.VERCEL_ENV === "preview") && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-project-id="Z2trcrwM1KR8htqEEZ85LY767SLTaUf3gu7Swszq"
            data-is-production-environment="false"
            src="https://snippet.meticulous.ai/v1/meticulous.js"
          />
          
        )}
        
      </head>
      <body>

        <ToastContainer/>
        

        <PersistStore>{children}</PersistStore>
       
        
      </body>
    </html>
  );
}
