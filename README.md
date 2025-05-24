# CMB R3 assignment

## Installation

Clone the repository
```bash
git clone git@github.com:schmeekygeek/assignment-cmb.git
cd assignment-cmb
```

## Running the backend
```bash
cd backend/
yarn # install dependencies
```
Create a `.env` file and add these contents:
```
MONGODB_USERNAME="root"
MONGODB_PASSWORD="root"
SECRET_KEY="supersecretkey"
```
Run the database locally
```
docker compose up -d
```
Start the server
```
yarn dev
```

## Running the web app
In a different terminal window,
```bash
cd frontend/
yarn # install dependencies
yarn dev # run the server
```

## Features & Notes
- Secure authentication using `httpOnly` cookies
- Used `shadcn/ui`,`tailwind`,`vite` on the frontend
- Used `express`,`mongodb` on the backend
- Basic responsive layout
