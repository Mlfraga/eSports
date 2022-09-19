import express, {Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';
import convertHourStringToMinute from './utils/convert-hour-string-to-minute';
import convertMinutesToHourString from './utils/convert-minutes-to-hour-string';
import cors from 'cors';
import { z, getErrorMap } from "zod";

const app = express();

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient(); 

app.get('/games', async (request: Request, response: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count:{
        select: {
          ads: true
        }
      }
    },
  });

  return response.json(games);
});

app.get('/games/:id/ads', async (request: Request, response: Response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return response.json(ads.map(ad => ({
    ...ad,
    hoursStart: convertMinutesToHourString(Number(ad.hoursStart)),
    hoursEnd: convertMinutesToHourString(Number(ad.hoursEnd)),
    weekDays: ad.weekDays.split(','),
  })));
});

app.post('/games/:id/ads', async(request: Request, response: Response) => {
  const { 
    name, 
    yearsPlaying, 
    discord, 
    weekDays, 
    hoursStart, 
    hoursEnd, 
    useVoiceChannel
  } = request.body;
  const gameId = request.params.id;
  
  try {
    const Game = z.object({
      name: z.string(),
      yearsPlaying: z.number(),
      discord: z.string(),
      weekDays: z.array(z.number()),
      hoursStart: z.string(),
      hoursEnd: z.string(),
      useVoiceChannel: z.boolean(),
      gameId: z.string().uuid(),
    });
    
    Game.parse({
      name,
      yearsPlaying,
      discord,
      weekDays,
      hoursStart,
      hoursEnd,
      useVoiceChannel,
      gameId,
    });
  }catch(error){
    if(error instanceof z.ZodError){
      return response.status(400).json(error.errors);
    }
  };

  const newGameAd = {
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays: weekDays.join(','),
    hoursStart: convertHourStringToMinute(hoursStart),
    hoursEnd: convertHourStringToMinute(hoursEnd),
    useVoiceChannel
  };

  const ad = await prisma.ad.create({
    data: newGameAd
  });

  return response.status(201).json(ad);
});

app.get('/ads/:id/discord', async (request: Request, response: Response) => {
  const id = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id
    }
  });

  return response.json(ad);
});

app.listen(3333, () => {
  console.log('server running on 3333 port 🚀');
});