import type { Metadata, Viewport } from "next";
import { plusJakarta, plusJakartaAccent } from "./fonts";
import "./globals.css";
import { ListoBoxProvider } from "@/context/ListoBoxContext";

export const metadata: Metadata = {
  title: "ListoBox — Esta semana cocinas como Chef en casa",
  description:
    "Ingredientes frescos dosificados al gramo, recetas paso a paso de autor listas en 20 minutos. Sin cláusulas de permanencia.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#00473c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${plusJakarta.variable} ${plusJakartaAccent.variable}`}
    >
      <body className="bg-background text-forest-shadow font-sans antialiased overflow-hidden">
        <ListoBoxProvider>{children}</ListoBoxProvider>
      </body>
    </html>
  );
}
