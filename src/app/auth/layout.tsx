import React from "react";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-bg.jpg";
import { Brain, Shield, Zap } from "lucide-react";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div
        className="hidden lg:flex flex-col justify-center p-12 text-white relative"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* lighter overlay so text pops more */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/15 z-10" />
        {/* keep content in flow and above overlay, use relative + z-20 */}
        <div className="relative z-20 max-w-md flex flex-col gap-8">
          <div className=" flex gap-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <img src={logo.src} alt="" className="w-8 h-8" />
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
            <div className="flex items-center gap-3 p-4 rounded-lg bg-black/12 bg-blend-multiply backdrop-blur-sm border border-white/10">
              <Brain className="h-6 w-6 text-purple-400 flex-shrink-0" />
              <div>
                <div className="font-semibold">Smart Connections</div>
                <div className="text-sm text-white/70">
                  AI-powered link suggestions
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-black/12 bg-blend-multiply backdrop-blur-sm border border-white/10">
              <Zap className="h-6 w-6 text-purple-400 flex-shrink-0" />
              <div>
                <div className="font-semibold">Lightning Search</div>
                <div className="text-sm text-white/70">
                  Find anything instantly
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-black/12 bg-blend-multiply backdrop-blur-sm border border-white/10">
              <Shield className="h-6 w-6 text-purple-400 flex-shrink-0" />
              <div>
                <div className="font-semibold">Secure & Private</div>
                <div className="text-sm text-white/70">
                  Your knowledge stays yours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-[#101318]">
        {children}
      </div>
    </div>
  );
}

export default layout;
