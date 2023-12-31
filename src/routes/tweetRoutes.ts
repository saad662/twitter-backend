import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//Create Tweet
router.post('/', async (req, res) => {
    const { content, image } = req.body;
    // @ts-ignore
    const user = req.user;
  
    try {
      const result = await prisma.tweet.create({
        data: {
          content,
          image,
          userId: user.id,
        },
        include: { user: true },
      });
  
      res.json(result);
    } catch (e) {
      res.status(400).json({ error: 'Username and email should be unique' });
    }
  });


//list Tweet
router.get('/', async (req, res) => {
    const allTweet = await prisma.tweet.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                },
            },
        },
    });
    res.json(allTweet);
});

//get one Tweet
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const tweet = await prisma.tweet.findUnique({
        where: { id: Number(id) },
        include: { user: true }
    });
    if (!tweet) {
        return res.status(404).json({ error: "Tweet not found" });
    }
    res.json(tweet);
});

//update one Tweet
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content, image } = req.body;
    try {
        const result = await prisma.tweet.update({
            where: { id: Number(id) },
            data: { content, image }
        })
        res.json(result);
    } catch (e: any) {
        console.error(e);
        res.status(400).json({ error: `Failed to update tweet: ${e?.message || 'Unknown error'}` });
    }
});


//delete one Tweet
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.tweet.delete({
            where: { id: Number(id) },
        });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;