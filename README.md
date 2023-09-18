<!DOCTYPE html>
<html>

<head>
    <title>Twitter Backend</title>
</head>

<body>
    <h1>Twitter Backend</h1>
    <img src="https://github.com/saad662/twitter-backend/blob/main/twitter-logo.png" alt="Twitter Backend Logo">
    <h2> Overview</h2>
    <p>Welcome to the Twitter Backend project! This Node.js application aims to resemble the backend functionality of the popular social media platform Twitter. It provides essential features for users, tweets, and authentication.</p><h2>Table of Contents</h2>
    <ol>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#configuration">Configuration</a></li>
        <li><a href="#routes">Routes</a></li>
        <li><a href="#middleware">Middleware</a></li>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
    </ol>
    <h2 id="installation">Installation</h2>
    <p>To get started with the Twitter Backend project, follow these steps:</p>
    <ol>
        <li>Clone the repository:</li>
    </ol>
    <pre><code>git clone https://github.com/saad662/twitter-backend.git</code></pre>
    <ol start="2">
        <li>Navigate to the project directory:</li>
    </ol>
    <pre><code>cd twitter-backend</code></pre>
    <ol start="3">
        <li>Install the project dependencies:</li>
    </ol>
    <pre><code>npm install</code></pre><h2 id="usage">Usage</h2>
    <p>To run the Twitter Backend application, use the following command:</p>
    <pre><code>npm run dev</code></pre>
    <p>This command starts the development server using <a href="https://nodemon.io/">nodemon</a> and listens on <code>http://localhost:3000</code>. You can access the application by opening this URL in your web browser or making API requests.</p><h2 id="configuration">Configuration</h2>
    <p>The project includes a <code>config</code> folder where you can configure various settings. Make sure to update these configurations according to your requirements:</p>
    <ul>
        <li><code>config/authConfig.ts</code>: Configure your secret key for JSON Web Tokens (JWT) and other authentication settings.</li>
        <li><code>config/sendgridConfig.ts</code>: Configure your <a href="https://sendgrid.com/">SendGrid</a> API key for sending email notifications.</li>
    </ul><h2 id="routes">Routes</h2>
    <p>The Twitter Backend project includes the following API routes:</p>
    <ul>
        <li><code>/user</code>: User-related endpoints.</li>
        <li><code>/tweet</code>: Tweet-related endpoints.</li>
        <li><code>/auth</code>: Authentication-related endpoints.</li>
    </ul>
    <p>You can find the route definitions in the respective route files located in the <code>routes</code> folder.</p><h2 id="middleware">Middleware</h2>
    <p>The application uses middleware for authentication. The <code>authenticateToken</code> middleware is applied to routes that require authentication. You can find this middleware in the <code>middlewares/authMiddleware.ts</code> file.</p><h2 id="dependencies">Dependencies</h2>
    <p>The project uses several dependencies, which are listed in the <code>package.json</code> file:</p>
    <h3>Production Dependencies:</h3>
    <ul>
        <li><a href="https://www.prisma.io/client">@prisma/client</a>: Prisma Client for database interaction.</li>
        <li><a href="https://github.com/sendgrid/sendgrid-nodejs">@sendgrid/mail</a>: SendGrid library for sending email notifications.</li>
        <li><a href="https://expressjs.com/">express</a>: Web framework for building the API.</li>
        <li><a href="https://github.com/auth0/node-jsonwebtoken">jsonwebtoken</a>: Library for working with JSON Web Tokens (JWT).</li>
    </ul>
    <h3>Development Dependencies:</h3>
    <ul>
        <li><a href="https://www.npmjs.com/package/@types/express">@types/express</a>: Type definitions for Express.</li>
        <li><a href="https://www.npmjs.com/package/@types/jsonwebtoken">@types/jsonwebtoken</a>: Type definitions for JSON Web Tokens.</li>
        <li><a href="https://www.npmjs.com/package/@types/node">@types/node</a>: Type definitions for Node.js.</li>
        <li><a href="https://nodemon.io/">nodemon</a>: Utility for restarting the server during development.</li>
        <li><a href="https://www.prisma.io/">prisma</a>: Prisma CLI for database migrations and management.</li>
        <li><a href="https://github.com/TypeStrong/ts-node">ts-node</a>: TypeScript execution environment.</li>
        <li><a href="https://www.typescriptlang.org/">typescript</a>: TypeScript language support.</li>
    </ul> <h2 id="contributing">Contributing</h2>
    <p>If you'd like to contribute to this project, please follow these guidelines:</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch for your feature or bug fix: <code>git checkout -b feature/your-feature-name</code> or <code>git checkout -b bugfix/your-bug-fix</code>.</li>
        <li>Make your changes and commit them: <code>git commit -m "Your commit message here"</code>.</li>
        <li>Push your changes to your fork: <code>git push origin feature/your-feature-name</code>.</li>
        <li>Open a pull request to the <code>main</code> branch of the original repository.</li>
    </ol><h2 id="license">License</h2>
    <p>This project is licensed under the <a href="https://opensource.org/licenses/ISC">ISC License</a>. See the <a href="https://github.com/saad662/twitter-backend/blob/main/LICENSE">LICENSE</a> file for details.</p><hr><p>Thank you for using Twitter Backend! If you have any questions or encounter any issues, please feel free to <a href="https://github.com/saad662/twitter-backend/issues">open an issue</a>. Happy coding!</p>
</body>

</html>