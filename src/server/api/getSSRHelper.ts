import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../auth";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson"
import { appRouter } from "./root";
import { createInnerTRPCContext } from "./trpc";

const getSSRHelper = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerAuthSession({req, res}); 
  return createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({
      session
    }),
    transformer: superjson
  })
}

export default getSSRHelper;