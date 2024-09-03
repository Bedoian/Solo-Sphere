import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
const AddJob = () => {
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure=useAxiosSecure()
    const { user } = useAuth()
    const handleAddJob = async e => {
        e.preventDefault()
        const form = e.target
        const job_title = form.job_title.value;
        const deadline = startDate;
        const category = form.category.value;
        const min_price = form.min_price.value;
        const max_price = form.max_price.value;
        const description = form.description.value;
        const buyer_email = form.email.value;

        const jobData = {
            job_title,
            deadline,
            category,
            min_price,
            max_price,
            description,
            buyer: {
                email: buyer_email,
                name: user?.displayName,
                photo: user?.photoURL
            }

        }
        try {
            const { data } = await axiosSecure.post('/jobs', jobData)
            form.reset()
            console.log(data)
        }
        catch (err) {
            console.log(err)
            console.log('hi i am error ', err.message)
        }
    }
    return (

        <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
            <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
                <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                    Post a Job
                </h2>
                <form onSubmit={handleAddJob}>
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                        <div>
                            <label className='text-gray-700 ' htmlFor='job_title'>
                                Job Title
                            </label>
                            <input
                                id='job_title'
                                name='job_title'
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
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
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700'>Deadline</label>
                            <div className="border-[1px] rounded-md py-2 pl-3">
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            {/* Date Picker Input Field */}
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700 ' htmlFor='category'>
                                Category
                            </label>
                            <select
                                name='category'
                                id='category'
                                className='border p-2 rounded-md'
                            >
                                <option value='Web Development'>Web Development</option>
                                <option value='Graphics Design'>Graphics Design</option>
                                <option value='Digital Marketing'>Digital Marketing</option>
                            </select>
                        </div>
                        <div className="relative">
                            <label className="text-gray-700" htmlFor="min_price">
                                Minimum Price
                            </label>
                            <span className="absolute inset-y-0 top-8 left-3 pl-3 flex items-center text-gray-700 pointer-events-none">
                                €
                            </span>
                            <input
                                defaultValue={100}
                                id="min_price"
                                step="5"
                                name="min_price"
                                type="number"
                                className="block w-full pl-8 pr-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="relative">
                            <label className="text-gray-700" htmlFor="min_price">
                                Minimum Price
                            </label>
                            <span className="absolute inset-y-0 top-8 left-3 pl-3 flex items-center text-gray-700 pointer-events-none">
                                €
                            </span>
                            <input
                                defaultValue={900}
                                id="max_price"
                                step="5"
                                name="max_price"
                                type="number"
                                className="block w-full pl-8 pr-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-gray-700 ' htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            name='description'
                            id='description'
                        ></textarea>
                    </div>
                    <div className='flex justify-end mt-6'>
                        <button className='btn px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default AddJob