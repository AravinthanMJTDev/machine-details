"use client";
import React, { forwardRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, children }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg transition-all duration-1000 ease-in-out "
        style={{ zIndex: 1000 }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg max-h-screen overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-2 flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black"
            >
              X
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
