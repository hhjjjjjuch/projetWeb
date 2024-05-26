import React, { useId } from 'react';

const Select = React.forwardRef(function Select(
  { options, label, className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className='block mb-2 text-base font-semibold text-gray-800'
          // statu
          style ={{ marginBottom: '0.5rem', fontSize: '25px', color: '#700' }}
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        //active/not active
        style={{
          padding: '0.5rem',
          borderRadius: '0.375rem',
          backgroundColor: '#f0f0f8',
          color: '#154',
          border: '1px solid #ccc',
          outline: 'none',
          width: '70%',
          transition: 'background-color 0.3s ease',
        }}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className='text-sm text-gray-800'
            style={{ fontSize: '0.875rem', color: '#333' }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
