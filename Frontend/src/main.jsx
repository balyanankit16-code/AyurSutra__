import React from 'react'
import { Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './utils/authContext.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import Auth from './pages/auth/Auth.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import PractitionerDashboard from './pages/practitionerPages/Practitioner.jsx'
import Basti from './pages/OtherInfoPages/basti.jsx';
import Nasya from './pages/OtherInfoPages/nasya.jsx';
import Raktamokshana from './pages/OtherInfoPages/raktamokshana.jsx';
import Vamana from './pages/OtherInfoPages/vamana.jsx';
import Virechana from './pages/OtherInfoPages/virechana.jsx';
import PatientDashboard from './components/patientComponents/PatientDashboard.jsx'
import AdminDashboard from './pages/adminPages/adminDashboard.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import BookSession from './pages/BookingPage/BookingPage.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement>
      <Route index element={<HomePage/>} />
      <Route path='auth' element={<Auth />} errorElement/>
      <Route path='contact' element={<Contact/>} />
      <Route path='about' element={<About/>} />

     
      
      <Route path="book" element={<BookSession />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="basti" element={<Basti />} />
      <Route path="nasya" element={<Nasya />} />
      <Route path="raktamokshana" element={<Raktamokshana />} />
      <Route path="vamana" element={<Vamana />} />
      <Route path="virechana" element={<Virechana />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
)