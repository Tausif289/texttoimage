# 🎨 Imagify – Text-to-Image Converter

> Turn your text prompts into stunning AI-generated images. A secure, full-stack MERN application with credit-based payments.

🔗 **Live Demo:** [https://imagify-ftx0.onrender.com/](https://imagify-ftx0.onrender.com/)

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8)
![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248)

---

## 📖 Overview

**Imagify** lets users describe an image in plain text and get an AI-generated result in seconds. It is built for designers, artists, content creators and anyone who wants quick visuals. Users sign up securely, spend credits to generate images, and can buy more credits through an integrated payment gateway.

---

## ✨ Features

- 🖼️ **Text-to-Image Generation** – enter a prompt and generate a high-quality image with one click
- 🔐 **Secure Authentication** – JWT-based signup, login and protected routes
- 💳 **Credit System** – each generation consumes credits; new users get free starter credits
- 💰 **Payment Integration** – buy credit packs via Razorpay
- 🧾 **Transaction History** – every purchase is stored and tracked in MongoDB
- ⬇️ **Download Images** – save generated images directly
- 📱 **Responsive UI** – clean Tailwind CSS interface that works on mobile and desktop
- 🌐 **Global State** – React Context API for user, credits and auth state

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), Tailwind CSS, Axios, React Router, React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JSON Web Tokens (JWT), bcrypt |
| AI | Text-to-image generation API |
| Payments | Razorpay |
| Deployment | Render (full stack) / Vercel (frontend, optional) |

---

## 📂 Project Structure

```
imagify/
├── client/                     # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images, icons
│   │   ├── components/         # Navbar, Header, Steps, Description,
│   │   │                       # GenerateButton, Testimonials, Login, Footer
│   │   ├── context/            # AppContext (global state)
│   │   ├── pages/              # Home, Result, BuyCredit
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Node.js + Express backend
│   ├── config/
│   │   └── mongodb.js          # Database connection
│   ├── controller/
│   │   ├── usercontroller.js   # Register, login, credits, payments
│   │   └── imagecontroller.js  # Image generation logic
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── model/
│   │   ├── usermodel.js
│   │   └── transactionmodel.js
│   ├── routes/
│   │   ├── userroute.js
│   │   └── imageroute.js
│   ├── server.js               # App entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ and npm
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- An API key for your text-to-image provider
- A [Razorpay](https://razorpay.com/) account (test keys work)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/imagify.git
cd imagify
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Configure environment variables

Create `server/.env`:

```env
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIPDROP_API=your_image_generation_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

Create `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> ⚠️ Never commit `.env` files. Make sure both are listed in `.gitignore`.

### 4. Run the project

```bash
# Terminal 1 – backend
cd server
npm run server        # or: npm run dev / node server.js

# Terminal 2 – frontend
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔌 API Endpoints

### User Routes – `/api/user`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Create a new account | ❌ |
| POST | `/login` | Log in and receive a JWT | ❌ |
| GET | `/credits` | Get current user credits | ✅ |
| POST | `/pay-razor` | Create a Razorpay order | ✅ |
| POST | `/verify-razor` | Verify payment and add credits | ✅ |

### Image Routes – `/api/image`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/generate-image` | Generate an image from a prompt | ✅ |

> Adjust the paths above if your route names differ.

---

## ⚡ How It Works

1. **Sign up / Log in** – receive a JWT stored on the client.
2. **Enter a prompt** – the client sends it to the backend with the token.
3. **Credit check** – the server verifies the user has enough credits.
4. **Generate** – the server calls the AI API and returns the image.
5. **Deduct credit** – balance is updated and shown in the navbar.
6. **Buy more** – pay via Razorpay; the transaction is recorded and credits are added after verification.

---

## ☁️ Deployment

- **Backend:** deploy `server/` on Render (or any Node host). Add all server environment variables in the dashboard.
- **Frontend:** deploy `client/` on Vercel or Render Static Site. Set `VITE_BACKEND_URL` to your deployed backend URL.
- Enable CORS on the backend for your frontend domain.

---

## 🛣️ Roadmap

- [ ] Image history / gallery per user
- [ ] Multiple styles and aspect ratios
- [ ] Stripe and UPI payment options
- [ ] Rate limiting and prompt moderation
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push and open a Pull Request

Ideas to help with: new image styles, improved payment flows, better UI/UX, tests.

---

## 📬 Contact

Built by **Tausif*
- GitHub: [@your-username](https://github.com/Tausif289/texttoimage)
- LinkedIn: [your-linkedin](https://www.linkedin.com/in/tausif-ansar-292a6b308/?isSelfProfile=true)

⭐ If you like this project, give it a star!
