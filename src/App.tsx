import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cars from './components/Cars'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Home() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App