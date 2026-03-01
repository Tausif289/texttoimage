Text-to-Image Converter App 🎨🖼️

Convert your text prompts into stunning images with AI – powered by a secure, full-stack MERN application!

Live Demo : https://imagify-ftx0.onrender.com/

🚀 Overview

The Text-to-Image Converter App allows users to generate images from text prompts using AI. Designed for farmers, artists, and content creators, the app includes motion features, secure authentication, and payment integration, enabling a complete end-to-end solution for AI-generated imagery.

🧠 Tech Stack
Frontend: ⚛️ React.js | 🎨 Tailwind CSS | 🔗 Axios | 🖼 Lucide Icons
Backend: 🟢 Node.js | ⚙️ Express.js | 🤖 AI Image Generation API / Farmer Motion
Database: 🗄 MongoDB Atlas
Authentication: 🔐 JWT-based Secure Login & Signup
Payments: Razorpay Integration
Deployment: Vercel (Frontend) + Render / Heroku (Backend)

🏠 Features
Text-to-Image Generation
✏️ Input your text prompt
🎨 Generate high-quality images
🔄 Motion-enabled images for dynamic effects

User Authentication
🔐 JWT-based login & signup
✏ Edit profile and manage account securely

🚪 Logout functionality
Payment Integration
💳 Purchase credits or subscription plans
🔗 Secure integration with Stripe / Razorpay APIs
🧾 Transaction history available in dashboard

Farmer Motion / AI Effects
🌾 Special motion and enhancement features for agricultural imagery
⚡ AI-powered filters & animations


📂 Project Structure
client/                  # React frontend
server/                  # Node.js + Express backend
 ├─ controllers/         # API logic, image generation & payment
 ├─ models/              # MongoDB models (Users, Transactions, Images)
 ├─ routes/              # API endpoints
 └─ utils/               # Helper functions (JWT, payments, AI calls)
💻 Getting Started
1. Clone the repository
git clone https://github.com/your-username/text-to-image-app.git
cd text-to-image-app
2. Install dependencies
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
3. Setup environment variables

Create a .env file in server/:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_image_api_key
PAYMENT_API_KEY=your_stripe_or_razorpay_key
4. Run the project
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start

Open http://localhost:3000
 to access the app.

⚡ Usage

Sign up / Log in with a secure account
Enter your text prompt in the converter

Generate your AI image
Purchase credits/subscription if needed
Access your dashboard to view, download, or manage your generated images

📈 Deployment
Frontend: Deploy on Vercel
Backend: Deploy on Render, Heroku, or any Node.js hosting

Set environment variables in production for AI API, MongoDB, JWT secret, and payment API

✨ Contribution

Contributions are welcome! You can help with:

Adding new AI filters and motion features

Improving payment & subscription flows

Enhancing frontend UI/UX
