const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('SG.WjNHjpKqRAmTK69QQFQPHA.aocIfPYofiHBMnBPx')
// Key cannot be uploaded publicaly generate new from sendGrid

export async function sendEmailToken(email: string, token: string) {
    const msg = {
        to: email,
        from: 'saadamin662@gmail.com', // Change to your verified sender
        subject: 'Your Email Token',
        text: `Your token is: ${token}`,
        html: `<p>Your token is: <strong>${token}</strong></p>`,
    };
    try {
        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

//sendEmailToken('dianekap220@gmail.com', '42233');
//npx ts-node src/services/emailService.ts