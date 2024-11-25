# Digital Identity Manager 🛡️

## Project Description
Secure Registration and Login app with role-based access control.

## 🚀 Key Features
- Secure registration and login
- Multi-method authentication
- Role-based access control
- Advanced security protections

## 🛠️ Technologies Used
- Node.js
- Express.js
- Sequelize
- SQLite
- JWT
- Bcrypt
- express-session
- helmet
- csurf

## 📋 Prerequisites
- Node.js (v14 or higher)
- npm

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/arabenitezz/loginAppAuthJS.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file with:
```
PORT=5001
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
NODE_ENV=development
```

4. Start the server
```bash
npm start
```

## 🔒 Security Features
- Password hashing with bcrypt
- JWT authentication
- CSRF protection
- Login attempt limitation
- Role-based access control

## 👥 User Roles
- **User**: Basic access to functionalities
- **Administrator**: Access to advanced functions

## 🧪 Testing
```bash
npm test
```

## 📦 Endpoints

### Authentication
- `POST /api/auth/register`: User registration
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout

### Protected Routes
- `GET /api/users/user`: Access for users
- `GET /api/users/admin`: Access only for administrators

## 🔐 Security Details
- Hashed passwords
- JWT tokens
- XSS protection
- Input validation
- Login attempt limits

## 🚧 Future Improvements
- Password recovery
- Two-factor authentication
- More identity providers integration

## 📝 License
MIT License

## 👥 Contributions
Contributions are welcome. Please read contribution guidelines before submitting a pull request.

---

**Note**: This project was developed as part of a cybersecurity challenge for Penguin Academy. 🐧🚀🔒
```
