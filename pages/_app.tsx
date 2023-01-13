import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Theme from "../components/Theme";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Theme>
    </QueryClientProvider>
  );
}
