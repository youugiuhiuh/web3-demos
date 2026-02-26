import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const Web3Providers = dynamic(() => import("../components/Web3Providers"), { ssr: false });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Providers>
      <Component {...pageProps} />
    </Web3Providers>
  );
}
