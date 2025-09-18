import Footer from "@/components/main/footer/Footer";
import MainHeader from "@/components/main/header/MainHeader";
import Providers from "@/shared/Providers";
import { poppinsRegularFont } from "@/shared/fonts";
import { IChildren } from "@/shared/types";
import "./globals.css";

export default function layout({ children }: IChildren) {
  return (
    <html lang="en">
      <body
        className={`${poppinsRegularFont.className} flex flex-col min-h-screen`}
      >
        <Providers>
          <header>
            <MainHeader />
          </header>
          <main className="flex-grow bg-color-bg text-color-text-3 relative">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
