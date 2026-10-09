import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import Cars from './components/Cars/Cars'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import CarrosPage from './pages/CarrosPage'
import HomePage from './components/homePages/HomePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Perfil from './components/Perfil/Perfil'
import ReservasPage from './pages/ReservasPage'
import NovaReservaPage from './pages/NovaReservaPage'

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

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/carros"
          element={
            <ProtectedRoute>
              <CarrosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <ProtectedRoute>
            <ReservasPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nova-reserva"
          element={<NovaReservaPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App