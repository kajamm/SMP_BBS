import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollTop />
      <ScrollReveal />
    </>
  );
}
