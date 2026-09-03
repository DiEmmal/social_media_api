# Social Media API

A social media API for user authentication, profile management, and future social features.

## Getting Started

1. Clone the repository
2. Install dependencies
3. Configure environment variables, get the `.env.template` file and rename it to `.env`, then fill in the values
4. Configure the database with docker-compose
5. Run the application

## Authentication

### Base route
`/api/auth`

### Endpoints
- `POST /api/auth/register` - Register a new user
For register you need to provide a name, a email and a password
After register you will receive an email validation link, you need to validate your email before using the API

- `POST /api/auth/login` - Log in an existing user
For loggin you need your email and your password
After login you will receive a token that you can use to access the API
