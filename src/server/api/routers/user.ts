import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getByName: publicProcedure
    .input(z.string().min(1))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          name: input,
        },
      });
    }),
  followsCountsByUserId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.user.findFirst({
        where: {
          id: input,
        },
        include: {
          _count: {
            select: {
              followers: true,
              followings: true,
            },
          },
        },
      });

      return result;
    }),
  follow: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      const existFollow = await ctx.prisma.follow.findFirst({
        where: {
          byUserId: ctx.session.user.id,
          toUserId: input,
        },
      });

      if (existFollow) {
        return existFollow;
      }

      const result = await ctx.prisma.follow.create({
        data: {
          byUserId: ctx.session.user.id,
          toUserId: input,
        },
      });

      return result;
    }),
  unfollow: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.follow.deleteMany({
        where: {
          byUserId: ctx.session.user.id,
          toUserId: input,
        },
      });

      return result;
    }),
  isFollowing: protectedProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.follow.findFirst({
        where: {
          byUserId: ctx.session.user.id,
          toUserId: input,
        },
      });

      return result;
    }),
});
