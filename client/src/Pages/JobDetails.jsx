import { useLoaderData } from "react-router-dom"
import  { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const JobDetails = () => {
  const { user } = useAuth()
  const data = useLoaderData()
  const axiosSecure=useAxiosSecure()

  const { _id, deadline, description, job_title, min_price, max_price, buyer,category} = data
  const [startDate, setStartDate] = useState(new Date());
  const handleFormSubmission = async e => {
   
    e.preventDefault()
    const form = e.target
    const deadline = startDate
    const job_id = _id;
    const price = parseFloat(form.price.value)
    if(price<min_price)return toast.error('The Price you are offering me in less then my minimum')
    const email = form.email.value;
    if(buyer.email===email)return toast.error('You cannot hier yourself fucker')
    const comment = form.comment.value;
    const status = 'Pending'

    const bidData = {
      job_id,
      job_title,
      category,
      price,
      email,
      comment,
      status,
      deadline,
      buyer:{
        email:buyer.email,
        name:buyer.name,
        photo:buyer.photo
      }
    }

    try {
      const { data } = await axiosSecure.post('/bid', bidData)
      toast.success('Your bid is added to the database')
      console.log(data)
    }
    catch (err) {
      console.log(err)
      console.log('hi i am error ',err.message)
      toast.error(err.response.data)
      form.reset()
    }
  }
  return (
    <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto '>
      {/* Job Details */}
      <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-light text-gray-800 '>
            Deadline:{deadline}
          </span>
          <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
            Web Development
          </span>
        </div>

        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
            {job_title}
          </h1>

          <p className='mt-2 text-lg text-gray-600 '>
            {description}
          </p>
          <p className='mt-6 text-sm font-bold text-gray-600 '>
            Buyer Details:
          </p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm  text-gray-600 '>Name:{buyer.name}</p>
              <p className='mt-2 text-sm  text-gray-600 '>
                Email:{buyer.email}
              </p>
            </div>
            <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
              <img src='' alt='' />
            </div>
          </div>
          <p className='mt-6 text-lg font-bold text-gray-600 '>
            Range: €{min_price} - €{max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Place A Bid
        </h2>

        <form onSubmit={handleFormSubmission}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='price'>
                Price
              </label>
              <input
                id='price'
                type='text'
                name='price'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                defaultValue={user?.email}
                name='email'
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='comment'>
                Comment
              </label>
              <input
                id='comment'
                name='comment'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>
              <div className="border-[1px] rounded-md py-2 pl-3">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              {/* Date Picker Input Field */}
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='hover:scale-[1.05] btn px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default JobDetails