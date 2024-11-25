# Gestor de Identidad Digital 🛡️

## Descripción del Proyecto
Aplicación de Registro y Login con control de roles.

## 🚀 Características Principales
- Registro e inicio de sesión seguro
- Autenticación con múltiples métodos
- Control de acceso basado en roles
- Protección contra vulnerabilidades de seguridad

## 🛠️ Tecnologías Utilizadas
- Node.js
- Express.js
- Sequelize
- SQLite
- JWT
- Bcrypt
- express-session
- helmet
- csurf

## 📋 Requisitos Previos
- Node.js (v14 o superior)
- npm

## 🔧 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/arabenitezz/loginAppAuthJS.git
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
Crear un archivo `.env` con:
```
PORT=5001
JWT_SECRET=tu_secreto_jwt
SESSION_SECRET=tu_secreto_de_sesion
NODE_ENV=development
```

4. Iniciar el servidor
```bash
npm start
```

## 🔒 Características de Seguridad
- Hashing de contraseñas con bcrypt
- Autenticación mediante JWT
- Protección CSRF
- Limitación de intentos de login
- Control de acceso basado en roles

## 👥 Roles de Usuario
- **Usuario**: Acceso básico a funcionalidades
- **Administrador**: Acceso a funciones avanzadas

## 🧪 Pruebas
```bash
npm test
```

## 📦 Endpoints

### Autenticación
- `POST /api/auth/register`: Registro de usuarios
- `POST /api/auth/login`: Inicio de sesión
- `POST /api/auth/logout`: Cierre de sesión

### Rutas Protegidas
- `GET /api/users/user`: Acceso para usuarios
- `GET /api/users/admin`: Acceso solo para administradores

## 🔐 Seguridad
- Contraseñas hasheadas
- Tokens JWT
- Protección contra XSS
- Validación de entrada
- Límite de intentos de login

## 🚧 Mejoras Futuras
- Recuperación de contraseña
- Autenticación de dos factores
- Integración de más proveedores de identidad

## 📝 Licencia
MIT License

## 👥 Contribuciones
Las contribuciones son bienvenidas. Por favor, lee las pautas de contribución antes de enviar un pull request.

---

**Nota**: Este proyecto fue desarrollado como parte de un desafío de ciberseguridad para Penguin Acadmey. 🐧🚀🔒
