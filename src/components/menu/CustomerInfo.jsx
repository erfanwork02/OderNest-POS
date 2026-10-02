import React from 'react'

const CustomerInfo = () => {
  return (
    <div>
      <div className="flex item-center justify-between px-4 py-3">
          <div className="flex flex-col item-start">
            <h1 className= "text-md text-[#f5f5f5] font-semibold tracking-wide">Customer Name
            </h1>
            <p className="text-xs text -[#ababab] font-medium mt-1">101/Dine</p>
            <p className="text-xs text-[#ababab] font-medium mt-2">January 19, 2026 05:34 PM
            </p>
          </div>
          <button calassName="bg-[#f6b100] p-3 text-1 font-bold rounded-lg">CN</button>
        </div>
    </div>
  )
}

export default CustomerInfo
