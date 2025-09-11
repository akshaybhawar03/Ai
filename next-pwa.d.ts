declare module "next-pwa" {
  import type { NextConfig } from "next";

  interface PWAOptions {
    dest?: string;
    disable?: boolean;
  }

  export default function withPWA(config: PWAOptions): (nextConfig: NextConfig) => NextConfig;
}
