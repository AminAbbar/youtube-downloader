import { motion } from 'framer-motion'

function UpdateModal({
  modal: { setShowModal }
}: {
  modal: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }
}): React.JSX.Element {
  function handleInstall(): void {
    setShowModal(false)
    window.updater.updateInstall()
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center bg-black/50 z-50 w-screen h-screen fixed"
    >
      <motion.div
        initial={{ y: '-150%' }}
        animate={{ y: 0 }}
        exit={{ y: '150%' }}
        transition={{ duration: 0.5 }}
        className="w-[50vw] bg-gray-800   flex-col p-12 pt-10 justify-center rounded-3xl  items-center h-[30vh] "
      >
        <h1 className=" font-bold text-xl text-center pb-4">
          Update avilable and downloaded do you want to install it now or later ?
        </h1>
        <div className="flex gap-8 leading-8">
          <button
            className="flex w-full justify-center rounded-md before:bg-lime-500
                          overflow-hidden  before:absolute before:left-0  outline-none before:top-0 before:h-full 
                          relative before:z-0 before:hover:w-0 transition-all focus:scale-105  hover:scale-105 before:duration-300 before:transition-all duration-300
                          before:w-full px-3 py-2 
                           shadow-sm border-lime-500 border"
            onClick={handleInstall}
          >
            <span className="leading-6 text-white font-semibold text-sm capitalize z-10">
              Install
            </span>
          </button>
          <button
            className="flex w-full justify-center rounded-md before:bg-red-500
                          overflow-hidden  before:absolute before:left-0  outline-none before:top-0 before:h-full 
                          relative before:z-0 before:hover:w-0 transition-all focus:scale-105  hover:scale-105 before:duration-300 before:transition-all duration-300
                          before:w-full px-3 py-2 
                           shadow-sm border-red-500 border"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <span className="leading-6 text-white font-semibold text-sm capitalize z-10">
              later
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UpdateModal //transition(UpdateModal)
