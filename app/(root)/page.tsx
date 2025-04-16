import Header from "./_components/header";
import Footer from "./_components/footer";

import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";

import { transitionVariants } from "@/lib/constants/animations";

export default function LandingPage() {
  return (
    <>
      <Header />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute top-0 h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.35)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
        <div className="container px-8 md:px-16 relative">
          <div className="flex flex-col space-y-8">
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white max-w-3xl"
            >
              Notevana, where your thoughts find flow.
            </TextEffect>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="text-xl text-zinc-200 max-w-[600px]"
            >
              Organize your thoughts and stay in flow — anywhere, anytime.
            </TextEffect>
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:cursor-pointer active:scale-95"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  className="hover:cursor-pointer active:scale-95 hover:border"
                >
                  View GitHub
                </Button>
              </div>
            </AnimatedGroup>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
