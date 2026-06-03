// app/layout.tsx
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata = {
  title: "Fona Consulting",
  description: "Konsultan IT dan Transformasi Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}