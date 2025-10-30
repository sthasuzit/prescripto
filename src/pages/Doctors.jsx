import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Doctors = () => {

  const { speciality } = useParams()
  const [doctors, setDoctors] = useState([])       // all doctors from API
  const [filterDoc, setFilterDoc] = useState([])   // filtered doctors
  const [loading, setLoading] = useState(true)     // optional loading state
  const [error, setError] = useState(null)         // optional error handling
  const navigate = useNavigate()

  // 🔹 Fetch doctors from backend API
  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/admin/technicians') // 👈 replace with your endpoint
      setDoctors(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching doctors:', err)
      setError('Failed to load doctors')
      setLoading(false)
    }
  }

  // 🔹 Filter based on speciality
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  // 🔹 Fetch data when component loads
  useEffect(() => {
    fetchDoctors()
  }, [])

  // 🔹 Reapply filter when data or URL changes
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  // 🔹 Optional loading/error states
  if (loading) return <p>Loading doctors...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        {/* Left side — Speciality filter */}
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={() => speciality === 'Electrician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-100 text-black" : ""}`}>Electrician</p>
          <p onClick={() => speciality === 'Plumber' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Plumber</p>
          <p onClick={() => speciality === 'Deep Cleaner' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Deep Cleaner</p>
          {/* <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p> */}
        </div>

        {/* Right side — Doctor cards */}
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                key={index}
              >
                <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt={item.name} />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors