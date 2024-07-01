import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import SubstitutionCipher from "./pages/SubstitutionCipher.jsx";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="substitution-cipher" />} />
          <Route path="substitution-cipher" element={<SubstitutionCipher />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
