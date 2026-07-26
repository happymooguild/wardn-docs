import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../sections/Hero'
import Gap from '../sections/Gap'
import Detection from '../sections/Detection'
import Dashboard from '../sections/Dashboard'
import Features from '../sections/Features'
import Architecture from '../sections/Architecture'
import CTA from '../sections/CTA'
import Footer from '../components/Footer'
import { scrollToId } from '../lib/scroll'

export default function Home() {
  const location = useLocation()

  // When we arrive from another route asking to land on a section
  // (e.g. nav "Architecture" clicked while on /docs), scroll once mounted.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (target) {
      // next frame, so the section exists in the DOM
      requestAnimationFrame(() => scrollToId(target))
    }
  }, [location.state])

  return (
    <motion.main
      data-screen="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Hero />
      <Gap />
      <Detection />
      <Dashboard />
      <Features />
      <Architecture />
      <CTA />
      <Footer />
    </motion.main>
  )
}
