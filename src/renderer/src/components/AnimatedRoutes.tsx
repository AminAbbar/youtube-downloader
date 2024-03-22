import MainPage from '@renderer/pages/MainPage'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

function AnimatedRoutes(): React.JSX.Element {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
