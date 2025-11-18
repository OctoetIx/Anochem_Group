This project is a TypeScript-based backend built with ExpressJS, designed for high performance, scalability, and secure admin management. It uses MongoDB to store admin accounts and product details, while Redis provides fast in-memory caching to optimize response times and reduce database load.

Product images are uploaded and managed via Cloudinary, and served efficiently through its integrated CDN.
Authentication is handled with JWT access tokens and secure refresh tokens to maintain admin sessions.

Deployment is fully automated using a CI/CD pipeline, which builds, tests, and deploys the application seamlessly on every push to the main branch.