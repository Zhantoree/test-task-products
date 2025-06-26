import "./globals.css";
import React, {ReactNode} from "react";
import {inter} from "@/app/ui/fonts";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} antialiased`}
        >
        <main className="w-full max-w-[1440] mx-auto flex flex-col justify-center items-center">
            <h1 className="w-80 md:w-100 inline mx-auto my-10 px-6 py-2 text-4xl text-white bg-grey-400 rounded-xl text-center font-normal">
                тестовое задание
            </h1>
            {children}
        </main>
        </body>
        </html>
    );
}
