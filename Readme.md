
# JobConnect

A full-stack job portal connecting job seekers with recruiters, built using Node.js, MongoDB, and Next.js.

🌐 [Visit the Live Application](https://jobconnect-omega.vercel.app)

<summary>🚀 Getting Started</summary>

Follow the steps below to run the project locally.

## 📦 Clone the Repository
```bash
git clone https://github.com/Ashish48Maurya/jobConnect
cd jobConnect
```

# Backend Setup

## 🚀 Getting Started (Backend)

Follow the steps below to set up the backend of the project locally.
### 🔧 Backend Setup
Navigate to the backend folder:
```bash
cd backend
```

Create a `.env` file and add the following:
```
MONGO_URL=mongodb://localhost:27017/jobportal
JWT_SECRET=Ashish60019
GMAIL=your_email
GPASSWORD=your_email_password
```

⚠️ Replace `your_email` and `your_email_password` with valid Gmail credentials.

### Install dependencies:
```bash
npm install
```

### Start the backend:
```bash
npm start
```
or 

```bash
node index.js
```


# Frontend Setup
## 🚀 Getting Started (Frontend)

Follow the steps below to set up the frontend of the project locally.

### 💻 Frontend Setup
Navigate to the frontend folder:
```bash
cd frontend
```

Create a `.env.local` file and add the following:
```
NEXT_PUBLIC_SERVER_URL=http://localhost:8000/api
NEXT_PUBLIC_UPLOAD_PRESETS=jobConnect
NEXT_PUBLIC_CLOUD_NAME=dzgtgpypu
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_ID=1888590579
NEXT_PUBLIC_SERVER=6189efc8d0662bf01529435c78854150


```

### Install dependencies:
```bash
npm install
```

### Start the frontend:
```bash
npm run dev
```

Once the frontend development server is running, you can access the application at `http://localhost:3000` in your web browser.

Make sure the backend server is also running for the application to function properly.
