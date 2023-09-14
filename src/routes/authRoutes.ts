import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const EMAIL_TOKEN__EXPIRATION_MINUTES = 10;
const router = Router();
const prisma = new PrismaClient();

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Create user if not exist, generate the emailToken and send it to their email
router.post('/login', async (req, res) => {
    const { email } = req.body;
    const emailToken = generateEmailToken();
    const expiration = new Date(new Date().getTime() + EMAIL_TOKEN__EXPIRATION_MINUTES * 60 * 1000)

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

});




export default router;
