import Login from "./pages/Login";
import ThemeProvider from "./hooks/theme/theme-porvider";
import { ModeToggle } from "./components/ToggleMode";
import { Routes, Route } from "react-router";
import Register from "./pages/Register";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
