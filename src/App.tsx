import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/Login/Login';
import RuleBaseTablePage from './Pages/RuleBaseTablePage/RuleBaseTable';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/rules"
          element={
            <ProtectedRoute>
              <RuleBaseTablePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
