import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/Not_fount";
import Nav from "./components/Nav";
import AppLoader from "./components/AppLoader";
import Footer from "./components/Footer";
import RecommendationsPage from "./pages/RecommendationsPage";
import "./assets/styles/general.css";

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      setInitialized(true);
    };

    init();
  }, []);

  if (!initialized) {
    return <AppLoader />;
}

return (
    <BrowserRouter>
      <Nav />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recomendation" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
