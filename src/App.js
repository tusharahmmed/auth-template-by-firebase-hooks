import "./App.css";
import { Routes, Route } from "react-router-dom";

import { DashboardPage, LoginPage } from "./pages";
import { RequireAuth } from "./components/shared";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
