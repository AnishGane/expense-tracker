import React from 'react';
import { IoMdClose } from 'react-icons/io';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/20 backdrop-blur-sm">
      <div className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-purple-600 shadow-lg">
          {/* Modal header with dynamic gradient */}
          <div className={`flex items-center justify-between rounded-t-lg p-4 bg-purple-600 text-white`}>
            <h3 className="text-lg font-medium ">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-200 hover:text-gray-900"
            >
              <IoMdClose size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="space-y-4 border-t border-gray-300 p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
