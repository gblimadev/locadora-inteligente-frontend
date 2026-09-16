import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cars from './components/Cars'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">

      <Navbar />

      <main>
        <Hero />
        <Features />
        <Cars />
        <CTA />
      </main>

      <Footer />

    </div>
  )
}

export default App