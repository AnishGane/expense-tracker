import React from 'react';
import { IoMdClose } from 'react-icons/io';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // if Modal is not open, return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/20 backdrop-blur-sm">
      <div className="relative max-h-full w-full max-w-2xl p-4">
        {/* Modal Content */}
        <div className="relative rounded-lg bg-white shadow-lg dark:bg-[#875cf5]">
          {/* Modal header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-300">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-white hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <IoMdClose size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="space-y-4 p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
