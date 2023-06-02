import React, { useRef } from "react";

interface PropType extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
}

function CustomFileInput({ icon, label, type, ...rest }: PropType) {
  const inputRef = useRef<HTMLInputElement>(null);
  if (type) console.log("type is file by default, its unchangable");
  return (
    <div>
      <button
        onClick={() => {
          const inpElem = inputRef.current;
          if (inpElem) inpElem.click();
        }}
        className="flex flex-col items-center justify-center"
      >
        {icon}
        {label && <span className="dark:text-slate-500">{label}</span>}
      </button>
      <input className="hidden" ref={inputRef} type="file" {...rest} />
    </div>
  );
}

export default CustomFileInput;
