import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


const CustomModal = ({ handleOpenModal, children }) => {
  return (
    <div className="fixed inset-0 h-full w-[100%] bg-black bg-opacity-50 z-50 max-h-screen overflow-auto">
      <div className="bg-white max-h-[95%] top-5 bottom-10 rounded-lg shadow-lg p-8 w-full max-w-md mx-auto relative overflow-y-auto">
        <button
          className="absolute right-6 text-gray-400 hover:text-gray-600"
          onClick={handleOpenModal}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;