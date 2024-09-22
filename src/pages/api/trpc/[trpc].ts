import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { text } from 'stream/consumers';
import { z } from 'zod';

// Initialize tRPC
const t = initTRPC.create();

//prisma
const prisma = new PrismaClient();

// Create the tRPC router
const appRouter = t.router({
  //api to check if fe and be connects
  hello: t.procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  logToServer: t.procedure
  .input(
    z.object({
      text: z.string(),
    }),
  )
    .mutation((req) =>{
      console.log(`Client Says: ${req.input.text}`)
      return true
    }),
  getAllVideoGames: t.procedure.query(async () =>{
    const videoGames = await prisma.video_games.findMany();
    return videoGames;
  })
});

// Export the type definition of the router
export type AppRouter = typeof appRouter;

// API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});