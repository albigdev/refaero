import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Login from "./pages/Login";
import AppPage from "./pages/AppPage";
import CompanyList from "./components/CompanyList";
import JobList from "./components/JobList";
import { JobsProvider } from "./contexts/JobsContext";
import JobDetails from "./components/JobDetails";
import Form from "./components/Form";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <JobsProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppPage />}>
              <Route index element={<Navigate replace to="jobs" />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/:id" element={<JobDetails />} />
              <Route path="companies" element={<CompanyList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </JobsProvider>
  );
}

export default App;
