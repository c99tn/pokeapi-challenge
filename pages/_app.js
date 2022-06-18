import "../styles/globals.css";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
//query wrapping config 

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
