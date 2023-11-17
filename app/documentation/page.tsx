import React from 'react';
import SideBar from '../components/Sidebar';

function Documentation() {
  return (
    <div className='flex'>
      <SideBar />
      <div className="flex flex-col ml-10 mt-5 font-nunito">
        <div>
          <h1 className="mb-[2%] mt-[2%] text-black text-4xl md:ml-[2%]">How Tinylife Wellness Works</h1>
        </div>

        <div className="mt-5 flex flex-row gap-5 md:gap-5 mb-5 ml-1 md:ml-5">
          <div className="bg-opacity-15 text-2 bg-yellow-100 rounded-2xl shadow-2xl p-3 md:p-10 pt-10 md:pt-[50px] w-full md:w-6/12 mr-[2%] h-[600px] md:h-[320px]">
            <h4 className=" md:text-[22px]">
              The portal showcases the extent of lead exposure levels in different areas in Nairobi. The results displayed are from an ML model that we fed data on variables that lead to lead exposure within our communities, and it came up with the levels of lead exposure in Nairobi.
            </h4>
          </div>

          <div className="bg-opacity-15 bg-yellow-100 rounded-2xl shadow-2xl mr-[5%] p-3 md:p-10 pt-10 w-full md:w-6/12 md:pt-[50px] h-[500px] md:h-[320px]">
            <h4 className="text-lg md:text-[22px]">
              The map highlights the different wards in Nairobi and their case details. The level of exposure is subject to change over time as the variables we considered also change due to government activity, population growth, as well as continuous interventions to reduce the levels of lead exposure.
            </h4>
          </div>
        </div>

        <div className="bg-opacity-15 bg-green-800 text-white rounded-2xl shadow-2xl p-3 md:p-10 pt-20 w-full md:w-5/12 h-[280px] ml-3 md:ml-[30%] mt-10">
          <h4 className="text-lg md:text-[22px]">
            It is important to keep the data we showcase as accurate as possible at all times, and we can only do this with your help. The data you collect on lead levels is invaluable for retraining the model as well as keeping a record of the progress of these areas. Here is an example of such a dataset:
            <a className='text-yellow-600 ml-4' href='/neza_validation.csv'>DataSet</a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Documentation;