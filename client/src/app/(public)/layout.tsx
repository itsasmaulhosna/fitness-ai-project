import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import Providers from "@/components/providers";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Toaster richColors position="top-right" />

      <Footer />
    </Providers>
  );
}