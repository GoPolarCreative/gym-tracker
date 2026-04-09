import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Today from './pages/Today'
import Planner from './pages/Planner'
import Progress from './pages/Progress'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full bg-bg">
        {/* Phone frame wrapper */}
        <div
          className="flex flex-col flex-1 mx-auto w-full overflow-hidden"
          style={{ maxWidth: 430 }}
        >
          {/* Scrollable page content */}
          <main className="flex-1 overflow-y-auto scrollbar-none pb-20">
            <Routes>
              <Route path="/" element={<Navigate to="/today" replace />} />
              <Route path="/today"    element={<Today />} />
              <Route path="/planner"  element={<Planner />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </main>

          {/* Fixed bottom nav */}
          <BottomNav />
        </div>
      </div>
    </BrowserRouter>
  )
}
