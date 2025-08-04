import Login from "./pages/Login";
import ThemeProvider from "./hooks/theme/theme-porvider";
import { ModeToggle } from "./components/ToggleMode";
import { Routes, Route, useLocation } from "react-router";
import Register from "./pages/Register";
import { AnimatePresence } from "motion/react";
import Dashborord from "./pages/Dashborord";
import AuthContextProvider from "./context/authContext";
function App() {
  const location = useLocation();
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AnimatePresence mode="sync">
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        <AuthContextProvider>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashborord />} />
            {/* Add more routes as needed */}
          </Routes>
        </AuthContextProvider>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
