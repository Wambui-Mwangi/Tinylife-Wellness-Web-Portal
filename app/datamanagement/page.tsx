'use client';

import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { v4 as uuidv4 } from 'uuid';
import { MD5 } from 'crypto-js';
import Papa from 'papaparse';
import MissingColumnsModal from '../modals/MissingColumnsModal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useGetFiles from '../hooks/useGetFiles';
import { uploadfile } from '../utilities/utils';
import SideBar from '../components/Sidebar';

interface FileData {
  file_hash: string;
  data: any[];
}
function DataUpload() {
  const { files } = useGetFiles();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; timestamp: string; file_hash: string; }[]>([]);
  const [fileContents, setFileContents] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMissingColumnsModal, setShowMissingColumnsModal] = useState<boolean>(false);
  const [missingColumns, setMissingColumns] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalFiles = files.length;
  const totalPages = Math.ceil(totalFiles / itemsPerPage);
  const actualTotalPages = Math.min(totalPages, 2);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const reversedFiles = [...files].reverse();
  const uniqueFileHashes = [...new Set(reversedFiles.map((file) => file.file_hash))];

  const filesToDisplay = reversedFiles
    .filter((file) => file.file_name !== "")
    .slice(startIndex, endIndex);
  const handlePageChange = (event: any, page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const timestamp = new Date().toLocaleString();
      const fileHash = MD5(file.name + uuidv4()).toString();
      setUploadedFiles([{ name: file.name, timestamp, file_hash: fileHash }, ...uploadedFiles]);
      setFileContents([file.name, ...fileContents]);
      setErrorMessage('');
      setSuccessMessage('');
    }
  };
  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleUpload = async () => {
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        setErrorMessage('Only CSV files are allowed.');
        setSuccessMessage('');
        return;
      }
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target?.result) {
            const csvData = e.target.result.toString();
            const { data } = Papa.parse(csvData, { header: true });
            const requiredColumns = [
              "location",
              "sources of water",
              "proximity to industries",
              "number of garages in an area",
              "proximity to dumpsite",
              "presence of open sewage",
              "past cases of lead poisoning",
              "women and children population",
              "lead blood levels",
              "file_name",
            ];
            const missingCols = requiredColumns.filter(
              (column) => !data[0] || !Object.keys(data[0]).includes(column)
            );
            if (missingCols.length > 0) {
              setMissingColumns(missingCols);
              setShowMissingColumnsModal(true);
              setErrorMessage('');
              setSuccessMessage('');
              return;
            }
            const response = await uploadfile(selectedFile);
            if (response.message === 'File uploaded and processed successfully') {
              setSuccessMessage(response.message);
              setErrorMessage('');
            } else if (response.message === 'File contents already exist in the database') {
              setErrorMessage(response.message);
              setSuccessMessage('');
            } else {
              setErrorMessage(response.message);
              setSuccessMessage('');
            }
          }
        };
        reader.readAsText(selectedFile);
      } catch (error) {
        console.error('Error during file upload:', error);
        setErrorMessage('File upload failed.');
        setSuccessMessage('');
        setShowMissingColumnsModal(false);
      }
    }
  };
  const handleMissingColumnsModalClose = () => {
    setShowMissingColumnsModal(false);
    setMissingColumns([]);
  };
  return (
    <div className='flex ml-[10px] mb-0'>
      <SideBar />
      <div className="flex flex-col gap-20 md:flex-row data-upload-container ml-[40px] mb-0">
        <div className="md:w-1/2 md:pl-[119px] upload-files">
          <h1 className="font-nunito font-semibold text-3xl sm:text-3xl md:text-3xl mt-5 ">
            Data Management
          </h1>
          <div className="bg-white shadow-md rounded-md border-green-500 w-1/2 h-1/2 flex flex-col mt-10" style={{
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.2), 0px 12px 24px rgba(0, 0, 0, 0.3)'
          }}>
          <h2 className="font-bold text-2xl mt-[15px] ml-[10px]">Uploaded Files</h2>
          <ol className="ml-[10px]">
            {filesToDisplay.map((file, index) => (
              <li key={index} className="flex items-center">
                {index + 1 + startIndex}. {file.file_name}
                <div className="icon-container ml-2"></div>
              </li>
            ))}
          </ol>
          <Pagination
            count={actualTotalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="mt-4"
          />
        </div>
        </div>

        <div className="main-content  md:w-[20%]">
       
          <div className="mt-[70px] ml-30 upload-header ">
            
          <div className="bg-white shadow-md rounded-md border-green-500 mt-15 w-[120%] h-[100%] pl-[10%] pr-[10%] " style={{
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.2), 0px 12px 24px rgba(0, 0, 0, 0.3)'
}}>
            <h1 className="font-bold text-2xl">Upload Files</h1>
            <p className='uploaded'>Only Uploaded csv files with columns such as Location, Sources of water, Proximity to industries, Number of garages in an area, Proximity to dumpsite, Presence of open sewage, and Past cases of lead poisoning are accepted.</p>
            <div className="container-for-button-container ">
              <div className="button-container bg-black p-5 pb-20 rounded-xl mt-5 mb-9 flex flex-col items-center w-100 ">
                <label htmlFor="file-input" className="file-upload-label">
                  <div className="pl-10 file-upload-icon cursor-pointer ml-[10px] mt-7 ">
                    <CloudUploadIcon style={{ width: '82px', height: '81px', color: 'green' }} />
                  </div>
                  <p className="text-white mt-5">Drag csv files to upload</p>
                  <input
                    id="file-input"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden" />
                </label>
                <button
                  onClick={handleUploadButtonClick}
                  className="w-40 h-14 bg-white text-black border-2 border-green-500 rounded-lg mt-1 pl-2"
                >
                  Upload Files
                </button>
              </div>
            </div>
            <button
              onClick={handleUpload}
              className="btn done ml-[80px] w-[180px] h-[50px] text-white px-4 py-3 pl-10 rounded-md pr-10 font-nunito bg-neza-green-200 bg-[#2DCD1F]  mb-[10%] "
             id='done'>
              Done
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message text-align-center">{successMessage}</p>
          )}
          <MissingColumnsModal
            isOpen={showMissingColumnsModal}
            missingColumns={missingColumns}
            onClose={handleMissingColumnsModalClose} />
        </div>
        </div>
      </div>
    </div>
  );
}
export default DataUpload;