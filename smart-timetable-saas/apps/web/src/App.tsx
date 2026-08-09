import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router'
import { AppShell } from './components/layout/AppShell'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { WorkspacePlaceholder } from './pages/WorkspacePlaceholder'

function ProtectedApp() {
  return localStorage.getItem('smart-timetable-user') ? <Outlet /> : <Navigate to="/login" replace />
}

function App() {
  return <BrowserRouter><Routes>
    <Route path="login" element={<AuthPage />} />
    <Route path="create-account" element={<AuthPage initialMode="create" />} />
    <Route path="signin" element={<Navigate to="/login" replace />} />
    <Route element={<ProtectedApp />}><Route element={<AppShell />}>
      <Route index element={<DashboardPage />} />
      <Route path="timetable" element={<WorkspacePlaceholder title="Timetable builder" />} />
      <Route path="calendar" element={<WorkspacePlaceholder title="Calendar" />} />
      <Route path="rooms" element={<WorkspacePlaceholder title="Rooms" />} />
      <Route path="faculty" element={<WorkspacePlaceholder title="Faculty" />} />
      <Route path="analytics" element={<WorkspacePlaceholder title="Analytics" />} />
      <Route path="settings" element={<WorkspacePlaceholder title="Settings" />} />
    </Route></Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes></BrowserRouter>
}

export default App
