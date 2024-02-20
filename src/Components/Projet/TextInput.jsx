import React from "react";

const TextInput = ({ label, register, name, error, ...rest }) => {
  return (
    <div className='flex flex-col mt-2'>
      <label className='text-gray-600 text-sm mb-1'>{label}</label>
      <input
        {...register(name)}
        {...rest}
        aria-invalid={error ? "true" : "false"}
        className={`rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 ${rest.styles}`}
      />
      {error && <span className='text-xs text-red-500 mt-0.5'>{error}</span>}
    </div>
  );
};

export default TextInput;
