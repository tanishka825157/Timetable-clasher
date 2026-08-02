import { BrowserRouter, Route, Routes } from 'react-router'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { WorkspacePlaceholder } from './pages/WorkspacePlaceholder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="timetable" element={<WorkspacePlaceholder title="Timetable" />} />
          <Route path="calendar" element={<WorkspacePlaceholder title="Calendar" />} />
          <Route path="rooms" element={<WorkspacePlaceholder title="Rooms" />} />
          <Route path="faculty" element={<WorkspacePlaceholder title="Faculty" />} />
          <Route path="analytics" element={<WorkspacePlaceholder title="Analytics" />} />
          <Route path="settings" element={<WorkspacePlaceholder title="Settings" />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
