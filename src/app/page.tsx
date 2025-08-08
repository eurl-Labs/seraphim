import Hero from "./components/layout/sections/hero";
import MultiCollateral from "./components/layout/sections/multiCollateral";
import Platform from "./components/layout/sections/platform";
import { Features } from "./components/layout/sections/features";
import Footer from "./components/layout/sections/footer";
import NavBarSeraphim from "./components/layout/Navbar";

export const metadata = {
  title: "Seraphim",
  description: "",
  openGraph: {
    type: "website",
    url: "",
    title: "Seraphim",
    description: "",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Seraphim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "",
    title: "Seraphim",
    description: "",
    images: [""],
  },
};
export default function Home() {
  return (
    <>
    <NavBarSeraphim />
      <Hero />
      <MultiCollateral />
      <Platform />
      <Features/>
      <Footer/>
    </>
  );
}
