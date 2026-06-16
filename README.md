# devChart 🚀

**devChart** is a modern, Kanban-style task management application designed for developers and small teams to stay productive and track their progress in real-time.

---

## 📖 Project Overview

devChart provides a streamlined workflow to manage your tasks from conception to completion. Built with a focus on speed and simplicity, it features an interactive drag-and-drop interface, live time-tracking for active tasks, and individual user accounts to keep your data secure and private.

## ✨ Features Implemented

-   **🔒 Secure Authentication:** Register and login with a minimum 6-character username and password. Powered by JWT and Bcrypt.
-   **📋 Kanban Board:** A three-stage pipeline (To Do, In Progress, Done) for visual task management.
-   **🖱️ Drag & Drop:** Move tasks between stages seamlessly using native browser drag-and-drop.
-   **⏱️ Advanced Time Tracking:**
    *   **To Do:** Displays the exact creation timestamp.
    *   **In Progress:** Features a live counter showing how long you've been working on a task.
    *   **Done:** Shows the total duration from creation to completion.
-   **⚙️ Task Management:** Create new tasks with priority levels (High, Medium, Low) and delete individual tasks or clear entire columns.
-   **👤 User Profiles:** Personalized dashboard with a "Settings" page to update your security credentials.
-   **📱 Responsive & Modern UI:** A dark-themed, high-contrast interface built with Tailwind CSS 4.

## 🛠️ Technology Stack Used

-   **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Frontend:** [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
-   **Authentication:** JSON Web Tokens (JWT) & Bcryptjs
-   **State Management:** React Hooks (useState, useEffect, useMemo)

## 🚀 Setup Instructions

Follow these steps to get the project running locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/devChart.git
cd devChart
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_auth
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment Instructions

The project is optimized for deployment on **Vercel**:

1.  Push your code to a GitHub repository.
2.  Import the project into [Vercel](https://vercel.com/new).
3.  Add your `MONGODB_URI` and `JWT_SECRET` as Environment Variables in the Vercel dashboard.
4.  Click **Deploy**.

---

## 📸 Screenshots

> *Note: Add your actual screenshots in a `/public/screenshots` folder.*

### 1. Landing & Login
![Landing Page](./public/screenshots/landing.png)

### 2. Kanban Dashboard
![Dashboard](./public/screenshots/dashboard.png)

### 3. Task Creation
![Create Task](./public/screenshots/create.png)

---

## ⚠️ Known Limitations

-   **Browser Compatibility:** Drag-and-drop is optimized for desktop browsers; mobile touch-drag support is currently limited.
-   **Password Recovery:** There is currently no "Forgot Password" email flow.
-   **Collaborative Editing:** Tasks are currently private to individual users; real-time team collaboration on the same board is a planned future update.
-   **File Storage:** Tasks do not currently support image or file attachments.

---

*Happy Building!* 🛠️
