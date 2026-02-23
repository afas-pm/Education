import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Faculty from './pages/Faculty'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import PaymentSuccess from './pages/PaymentSuccess'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminCourses from './pages/AdminCourses'
import AddCourse from './pages/AddCourse'
import EditCourse from './pages/EditCourse'
import AddLecture from './pages/AddLecture'

import TestPractice from './pages/TestPractice'
import TestPracticeDetails from './pages/TestPracticeDetails'
import TestInterface from './pages/TestInterface'
import TestResults from './pages/TestResults'

const RedirectToCourses = () => {
  const { id } = useParams();
  return <Navigate to={`/courses/${id}`} replace />;
};

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseDetail />} />
        <Route path='/course/:id' element={<RedirectToCourses />} />
        <Route path='/faculty' element={<Faculty />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Test Practice Routes */}
        <Route path='/test-practice' element={<TestPractice />} />
        <Route path='/test-practice/:id' element={<TestPracticeDetails />} />
        <Route path='/test-interface/:id' element={<TestInterface />} />
        <Route path='/test-results/:id' element={<TestResults />} />

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/courses' element={<AdminCourses />} />
          <Route path='/admin/add-course' element={<AddCourse />} />
          <Route path='/admin/course/:id' element={<EditCourse />} />
          <Route path='/admin/course/:id/add-lecture' element={<AddLecture />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
