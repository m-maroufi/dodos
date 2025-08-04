import Login from "./pages/Login";
import ThemeProvider from "./hooks/theme/theme-porvider";
import { ModeToggle } from "./components/ToggleMode";
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <>
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        <Login />
      </>
    </ThemeProvider>
  );
}

export default App;
