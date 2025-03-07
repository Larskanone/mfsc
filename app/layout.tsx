import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Box, Typography } from "@mui/joy";
import { LeftNavbar } from "@/components/navbar/leftNavbar3";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "mfsc4",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-0 left-0">
            <LeftNavbar />
          </div>
          <main className="min-h-screen flex flex-col items-center gap-20">
            <div className="w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 gap-20">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>MFSC-Heringen e.V.</Typography>
                </Box>
                <Box sx={{ flexShrink: 0, display: "flex", textAlign: "end", justifyContent: "flex-end" }}>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </Box>
              </nav>
            </div>
            <div className="flex flex-col gap-20 max-w-5xl p-5">
              {children}
            </div>
            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
              <p>
                Powered by{" "}
                <a
                  href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Supabase
                </a>
              </p>
              <ThemeSwitcher />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
