import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";

import PostContextProvider from "@/components/context/PostContextProvider";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PostContextProvider>
        <Component {...pageProps} />
      </PostContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
