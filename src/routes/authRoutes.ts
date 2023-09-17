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

function generateAuthToken(tokenId: number): string {
    const jwtPayload = { tokenId };

    return jwt.sign(jwtPayload, JWT_SECRET, {
        algorithm: 'HS256',
        noTimestamp: true,
    });
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


// Authentication route
router.post('/authenticate', async (req, res) => {
    const { email, emailToken } = req.body;
    //console.log(email, emailToken);

    // Query the database to find the email token
    const dbEmailToken = await prisma.token.findUnique({
        where: {
            emailToken,
        },
        include: {
            user: true
        }
    });

    //console.log(dbEmailToken);
    // If the email token doesn't exist or is not valid, return a 401 Unauthorized response
    if (!dbEmailToken || !dbEmailToken.valid) {
        return res.sendStatus(401);
    }

    // Check if the email token has expired
    if (dbEmailToken.expiration < new Date()) {
        return res.status(401).json({ error: 'Token Expired!' });
    }

    // Ensure that the email associated with the token matches the provided email
    if (dbEmailToken.user.email !== email) {
        return res.sendStatus(401);
    }

    // Generate an API token with a specific expiration date
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

    // Mark the email token as invalid
    await prisma.token.update({
        where: {
            id: dbEmailToken.id
        },
        data: {
            valid: false
        }

    })

    // Generate a JWT token using the API token's ID
    const authToken = generateAuthToken(apiToken.id);
    console.log(authToken);
    res.sendStatus(200);
});




export default router;
