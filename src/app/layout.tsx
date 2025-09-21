import "../styles/globals.css";
import type { ReactNode } from "react";
import { GNB } from "@/components/shared/gnb";
import { IMAGES } from "@/components/shared/image";
import QueryProvider from "@/shared/providers/QueryProvider";

export const metadata = { title: "do it;" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <QueryProvider>
        <body>
          <GNB
            brand={{
              image: {
                name: IMAGES.LOGO_DOIT,
                width: 151,
                height: 40,
                priority: true,
                imageMobile: {
                  name: IMAGES.LOGO,
                  width: 71,
                  height: 40,
                },
              },
              href: "/",
            }}
            links={[]}
            sticky
            maxW="xl"
          />
          <main className="mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8 py-8">
            {children}
          </main>
        </body>
      </QueryProvider>
    </html>
  );
}
