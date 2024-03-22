import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import UpdateModal from './components/UpdateModal'
import NavTitle from './components/NavTitle'
import AnimatedRoutes from './components/AnimatedRoutes'
function App(): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    window.ipcRenderer.receive('update-downloaded', () => {
      setShowModal(true)
    })
    return () => {
      window.ipcRenderer.removeAllListeners('update-downloaded')
    }
  }, [])
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        limit={8}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        toastStyle={{ backgroundColor: 'rgb(16, 22, 34) ' }}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover
        theme="dark"
        stacked
      />
      <AnimatePresence mode="wait">
        {showModal && <UpdateModal modal={{ setShowModal }} />}
      </AnimatePresence>
      <NavTitle />
      <AnimatedRoutes />
    </>
  )
}

export default App
