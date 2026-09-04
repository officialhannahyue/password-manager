# Password Manager

A modern full-stack password manager built with Next.js, TypeScript, Prisma, and PostgreSQL. It provides a secure vault for storing and managing credentials, with encrypted password storage, session-based authentication, password generation, favorites, trash management, and rate limiting.

> **Demo Mode:** Explore the application without creating an account. Use the **Try Demo Mode** option on the login page to access a pre-configured demo account with sample credentials.

## Getting Started

Follow the steps below to run the project locally.

### Prerequisites

Make sure you have the following installed:

* Node.js 20+
* npm
* PostgreSQL
* An Upstash Redis database

### 1. Clone the repository

```bash
git clone https://github.com/your-username/password-manager.git
cd password-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="your-postgresql-database-url"

SESSION_SECRET="your-session-secret"

ENCRYPTION_KEY="your-encryption-key"

UPSTASH_REDIS_REST_URL="your-upstash-redis-url"

UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"
```

Never commit your `.env` file or expose these values publicly.

### 4. Set up the database

Run the Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

### 5. Seed the database

The project includes seed data for the demo account.

```bash
npx prisma db seed
```

### 6. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

You can then:

* Create a new account
* Log in with an existing account
* Use **Try Demo Mode** to explore the application without signing up

### Available Scripts

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `npm run dev`       | Start the development server |
| `npm run build`     | Create a production build    |
| `npm run start`     | Start the production server  |
| `npm run lint`      | Run ESLint                   |
| `npx prisma studio` | Open Prisma Studio           |

## Features

### Authentication

* Sign up and login
* Secure password hashing with bcrypt
* Session-based authentication
* Session expiration
* Secure logout
* Protected dashboard routes
* Rate limiting

### Credential Vault

* Add and store credentials
* Encrypted password storage
* Reveal passwords when needed
* Search credentials
* Service icons
* Last updated information
* Favorite credentials

### Favorites

* Mark credentials as favorites
* Quickly access frequently used credentials

### Trash

* Move credentials to trash
* Restore credentials
* Permanently delete credentials

### Password Generator

* Generate secure passwords
* Customize password length
* Configure character types

### Demo Mode

A dedicated demo account allows visitors to explore the application without creating an account.

Demo users can:

* Browse credentials
* Search the vault
* Reveal passwords
* Favorite credentials
* Move credentials to trash
* Restore credentials

Demo users cannot:

* Add credentials
* Permanently delete credentials
* Modify protected settings

## Tech Stack

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| Next.js       | Full-stack React framework |
| TypeScript    | Type-safe development      |
| Prisma        | Database ORM               |
| PostgreSQL    | Relational database        |
| Tailwind CSS  | Styling                    |
| shadcn/ui     | UI components              |
| Tabler Icons  | Interface icons            |
| bcrypt        | Password hashing           |
| Upstash Redis | Rate limiting              |

## Security

Security is an important part of the project.

### User Passwords

User account passwords are hashed using bcrypt.

### Vault Passwords

Passwords stored in the vault are encrypted because they need to be decrypted when the user chooses to reveal them.

### Additional Protections

* Session-based authentication
* Protected server-side actions
* User-scoped database queries
* Demo account restrictions
* Rate limiting
* Server-side authorization checks
* No plaintext vault passwords

## Architecture

```text
                    Next.js Application
                           |
                           |
                    Server / API Layer
                           |
             +-------------+-------------+
             |                           |
             v                           v
        PostgreSQL                  Upstash Redis
         Database                  Rate Limiting
```
