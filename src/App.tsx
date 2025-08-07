import Login from "./pages/Login";
import ThemeProvider from "./hooks/theme/theme-porvider";
import { ModeToggle } from "./components/ToggleMode";
import { Routes, Route, useLocation } from "react-router";
import Register from "./pages/Register";
import { AnimatePresence } from "motion/react";
import Dashborord from "./pages/Dashborord";
import AuthContextProvider from "./context/authContext";
import { Toaster } from "sonner";
import { DateTimeDisplay } from "./components/DateTimeDisplay";

function App() {
  const location = useLocation();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster
        richColors
        position="top-center"
        dir="rtl"
        className="font-bold"
      />
      <AnimatePresence mode="sync">
        <div className="fixed top-4 left-4 z-50">
          <ModeToggle />
        </div>
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
          <DateTimeDisplay />
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
