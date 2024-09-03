import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios'
const TabJobs = () => {

    const[jobs,setjob]=useState([])
    useEffect(()=>{
        const getData=async()=>{
            const{data}=await axios('https://solospehre-new.vercel.app/jobs')
            setjob(data)
        }
        getData()
    },[])
    return (

        <div>
            <h1 className='lg:text-3xl text-xl  font-bold text-center mt-8'>Browose Job By Category</h1>
            <p className='text-center text-gray-500 my-2'>Here you can choose you desire cadidate for making a website for you and can be able to help your digital marketing project.</p>
            <div className='flex justify-center container px-6 py-10'>
                <div className=''>
                    <Tabs>
                        <TabList>
                            <div className='text-black text-xl'>
                                <Tab>Web development</Tab>
                                <Tab>Graphic Design</Tab>
                                <Tab>Digital Marketing</Tab>
                            </div>
                        </TabList>

                        <TabPanel>
                         <div className='grid grid-cols-3 gap-8'>
                         {
                            jobs.filter(j=>j.category==="Web Development").map(job=><JobCard key={job._id} job={job}></JobCard>)
                           }
                         </div>
                        </TabPanel>
                        <TabPanel>
                        <div className='grid grid-cols-3 gap-8'>
                         {
                            jobs.filter(j=>j.category==="Graphics Design").map(job=><JobCard key={job._id} job={job}></JobCard>)
                           }
                         </div>
                        </TabPanel>
                        <TabPanel>
                        <div className='grid grid-cols-3 gap-8'>
                         {
                            jobs.filter(j=>j.category==="Digital Marketing").map(job=><JobCard key={job._id} job={job}></JobCard>)
                           }
                         </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default TabJobs;