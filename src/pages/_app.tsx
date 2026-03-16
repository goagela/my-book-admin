import MyLayout from "@/components/MyLayout";
import "@/styles/globals.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (router.pathname === '/login') {
    return <Component {...pageProps} />
  } else {
    return (
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    );
  }

}
