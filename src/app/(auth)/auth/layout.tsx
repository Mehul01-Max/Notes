// app/auth/layout.tsx
import React from "react";
import heroImage from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { Brain, Shield, Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Hero Section */}
      <div
        className="hidden lg:flex flex-col justify-center p-12 text-white relative"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/15 z-10" />
        <div className="relative z-20 max-w-md flex flex-col gap-8">
          <div className="flex gap-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <img src={logo.src} alt="Logo" className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-2xl text-white">Zettelkasten</div>
              <div className="text-white/70">Knowledge Graph System</div>
            </div>
          </div>

          <div className="text-purple-400 text-4xl font-extrabold">
            Build Your Knowledge Empire
          </div>
          <div className="text-white/80">
            Join thousands of thinkers, researchers, and learners who have
            transformed their note-taking with our intelligent knowledge graph
            system.
          </div>

          <div className="space-y-4">
            <Feature
              icon={<Brain />}
              title="Smart Connections"
              desc="AI-powered link suggestions"
            />
            <Feature
              icon={<Zap />}
              title="Lightning Search"
              desc="Find anything instantly"
            />
            <Feature
              icon={<Shield />}
              title="Secure & Private"
              desc="Your knowledge stays yours"
            />
          </div>
        </div>
      </div>

      {/* Right Auth Form */}
      <div className="flex justify-center items-center bg-[#101318]">
        {children}
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-black/12 bg-blend-multiply backdrop-blur-sm border border-white/10">
      <div className="h-6 w-6 text-purple-400 flex-shrink-0">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-white/70">{desc}</div>
      </div>
    </div>
  );
}
