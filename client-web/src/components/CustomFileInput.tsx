import React, { useRef } from "react";

interface PropType extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
}

function CustomFileInput({ icon, className, label, type, ...rest }: PropType) {
  const inputRef = useRef<HTMLInputElement>(null);
  if (type) console.log("type is file by default, its unchangable");
  return (
    <div {...(className ? { className } : {})}>
      <button
        type="button"
        onClick={() => {
          const inpElem = inputRef.current;
          if (inpElem) inpElem.click();
        }}
        className="flex flex-col items-center justify-center w-full"
      >
        {icon}
        {label && (
          <span className="dark:text-slate-500 w-full" title={label}>
            {label}
          </span>
        )}
      </button>
      <input className="hidden" ref={inputRef} type="file" {...rest} />
    </div>
  );
}

export default CustomFileInput;
