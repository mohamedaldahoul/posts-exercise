# Posts Exercise

A responsive post feed application built with React, TypeScript, and Tailwind CSS that fetches data from the [DummyJSON Posts API](https://dummyjson.com/docs/posts). This project demonstrates modern React patterns, infinite scrolling, CRUD operations, and responsive design.

## 🎨 Design Reference

This application was built to match the design specifications from the [Frontend Task – Posts Design](https://www.figma.com/design/ynXV5sipW3kKhCnoRBFtOu/front-end-task-posts?node-id=3-3&t=i7E1dQXd1kjWbFHt-0) Figma file.

## 🚀 Features

### ✅ Core Functionality
- **Infinite Scrolling** - Seamlessly loads posts with pagination
- **Add New Posts** - Modal dialog for creating posts with live preview
- **Edit Posts** - Inline editing with modal form
- **Search Posts** - Real-time search by title and body content
- **Sort Posts** - Sort by title in ascending/descending order
- **Responsive Design** - Optimized for desktop and mobile devices

### ✅ User Experience
- **Modern UI** - Clean, card-based layout with Tailwind CSS
- **Loading States** - Visual feedback during API operations
- **Error Handling** - Graceful error handling for failed requests
- **Debounced Search** - Optimized search performance
- **Duplicate Prevention** - Prevents duplicate posts in the feed

### ✅ Technical Features
- **TypeScript** - Full type safety throughout the application
- **Context API** - Centralized state management
- **Intersection Observer** - Efficient infinite scroll implementation
- **Modular Components** - Reusable and maintainable code structure

## 🛠️ Technologies Used

- **React 18** - Functional components with hooks
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **DummyJSON API** - RESTful API for posts data
- **Intersection Observer API** - Infinite scroll implementation

## 📁 Project Structure

```
src/
├── components/
│   ├── add-post/          # Add post modal component
│   ├── edit-post/         # Edit post modal component
│   ├── form-post/         # Shared form component
│   ├── posts-list/        # Posts list and container
│   ├── search-post/       # Search functionality
│   └── resources/         # API functions
├── hooks/
│   └── PostsContext.tsx   # Global state management
├── App.tsx               # Main application component
└── index.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohamedaldahoul/posts-exercise.git
   cd posts-exercise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎯 Key Components

### PostsList
The main component that displays the posts feed with infinite scrolling, search, and sorting functionality.

### FormPost
A reusable form component used for both adding and editing posts, featuring:
- Title and body input fields
- Tag management
- Form validation
- Loading states

### SearchPost
Real-time search component with debounced API calls to prevent excessive requests.

### AddPost & EditPost
Modal components that utilize the shared FormPost component for consistent user experience.

## 🔧 API Integration

The application integrates with the DummyJSON Posts API:

- **GET** `/posts` - Fetch posts with pagination
- **POST** `/posts/add` - Create new post
- **PUT** `/posts/:id` - Update existing post
- **GET** `/posts/search` - Search posts by query
- **GET** `/posts` with sort parameters - Sort posts

## 🎨 Design Features

- **Card Layout** - Clean, modern post cards with shadows
- **Responsive Grid** - Adapts to different screen sizes
- **Modal Dialogs** - Smooth overlay interactions
- **Loading Indicators** - Visual feedback for async operations
- **Hover Effects** - Interactive elements with smooth transitions

## 🔍 Search & Filtering

- **Real-time Search** - Instant results as you type
- **Debounced API Calls** - Optimized performance
- **Sort Options** - Sort by title (ascending/descending)
- **Search Disabled During Sort** - Prevents conflicts

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Multi-column layout with full features
- **Tablet** - Adaptive grid system
- **Mobile** - Single column layout with touch-friendly interactions


## 🚀 Deployment

Build the production version:
```bash
npm run build
```

The build folder contains the optimized production files ready for deployment.


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mohamed Aldahoul**
- GitHub: [@mohamedaldahoul](https://github.com/mohamedaldahoul)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
