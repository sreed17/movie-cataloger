import React from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

type PropType = {
  title: string;
  isOpen: boolean;
  children: JSX.Element | React.ReactNode;
};

function Modal({ children, title, isOpen }: PropType) {
  const navigate = useNavigate();

  if (!isOpen) return null;
  return (
    <section className="w-full h-[100svh] fixed top-0 left-0 z-50 backdrop:blur-lg dark:bg-[#000A]">
      <header className="w-full flex flex-row">
        <button onClick={() => navigate(-1)}>
          <IoClose size={32} />
        </button>
        <h1>{title}</h1>
      </header>
      {children}
    </section>
  );
}

export default Modal;
