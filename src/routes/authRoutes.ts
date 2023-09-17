import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const EMAIL_TOKEN__EXPIRATION_MINUTES = 10;
const ATHENTICATION_EXPIRATION_HOURS = 12;
const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = "Secret"  //

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateAuthToken(tokenId: number) : string {
    const jwtPayload = { tokenId };
    return jwt.sign(jwtPayload, JWT_SECRET, {
        algorithm: 'HS256'
    })
}

// Create user if not exist, generate the emailToken and send it to their email
router.post('/login', async (req, res) => {
    const { email } = req.body;
    const emailToken = generateEmailToken();
    const expiration = new Date(
        new Date().getTime() + EMAIL_TOKEN__EXPIRATION_MINUTES * 60 * 1000
    );

    try {
        const createdToken = await prisma.token.create({
            data: {
                type: "EMAIL",
                emailToken,
                expiration,
                user: {
                    connectOrCreate: {
                        where: { email },
                        create: { email }
                    },
                },
            },
        });

        //console.log(createdToken);

        // send emailToken to user's email




        res.sendStatus(200);
    } catch (e) {
        res.status(400).json({ error: "Could not start the authentication process or same token generated" });
    }

});


// Validate the emailToken and generate a long lived JWT token
router.post('/authenticate', async (req, res) => {
    const { email, emailToken } = req.body;
    //console.log(email, emailToken);

    const dbEmailToken = await prisma.token.findUnique({
        where: {
            emailToken,
        },
        include: {
            user: true
        }
    });

    //console.log(dbEmailToken);
    if (!dbEmailToken || !dbEmailToken.valid) {
        return res.sendStatus(401);
    }

    if (dbEmailToken.expiration < new Date()) {
        return res.status(401).json({ error: 'Token Expired!' });
    }

    if (dbEmailToken.user.email !== email) {
        return res.sendStatus(401);
    }

    // validate that the user is the owner of the email 

    // generate an API token
    const expiration = new Date(
        new Date().getTime() + ATHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
    );
    const apiToken = await prisma.token.create({
        data: {
            type: "API",
            expiration,
            user: {
                connect: {
                    email,
                },
            },
        },
    });

    // Invalidate email token now
    await prisma.token.update({
        where:{
            id: dbEmailToken.id
        },
        data:{
            valid: false
        }

    })


    // Generate JWT token

    res.sendStatus(200);
});




export default router;
