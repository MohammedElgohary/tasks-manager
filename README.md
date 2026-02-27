# Task Manager Application

A modern, feature-rich task management application built with cutting-edge web technologies. Manage your tasks efficiently with an intuitive interface, powerful features, and full offline support.

## Features

### 🎯 Task Management

Create, edit, and delete tasks with comprehensive details including title, description, priority levels, status tracking, and due dates.

### 🎨 Drag & Drop Interface

Intuitive drag-and-drop functionality to move tasks between status columns:

- On Hold
- Pending
- In Progress
- Completed

### ⚡ Priority Levels

Organize and prioritize your tasks effectively:

- Low
- Medium
- High
- Critical

### 📊 Analytics Dashboard

Track your productivity with comprehensive analytics:

- Task completion rates
- Status distribution
- Priority breakdown
- Overdue task tracking

### 🌍 Internationalization (i18n)

Full support for multiple languages with RTL layout:

- English
- Arabic (with RTL support)

### 🎨 Theming & Customization

Personalize your experience:

- Light and Dark themes
- Customizable primary color

### 💾 Local Storage

All data is stored locally in your browser - no server required. Your tasks are always available offline.

### 📥 Import/Export

Seamlessly manage your task data:

- Export tasks to JSON format
- Import tasks with comprehensive validation
- Merge or Replace modes for importing
- Download template for easy task creation

### 🔍 Advanced Filters

Find tasks quickly with powerful filtering:

- Search by keywords
- Filter by status
- Filter by priority
- Filter overdue tasks
- URL persistence for shareable filtered views

### 🎓 Interactive Tour

Built-in guided tour to help new users get started quickly.

## Technologies

### Core

- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### UI & Styling

- **Ant Design** - Professional, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework

### State Management & Routing

- **Zustand** - Lightweight, performant global state with persistence
- **React Router v7** - Seamless navigation

### Drag & Drop

- **React DnD** - Flexible drag-and-drop with multi-backend support
- Desktop and mobile device support

### Internationalization

- **i18next** - Powerful internationalization framework
- **react-i18next** - React integration
- **Day.js** - Date formatting with locale support

## Architecture Highlights

### State Management

Zustand provides lightweight, performant global state management with built-in persistence to localStorage.

### Routing

React Router v7 enables seamless navigation between pages with URL-based filtering support.

### UI Components

Ant Design delivers professional, accessible components while Tailwind CSS allows for custom styling and rapid development.

### Drag & Drop

React DnD with multi-backend support ensures smooth drag-and-drop experience on both desktop and mobile devices.

### Data Validation

Comprehensive validation system for task imports with detailed error reporting to ensure data integrity.

## Project Structure

```
src/
├── assets/          # Static assets (fonts, icons)
├── components/      # Reusable React components
│   ├── general/     # General-purpose components
│   ├── settings/    # Settings-related components
│   └── tasks/       # Task-specific components
├── database/        # Local storage management
├── hooks/           # Custom React hooks
├── models/          # TypeScript interfaces and types
├── network/         # API/data layer
├── pages/           # Page components
│   ├── about/       # About page
│   ├── analytics/   # Analytics dashboard
│   └── tasks-list/  # Main tasks list page
├── routes/          # Route configuration
├── stores/          # Zustand state stores
└── utils/           # Utility functions

public/
└── locales/         # Translation files
    ├── en/          # English translations
    └── ar/          # Arabic translations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd todo-list

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Type check and build for production
npm run build
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Usage

### Creating Tasks

1. Click the "New Task" button
2. Fill in task details (title, description, priority, status, due date)
3. Click "Create Task"

### Managing Tasks

- **Edit**: Click on a task to view details and edit
- **Delete**: Use the delete option in task actions
- **Change Status**: Drag and drop tasks between columns

### Filtering Tasks

Use the filter bar to:

- Search by keywords
- Filter by status
- Filter by priority
- Show only overdue tasks

### Import/Export

- **Export**: Click Actions → Export to download all tasks as JSON
- **Import**: Click Actions → Import to upload tasks from JSON file
- **Template**: Download a template file to see the expected format

### Settings

Access settings to customize:

- Theme (Light/Dark)
- Language (English/Arabic)
- Primary Color

## Browser Support

Modern browsers with ES6+ support:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and not licensed for public use.

## Contributing

This is a private project. Contributions are not currently accepted.
