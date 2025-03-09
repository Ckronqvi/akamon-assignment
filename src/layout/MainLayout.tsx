import { ReactNode } from "react";

const NoiseFilter = () => {
  return (
    <svg className="fixed w-0 h-0">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0.8 0.1 0.1 0 0 
                  0.1 0.7 0.1 0 0 
                  0.1 0.1 0.6 0 0 
                  0 0 0 1 0"
        />
        <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
        <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
      </filter>
    </svg>
  );
};

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen py-0 px-2">
      <NoiseFilter />
      <div
        className="fixed inset-0 -z-40 pointer-events-none opacity-20 bg-[#ffc75f]"
        style={{ filter: "url(#noiseFilter)" }}
      />
      <main className="container flex flex-col w-screen mx-auto max-w-5xl lg:py-6 lg:px-2 flex-1 my-6 justify-top">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
