# 📢 Announcements Management System

A full-stack web application for managing announcements with a modern, user-friendly interface. Built with Node.js, React, TypeScript, and PostgreSQL.

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete announcements
- **Category Management**: Organize announcements with categories (minimum 1 required)
- **Advanced Search**: Unified search across titles, dates, and content
- **Sorting**: Sort by title, publication date, and last update
- **Responsive Design**: Modern Bootstrap UI with mobile support
- **Real-time Validation**: Frontend and backend validation
- **Interactive UI**: Smooth animations and hover effects
- **Left Sidebar Navigation**: City header with announcements counter
- **Custom Publication Dates**: Set custom publication dates for announcements
- **Category Validation**: Enforce at least one category per announcement

## 🏗️ Architecture

### Backend
- **Framework**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Port**: `http://localhost:3000`
- **API**: RESTful endpoints

### Frontend
- **Framework**: React + TypeScript + Vite
- **UI Library**: Bootstrap 5 + Bootstrap Icons
- **Port**: `http://localhost:5173` or `http://localhost:5174`
- **HTTP Client**: Axios

## 📁 Project Structure

```
announcements-project/
├── announcements-backend/          # Backend API
│   ├── src/
│   │   ├── controllers/           # Request handlers
│   │   ├── services/              # Business logic
│   │   ├── routes/                # API routes
│   │   ├── validators/            # Input validation
│   │   └── utils/                 # Helper functions
│   ├── prisma/                    # Database schema & migrations
│   └── docker-compose.yml         # Database setup
├── announcements-frontend/         # Frontend React app
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── services/              # API calls
│   │   └── types/                 # TypeScript interfaces
│   └── public/                    # Static assets
└── README.md
```

## 🗄️ Database Schema

### Announcements Table
```sql
- id (Primary Key, Auto-increment)
- title (String, Required)
- content (Text)
- publicationDate (DateTime)
- lastUpdate (DateTime, Auto-updated)
- linkSlug (String, Auto-generated from title)
```

### Categories Table
```sql
- id (Primary Key, Auto-increment)
- name (String, Unique)
```

### Many-to-Many Relationship
- `Announcement` ↔ `Category` (via junction table)

## 🔧 API Endpoints

### Announcements
```
GET    /api/announcements          # Get all announcements
GET    /api/announcements/:id      # Get single announcement
POST   /api/announcements          # Create announcement
PUT    /api/announcements/:id      # Update announcement
DELETE /api/announcements/:id      # Delete announcement
```

### Categories
```
GET    /api/categories             # Get all categories
POST   /api/categories             # Create category
PUT    /api/categories/:id         # Update category
DELETE /api/categories/:id         # Delete category
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Docker (for PostgreSQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd announcements-project
   ```

2. **Setup Backend**
   ```bash
   cd announcements-backend
   npm install
   ```

3. **Setup Database**
   ```bash
   # Start PostgreSQL with Docker
   docker-compose up -d
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed the database with sample data
   npx prisma db seed
   ```

4. **Start Backend Server**
   ```bash
   npm run dev
   # Server will run on http://localhost:3000
   ```

5. **Setup Frontend**
   ```bash
   cd ../announcements-frontend
   npm install
   ```

6. **Start Frontend Development Server**
   ```bash
   npm run dev
   # App will run on http://localhost:5173
   ```

## 🎨 User Interface

### Main Features
- **Left Sidebar**: City header with announcements counter
- **Announcements List**: Sortable table with search functionality
- **Create/Edit Form**: Comprehensive form with validation
- **Category Management**: Multi-select category picker
- **Responsive Design**: Works on desktop and mobile devices

### Key Components
- `LeftSidebar`: City header with gradient icon, announcements counter, and navigation menu
- `AnnouncementList`: Main table with search, sort, and inline category editing
- `AnnouncementForm`: Create/edit announcements with custom publication dates
- `CategorySelect`: Multi-select category picker with Bootstrap styling
- `AnnouncementDetails`: Detailed view with full announcement information

## 🔍 Usage

### Creating Announcements
1. Click "New Announcement" or the yellow announcements card in the left sidebar
2. Fill in required fields:
   - **Title** (required): Announcement title
   - **Content** (required): Full announcement content
   - **Published Date** (required): Custom publication date and time
   - **Categories** (at least one required): Select from available categories
3. Click "Save" to create the announcement

### Managing Announcements
- **Search**: Use the unified search bar to filter by title, published date, or updated date
- **Sort**: Click column headers to sort by title, published date, or updated date
- **Edit**: Click the pencil icon to edit an announcement
- **Delete**: Click the trash icon to delete an announcement
- **View**: Click the eye icon to view announcement details
- **Category Management**: Edit categories directly in the table view

### Left Sidebar Features
- **City Header**: Displays city name with custom gradient icon
- **Announcements Counter**: Shows total number of announcements
- **Quick Actions**: Direct access to create new announcements
- **Navigation Menu**: Additional menu items for future features

### Category Management
- **Required Field**: At least one category must be selected for each announcement
- **Multi-select**: Choose multiple categories when creating/editing
- **Inline Editing**: Edit categories directly in the announcements table
- **API Management**: Categories can be managed through the REST API

## 🛠️ Development

### Backend Development
```bash
cd announcements-backend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Frontend Development
```bash
cd announcements-frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Database Management
```bash
# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate

# View database in Prisma Studio
npx prisma studio
```

## 🧪 Testing

### Backend Testing
```bash
cd announcements-backend
npm test             # Run backend tests
```

### Frontend Testing
```bash
cd announcements-frontend
npm test             # Run frontend tests
```

## 📦 Dependencies

### Backend
- `express`: Web framework
- `prisma`: Database ORM
- `cors`: Cross-origin resource sharing
- `typescript`: Type safety

### Frontend
- `react`: UI library
- `bootstrap`: CSS framework
- `axios`: HTTP client
- `react-select`: Multi-select component
- `vite`: Build tool

## 🛠️ Technical Features

### Frontend Architecture
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety across the application
- **Vite**: Fast build tool and development server
- **Bootstrap 5**: Modern CSS framework with custom components
- **Axios**: HTTP client with interceptors and error handling

### Backend Architecture
- **Node.js + Express**: RESTful API server
- **Prisma ORM**: Type-safe database operations
- **PostgreSQL**: Relational database with migrations
- **Docker**: Containerized database setup
- **TypeScript**: End-to-end type safety

### UI/UX Features
- **Left Sidebar**: City header with gradient icon and navigation
- **Responsive Design**: Mobile-first approach with Bootstrap
- **Search & Sort**: Unified search with multi-column sorting
- **Form Validation**: Real-time validation with user feedback
- **Interactive Elements**: Hover effects and smooth animations
- **Category Management**: Inline editing with multi-select

### Data Validation
- **Frontend Validation**: Real-time form validation
- **Backend Validation**: Server-side data validation
- **Required Fields**: Title, content, publication date, and categories
- **Type Safety**: TypeScript interfaces for all data structures

## 🔒 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/announcements"
PORT=3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set environment variables
3. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to a static hosting service (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed description
3. Contact the development team

## 🔮 Future Enhancements

- **User Authentication**: Login system with roles and permissions
- **File Upload Support**: Attach images and documents to announcements
- **Email Notifications**: Automated notifications for new announcements
- **Advanced Filtering**: Date ranges, category filters, and status filters
- **API Documentation**: Swagger/OpenAPI documentation
- **Mobile App**: React Native mobile application
- **Real-time Updates**: WebSocket integration for live updates
- **Analytics Dashboard**: Statistics and insights for announcements
- **Bulk Operations**: Mass edit and delete functionality
- **Export Features**: PDF and Excel export capabilities

---

**Built with ❤️ using modern web technologies**