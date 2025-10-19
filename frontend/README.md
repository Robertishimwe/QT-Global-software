# Admin Panel - User Management System

A professional React-based admin panel for user management with advanced features including cryptographic signature verification, Protobuf data decoding, and analytics visualization.

## 🌟 Features

### 1. **Cryptographic User Verification**
- Fetches user data from the backend with cryptographic signatures
- Verifies each user's email signature using SHA-384 hashing
- Uses Web Crypto API for secure signature verification
- Only displays users with valid signatures

### 2. **Protobuf Data Decoding**
- Retrieves binary Protobuf-encoded user data
- Decodes using the predefined `user.proto` schema
- Efficient data serialization and deserialization
- Displays decoded user information in a clean table format

### 3. **User Analytics Dashboard**
- Visualizes user creation statistics for the last 7 days
- Interactive bar chart using Chart.js
- Shows total users and average per day metrics
- Real-time data fetching from the backend

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8000`

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will open at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── VerifiedUserList.tsx     # Crypto-verified users table
│   ├── ProtobufUserList.tsx     # Protobuf decoded users table
│   └── UserCreationChart.tsx    # Analytics chart component
├── services/
│   └── api.ts                   # API client with Axios
├── config/
│   └── api.ts                   # API configuration (base URL)
├── utils/
│   ├── crypto.ts                # Cryptographic verification utilities
│   └── protobuf.ts              # Protobuf decoding utilities
├── proto/
│   └── user.proto               # Protobuf schema definition
└── pages/
    └── Index.tsx                # Main application page
```

## 🔌 Backend API Endpoints

The application expects the following endpoints on `http://localhost:8000`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Returns JSON array of users with crypto signatures |
| GET | `/users/export` | Returns binary Protobuf-encoded user data |
| GET | `/users/stats/creations-by-day` | Returns user creation statistics (last 7 days) |
| POST | `/users` | Create a new user (optional) |
| DELETE | `/users/:id` | Delete a user (optional) |
| PATCH | `/users/:id` | Update a user (optional) |

### Configuring API Base URL

The API base URL is configured in `src/config/api.ts`. To change it:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000', // Change this to your backend URL
  // ...
}
```

## 🛠️ Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **Chart.js** & react-chartjs-2 - Data visualization
- **Protobuf.js** - Protocol Buffers implementation
- **Web Crypto API** - Cryptographic operations
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI components
- **Vite** - Build tool

## 🔐 Cryptographic Verification Process

The crypto verification feature performs the following steps:

1. **Hash Generation**: SHA-384 hash of the user's email
2. **Public Key Import**: Imports the PEM-formatted public key
3. **Signature Verification**: Verifies the hex-encoded signature matches the hash
4. **Filtering**: Only displays users with valid signatures

## 📦 Protobuf Schema

The application uses the following Protobuf schema (`user.proto`):

```protobuf
syntax = "proto3";

package userpackage;

message User {
  string id = 1;
  string email = 2;
  string role = 3;
  string status = 4;
  string createdAt = 5;
}

message UserList {
  repeated User users = 1;
}
```

## 📊 Analytics Features

- **Last 7 Days**: Displays user creation trends
- **Total Count**: Shows total users created in the period
- **Average**: Calculates average users per day
- **Interactive Chart**: Hover for detailed daily statistics

## 🎨 Design System

The application features a professional admin panel design with:

- Modern blue-based color scheme
- Smooth transitions and animations
- Responsive layout
- Dark sidebar navigation
- Card-based content sections
- Clean typography and spacing

## 🚨 Error Handling

The application includes comprehensive error handling:

- Network request failures
- Cryptographic verification errors
- Protobuf decoding errors
- User-friendly toast notifications

## 📝 Development Notes

### Key Features

1. **Centralized API Configuration**: All API calls use a single base URL configuration
2. **Type Safety**: Full TypeScript support throughout the application
3. **Modular Components**: Each feature is isolated in its own component
4. **Service Layer**: API logic separated from UI components
5. **Utility Functions**: Reusable crypto and protobuf utilities

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🤝 Contributing

This project follows best practices for React development:

- Component-based architecture
- TypeScript for type safety
- Centralized state management
- Clean code organization
- Comprehensive error handling

## 📄 License

This project is part of a user management system demonstration.

## 🆘 Troubleshooting

### Backend Connection Issues

If you see "Failed to load users" errors:

1. Ensure the backend server is running on `http://localhost:8000`
2. Check CORS settings on the backend
3. Verify the API endpoints are accessible

### Protobuf Decoding Errors

If Protobuf decoding fails:

1. Ensure the backend returns proper binary data with `Content-Type: application/x-protobuf`
2. Verify the proto schema matches the backend implementation

### Crypto Verification Issues

If no users appear in the verified list:

1. Check that users have valid `signature` and `publicKey` fields
2. Verify the signature format is hex-encoded
3. Ensure the public key is in PEM format

---
