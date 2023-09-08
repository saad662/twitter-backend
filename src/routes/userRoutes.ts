import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//Create User
router.post('/', async (req, res) => {
    const { email, name, username } = req.body;
    try {
        const result = await prisma.user.create({
            data: {
                email,
                name,
                username,
                bio: "Hello World",
            }
        });
        res.json(result);
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            const errorMessage = error.message as string;
            if (errorMessage.includes('Unique constraint failed on the')) {
                if (errorMessage.includes('email')) {
                    res.status(400).json({ error: 'Email is already in use.' });
                } else if (errorMessage.includes('username')) {
                    res.status(400).json({ error: 'Username is already in use.' });
                }
            } else {
                res.status(400).json({ error: 'An error occurred while creating the user.' });
            }
        } else {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
});


//list User
router.get('/', async (req, res) => {
    const allUser = await prisma.user.findMany({
        // select: { 
        //     id: true, 
        //     name: true, 
        //     username: true,
        //     image: true,
        // }
    });
    res.json(allUser);
});


//get one User
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ 
        where: { id: Number(id) },
        include: { tweets: true}, 
    })
    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
});


//update one User
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { bio, name, image } = req.body;
    try {
        const result = await prisma.user.update({
            where: { id: Number(id) },
            data: { bio, name, image }
        })
        res.json(result);
    } catch (e: any) { 
        console.error(e); 
        res.status(400).json({ error: `Failed to update user: ${e?.message || 'Unknown error'}` });
    }
});


//delete one User
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        res.sendStatus(204); 
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});


export default router;