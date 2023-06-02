import React from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

type PropType = {
  isOpen: boolean;
  children: JSX.Element | React.ReactNode;
};

function Modal({ children, isOpen }: PropType) {
  const navigate = useNavigate();

  if (!isOpen) return null;
  return (
    <section className="w-full h-[100svh] fixed top-0 left-0 z-50 backdrop-blur-sm dark:bg-[#000A] flex flex-col md:items-center md:justify-center">
      <div className="w-full h-full md:w-[800px] md:h-[500px] overflow-hidden rounded-md relative bg-slate-900">
        <button
          className="absolute right-1 top-1 z-50"
          onClick={() => navigate(-1)}
        >
          <IoClose size={40} />
        </button>
        {children}
      </div>
    </section>
  );
}

export default Modal;
