'use client';
import React, { useState, useEffect } from 'react';
import NairobiMap from '../components/DynamicNairobiMap';
import SideBar from '../components/Sidebar';
import FactoryIcon from '@mui/icons-material/Factory';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Image from 'next/image';

function Dashboard() {
  function getTimeOfDay() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }
  
  return (
    <div className='flex'>
      <SideBar />
      <div>
        <h3 className='text-[23px] ml-[30%] text-green-800 font-bold mt-[7%] w-[180px]'>
          <span className='greeting '>{getTimeOfDay()}</span>
        </h3>
      </div>
      <div className='flex ml-[-11%] mt-[1%]'>
        <div className='flex mt-[10px]'>
          <div className='pt-10'>
            <div className='flex space-x-10'>
              <div>
                <h3 className='text-[23px] font-bold'>Children</h3>
                <div className="flex pt-[12%] space-x-3 mt-5 pl-[3%] w-[280px] h-[161px] bg-blue-200 pt-[2%] rounded-[10px]">
                  <div className='text-green-800 text-2xl '>
                    <Image src="/girl.png" width={50} height={500} alt="logo" className="w-[70px] mt-[55%]" />
                  </div>
                  <div className='text-black mt-[13%] mb-[3%] '>
                    <h3>No. of children at risk in Nairobi</h3>
                    <h1 className='text-[20px] font-bold'>154,651</h1>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='text-[23px] font-bold'>Pregnancies</h3>
                <div className="flex pt-[12%] space-x-5 mt-5 pl-[3%] w-[280px] h-[161px] bg-blue-200 pt-[2%] rounded-[10px]">
                  <div className='text-6xl text-green-800'>
                    <Image src="/embryo.png" width={50} height={500} alt="logo" className="w-[70px] mt-[75%]" />
                  </div>
                  <div className='text-black mt-[13%]  mb-[3%]'>
                    <h3>Pregnancies at risk per month in Nairobi</h3>
                    <h1 className='text-[20px] font-bold'>7500</h1>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='text-[20px] font-bold'>Variables considered</h3>
                <div className="mt-1 pl-[3%] w-[200px] mt-5 h-[161px] bg-blue-200  p-[10px] rounded-[10px] text-[10px] font-normal font-['Nunito']">
                  <div>
                    <div className='text-green-800 flex m-[5px] space-x-3'>
                      <FactoryIcon />
                      <p className='text-black'>No. of industries in each ward</p>
                    </div>
                    <div className=' text-green-800 flex m-[5px] mt-2 space-x-3'>
                      <WaterDropIcon />
                      <p className='text-black'>Source of water in each ward</p>
                    </div>
                  </div>
                  <div>
                    <div className='text-green-800  flex m-[5px] mt-2 space-x-3'>
                      <RemoveCircleOutlineIcon />
                      <p className='text-black'> Presence of Open Sewage in a ward</p>
                    </div>
                    <div className=' text-green-800 flex m-[5px] mt-2 space-x-3'>
                      <CarRepairIcon />
                      <p className='text-black'>No. of Garages in a ward</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-[2%] h-[7px] ">
              <p className='text-black font-bold text-[25px]'>Average Blood Lead Levels in Nairobi Wards</p>
            </div>
            <div className="map-container">
             
              <NairobiMap/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;