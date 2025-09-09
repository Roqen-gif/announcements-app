# Announcements Management System

A full-stack web application for managing announcements with categories, built with React, Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete announcements
- **Category Management**: Assign multiple categories to announcements
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Real-time Updates**: Live category updates without page refresh
- **Error Handling**: Comprehensive error handling and user feedback
- **Type Safety**: Full TypeScript support for both frontend and backend

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **Prisma** as ORM
- **PostgreSQL** database
- **Docker** for database containerization
- **CORS** enabled for frontend communication

### Frontend
- **React 19** with **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Select** for multi-select categories
- **Axios** for API communication

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NodeJS_Project
```

### 2. Start the Database
```bash
cd announcements-backend
docker-compose up -d
```

### 3. Set Up Backend
```bash
cd announcements-backend

# Install dependencies
npm install

# Set up environment variables
echo DATABASE_URL="postgresql://postgres:postgres@localhost:5432/announcements_db" > .env
echo PORT=3000 >> .env

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed the database
npm run seed

# Start the backend server
npm run dev
```

### 4. Set Up Frontend
```bash
cd announcements-frontend

# Install dependencies
npm install

# Set up environment variables
echo VITE_API_URL=http://localhost:3000 > .env

# Start the frontend development server
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Database Admin (pgAdmin)**: http://localhost:5050
  - Email: admin@admin.com
  - Password: admin

## 📁 Project Structure

```
NodeJS_Project/
├── announcements-backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── validators/      # Input validation
│   │   ├── utils/           # Utility functions
│   │   ├── app.ts           # Express app configuration
│   │   ├── server.ts        # Server startup
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   ├── migrations/      # Database migrations
│   │   └── seed.ts          # Database seeding
│   ├── docker-compose.yml   # Database services
│   └── package.json
├── announcements-frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   └── package.json
└── README.md
```

## 🗄️ Database Schema

### Announcements Table
- `id`: Primary key (auto-increment)
- `title`: Announcement title
- `content`: Announcement content
- `publicationDate`: Publication date
- `lastUpdate`: Last update timestamp
- `linkSlug`: URL-friendly slug

### Categories Table
- `id`: Primary key (auto-increment)
- `name`: Category name (unique)

### Many-to-Many Relationship
- Announcements can have multiple categories
- Categories can be assigned to multiple announcements

## 🔧 API Endpoints

### Announcements
- `GET /announcements` - Get all announcements
- `GET /announcements/:id` - Get announcement by ID
- `POST /announcements` - Create new announcement
- `PUT /announcements/:id` - Update announcement
- `PATCH /announcements/:id` - Update announcement categories
- `DELETE /announcements/:id` - Delete announcement

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

## 🎨 Frontend Features

### Announcement List
- View all announcements in a table format
- Real-time category updates
- Search and filter capabilities
- Responsive design

### Announcement Form
- Create new announcements
- Edit existing announcements
- Multi-select category assignment
- Form validation and error handling

### Announcement Details
- View full announcement content
- Display categories as tags
- Edit and delete actions
- Publication and update dates

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure Docker is running
   - Check if PostgreSQL container is up: `docker ps`
   - Verify DATABASE_URL in .env file

2. **CORS Errors**
   - Ensure backend is running on port 3000
   - Check CORS configuration in app.ts
   - Verify frontend is running on port 5173

3. **Prisma Client Not Generated**
   - Run `npx prisma generate`
   - Ensure database is accessible

4. **Frontend Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run lint`

### Development Commands

```bash
# Backend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Database
npx prisma migrate dev    # Run migrations
npx prisma generate       # Generate Prisma client
npx prisma studio         # Open Prisma Studio
npm run seed              # Seed database
```

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/announcements_db"
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Review the console logs for errors
3. Ensure all services are running correctly
4. Create an issue in the repository

---

**Happy coding! 🎉**
