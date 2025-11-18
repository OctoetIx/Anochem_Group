A high-performance backend API built with TypeScript and ExpressJS, designed for scalability, security, and efficient admin management.
The service uses MongoDB as the primary database, Redis for caching, and Cloudinary for optimized product image storage.

Features

⚡ High-Performance API
	•	Built with ExpressJS and TypeScript for maintainability and speed
	•	Layered architecture (controllers, services, models)

🗄️ MongoDB Database
	•	Stores admin accounts and product information
	•	Mongoose used for schema management and validation

⚡ Redis Caching
	•	In-memory key–value store for fast product lookups
	•	Reduces load on MongoDB and improves response times

🖼️ Cloudinary Image Management
	•	Handles upload, transformation, and optimization of product images
	•	Global CDN for fast and reliable image delivery

🔒 Secure Authentication
	•	JWT access tokens for protected routes
	•	Refresh tokens for secure and persistent admin sessions
	•	Role-based admin authorization

 Fully Automated CI/CD
	•	GitHub Actions pipeline
	•	Builds, tests, and deploys automatically on each push to the main branch
	•	Ensures consistent and reliable deployments with zero manual step