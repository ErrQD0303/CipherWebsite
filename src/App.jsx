import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext.jsx";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));
const SubstitutionCipher = lazy(() => import("./pages/SubstitutionCipher.jsx"));
const VigenereCipher = lazy(() => import("./pages/VigenereEncryption.jsx"));

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Navigate to="substitution-cipher" />} />
            <Route
              path="substitution-cipher"
              element={<SubstitutionCipher />}
            />
            <Route path="vigenere-cipher" element={<VigenereCipher />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
