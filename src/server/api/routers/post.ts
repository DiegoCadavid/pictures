import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  postCreate: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2).max(24),
        description: z.string().min(2).max(256),
        tags: z.array(z.string().toLowerCase().min(2).max(12)).min(2).max(8),
        imageUrl: z.string().min(1),
        imageWidth: z.number().min(1),
        imageHeight: z.number().min(1),
        imageColorHex: z.string().min(1),
      })
    )
    .mutation(
      async ({
        ctx,
        input: {
          imageUrl,
          imageHeight,
          imageWidth,
          description,
          tags,
          title,
          imageColorHex,
        },
      }) => {
        const result = await ctx.prisma.post.create({
          data: {
            imageUrl,
            imageHeight,
            imageWidth,
            imageColorHex,
            description,
            title,
            author: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            tags: {
              create: tags.map((tag) => ({
                tag: {
                  connectOrCreate: {
                    where: {
                      name: tag,
                    },
                    create: {
                      name: tag,
                    },
                  },
                },
              })),
            },
          },
        });

        return result;
      }
    ),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.post.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        bookmarks: {
          where: {
            userId: ctx.session?.user.id,
          },
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return result.map((post) => {
      return {
        ...post,
        tags: post.tags.map((tag) => tag.tag.name),
        bookmarks: post.bookmarks[0] ? post.bookmarks[0].user.id : null,
      };
    });
  }),
  getById: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input,
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          author: true,
          bookmarks: {
            where: {
              userId: ctx.session?.user.id,
            },
            include: {
              user: true,
            },
          },
        },
      });

      if (post == null) return null;
      return {
        ...post,
        tags: post.tags.map((tag) => tag.tag.name),
        bookmarks: post.bookmarks[0] ? post.bookmarks[0].user.id : null,
      };
    }),
  getByUserName: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.post.findMany({
        where: {
          author: {
            name: input,
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          bookmarks: {
            where: {
              userId: ctx.session?.user.id,
            },
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return result.map((post) => {
        return {
          ...post,
          tags: post.tags.map((tag) => tag.tag.name),
          bookmarks: post.bookmarks[0] ? post.bookmarks[0].user.id : null,
        };
      });
    }),
  getByUserNameBookmarks: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.bookmark.findMany({
        where: {
          user: {
            name: input,
          },
        },
        include: {
          post: {
            include: {
              tags: {
                include: {
                  tag: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return result
        .map((bookmark) => bookmark.post)
        .map((post) => {
          return {
            ...post,
            tags: post.tags.map((tag) => tag.tag.name),
          };
        });
    }),

  getAllComments: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.comment.findMany({
        where: {
          postId: input,
        },
        include: {
          author: true,
        },
        orderBy: {
          responseId: "asc",
        },
      });

      console.log(result);

      return result;
    }),
  commentCreate: protectedProcedure
    .input(
      z.object({
        post: z.string().min(1),
        content: z.string().min(1),
        response: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const { post, content, response } = input;

      const comment = await ctx.prisma.comment.create({
        data: {
          postId: post,
          authorId: user.id,
          content,
          responseId: response || null,
        },
        include:{
          author: true
        }
      });

      return comment;
    }),
  bookmark: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      const existBookmark = await ctx.prisma.bookmark.findFirst({
        where: {
          postId: input,
          userId: ctx.session.user.id,
        },
      });

      // Error
      if (existBookmark) {
        return existBookmark;
      }

      const bookmark = await ctx.prisma.bookmark.create({
        data: {
          postId: input,
          userId: ctx.session.user.id,
        },
      });

      return bookmark;
    }),
  unBookmark: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.bookmark.deleteMany({
        where: {
          postId: input,
          userId: ctx.session.user.id,
        },
      });

      return result;
    }),
});
