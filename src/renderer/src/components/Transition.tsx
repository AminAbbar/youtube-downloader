import { motion } from 'framer-motion'

function transition(Children) {
  return function d(): React.JSX.Element {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.5 }}
        >
          <Children />
        </motion.div>
      </>
    )
  }
}
export default transition
