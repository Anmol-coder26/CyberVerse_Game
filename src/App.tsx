// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { PresentationProvider } from "./context/PresentationContext";
import { AppRoutes } from "./routes/AppRoutes";

/**
 * Root component. Provider order matters: GameProvider holds player/stats
 * state, PresentationProvider holds the persistent music engine and iris
 * transition state, and AppRoutes renders whichever page is active inside
 * the shared GameLayout shell.
 */
export function App() {
  return (
    <GameProvider>
      <PresentationProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PresentationProvider>
    </GameProvider>
  );
}
