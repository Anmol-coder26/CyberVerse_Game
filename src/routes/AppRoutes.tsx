// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { GameLayout } from "../layouts/GameLayout";
import { LandingPage } from "../pages/Landing/LandingPage";
import { IntroPage } from "../pages/Intro/IntroPage";
import { GamePage } from "../pages/Game/GamePage";
import { MissionPage } from "../pages/Mission/MissionPage";
import { SettingsPage } from "../pages/Settings/SettingsPage";
import { InventoryPage } from "../pages/Inventory/InventoryPage";
import { LeaderboardPage } from "../pages/Leaderboard/LeaderboardPage";

/**
 * The full route table. GameLayout is a layout route (renders an <Outlet />)
 * so the particle background, floor grid, iris overlay, and mute button
 * mount exactly once and persist across every navigation.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<GameLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/mission/:chapterId" element={<MissionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  );
}
