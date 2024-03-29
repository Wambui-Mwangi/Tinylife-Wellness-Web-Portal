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
        <h3 className='text-[23px] ml-[16%] text-green-800 font-bold mt-[7%] w-[180px]'>
          <span className='greeting '>{getTimeOfDay()}</span>
        </h3>
      </div>
      <div className='flex ml-[-9%] mt-[1%]'>
        <div className='flex mt-[10px]'>
          <div className='pt-10'>
            <div className='flex space-x-20'>
              <div>
                <h3 className='text-[23px] font-bold'>Children</h3>
                <div className="flex pt-[12%] space-x-3 mt-5 pl-[3%] pr-[4%] w-[400px] h-[161px] bg-blue-200 pt-[2%] rounded-[10px] " style={{
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.2), 0px 12px 24px rgba(0, 0, 0, 0.3)'
          }}>
                  <div className='text-green-800 text-2xl '>
                    <Image src="/girl.png" width={50} height={500} alt="logo" className="w-[70px] mt-[55%]" />
                  </div>

                  <div className='text-black mt-[13%] mb-[3%] ' >
                    <h3>No. of children at risk in Nairobi</h3>
                    <h1 className='text-[20px] font-bold'>154,651</h1>
                  </div>
                </div>
              </div>
              <div >
                <h3 className='text-[23px] font-bold'>Pregnancies</h3>
                <div className="flex pt-[12%] space-x-5 mt-5 pl-[3%] pr-[4%] w-[400px] h-[161px] bg-blue-200 pt-[2%] rounded-[10px]" style={{
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.2), 0px 12px 24px rgba(0, 0, 0, 0.3)'
          }}>
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
                <div className="pl-[3%] w-[400px] mt-[7%] h-[161px] bg-blue-200  p-[10px] rounded-[10px] text-[18px] font-normal font-['Nunito']" style={{
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.2), 0px 12px 24px rgba(0, 0, 0, 0.3)'
          }}>
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
            <div className='bg-black pl-[13%] pt-[1%] pb-[1%] w-[400px] rounded-[20px] mt-[-35%] ml-[90%]'>
              <p className='text-red-900 font-bold text-[25px]'>BLL above 60% </p>
            </div>
            <div className='bg-black pl-[13%] pt-[1%] pb-[1%] w-[400px] rounded-[20px] mt-[5%] ml-[90%]'>
              <p className='text-red-500 font-bold text-[20px]'>BLL above 50% below 60% </p>
            </div>
            <div className='bg-black pl-[13%] pt-[1%] pb-[1%] w-[400px] rounded-[20px] mt-[5%] ml-[90%]'>
              <p className='text-red-300 font-bold text-[20px]'>BLL below 50% </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;