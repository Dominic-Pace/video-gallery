# YouTube Gallery

This project is a YouTube Gallery application that allows users to view and manage a collection of YouTube videos.

## Technologies Used

### Frontend
- React
- TypeScript
- Redux Toolkit
- Ant Design
- React Hook Form
- Zod

### Backend
- TypeScript
- NestJS
- TypeORM
- MySQL

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the repository to your local machine.

2. Copy the `.env.example` file in both the frontend and backend directories to `.env`:
   ```
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```
   Fill in the necessary environment variables in both `.env` files.

3. Ensure you have MySQL running locally on your machine.

4. Set up and run the backend:
   ```
   cd backend
   npm install
   npm run start:dev
   ```

5. In a new terminal, set up and run the frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

6. The application should now be running. Access the frontend through your web browser, typically at `http://localhost:3000`.

## Features

- View a gallery of YouTube videos
- Add new videos to the gallery
- View individual video details and watch in the app.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
