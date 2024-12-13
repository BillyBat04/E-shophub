import React, { useState } from 'react'

const Switcher = (status) => {
  const [isChecked, setIsChecked] = useState(status)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label className='flex cursor-pointer justify-center select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only customShadow '
          />
          <div
            className={`box block h-6 w-10 rounded-full ${
              isChecked ? 'bg-green-700' : 'bg-slate-500'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white   transition ${
              isChecked ? 'translate-x-full' : ''
            }`}
          ></div>
        </div>
      </label>
    </>
  )
}

export default Switcher