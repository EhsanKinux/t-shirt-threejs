import { motion, AnimatePresence } from "framer-motion"
import { useSnapshot } from "valtio"

//states
import state from "../store"

//animations
import {
    headContainerAnimation,
    headTextAnimation,
    headContentAnimation,
    slideAnimation
} from '../config/motion'

//styles
import './home.css'

const Home = () => {
    const snap = useSnapshot(state);
  return (

    //enables the animation of components that have been removed from the tree
    <AnimatePresence>
        {/* if we are in home pages */}
        {snap.intro && (
            <motion.section className="home" {...slideAnimation('left')}>
                <motion.header {...slideAnimation("down")}>
                    <img src="./threejs.png" alt="logo" className="image" />
                </motion.header>

                <motion.div className="home-content" {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className="head-text">
                            LET'S HAVE<br className="br"/> A UNIQ EXPERIENCE
                        </h1>
                    </motion.div>
                    <motion.div {...headContentAnimation} className="content">
                        <p>
                            Create your exclusive product with our brand-new 3D customization tool. <strong>Releas your imagination</strong>{""} and define your own style
                        </p>
                    </motion.div>

                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home