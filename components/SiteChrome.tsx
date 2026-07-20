import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Shared chrome (nav + footer) for every route. No WebGL here — the GPU canvas is landing-page-only. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
