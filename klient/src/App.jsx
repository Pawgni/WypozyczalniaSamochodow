import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import React, { useState, useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import MycarsPage from './pages/MycarsPage';
import CarsFormPage from './pages/CarsFormPage';
import MycarPage from './pages/MycarPage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;
 
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage/>} />
          <Route path="/account/mycars" element={<MycarsPage/>} />
          <Route path="/account/mycars/new" element={<CarsFormPage/>} />
          <Route path="/account/mycars/:id" element={<CarsFormPage/>} />
          <Route path="/mycars/:id" element={<MycarPage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>} />
          <Route path="/account/bookings/:id" element={<BookingPage/>} />
        </Route> 
      </Routes>
    </UserContextProvider>
 
  );
}
 
export default App;