# RefAero 🚀

A modern React + Vite job board application with interactive map, company list, and user authentication.

## Testing 🕹️

- **Public demo**: https://refaero.netlify.app/
- **Mock users**:
  - free account: janedoe@example.com / password123
  - premium account: johnsmith@example.com / password456

## Features ✨

- 🔎 **Job Search**: Filterable, searchable job list with detailed job pages.
- 🗺️ **Map View**: Budapest and its agglomeration with clickable markers.
- 🏢 **Company List**: Company data, filtering, and search.
- 📝 **Add New Job**: Permission-based, with a user-friendly form.
- 👥 **User types**: Free and premium users with different limits to create jobs
- 👤 **User Authentication**: Login, logout, profile picture.
- 🔑 **Restricted access** Visitors without login can only see limited data and they cannot add new jobs
- ⚡ **json-server Backend**: Free mock API hosted on Render.com.

## Getting Started 💻

1. **Clone the repository**

   ```bash
   git clone https://github.com/albigdev/refaero.git
   cd refaero
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Backend (json-server) usage**
   - Use the [public Render.com API](https://render.com/) (see below).

## Backend (json-server) 🌐

- The backend is a [json-server](https://github.com/typicode/json-server) serving `data/db.json`.
- Public demo:
  ```
  https://refaero-backend.onrender.com/jobs
  https://refaero-backend.onrender.com/users
  ```

## Project Structure 📁

```
src/
  components/    # Reusable UI components
  contexts/      # React contexts (auth, jobs)
  hooks/         # Custom hooks
  pages/         # Pages (Home, Login, Pricing, etc.)
  App.jsx        # Main component
  main.jsx       # Entry point
public/
  bg.jpg         # Background images, logos
data/
  db.json        # json-server database, hosted on render.com
```

## Main Technologies 🛠️

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/)
- [json-server](https://github.com/typicode/json-server)
- [Render.com](https://render.com/) (mock backend)

## Deploying on Netlify/Render 🌍

- **Frontend**: Deploy to Netlify (React app only).
- **Backend**: Deploy to Render.com (json-server only).

## TODO 📝

- ⭐ **Interested button:**  
  Add an "Interested" button to each job. When clicked, the job poster will receive an email with a list of interested users.
- 👤 **Detailed profile page:**  
  Implement a user profile page with more details and customization.
- 📝 **Registration:**  
  Allow new users to register and create an account.
- 💳 **Subscription feature:**  
  Add a subscription (premium) feature for extra functionality. (Extra functionality based on account type is already implemented)

---

## Acknowledgments 🙏

I learned React/Vite from Jonas Schmedtmann (web developer, designer and teacher). I owe it to him that I learned these things, I recommend him to everyone, he is an excellent teacher.

---

## Author 👨‍💻

Created by **albigdev**

---
