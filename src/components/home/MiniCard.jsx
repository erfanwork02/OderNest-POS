import React from 'react'

const MiniCard = ({title, icon, number, footerNum}) => {
  return (
    <div className="bg-[#ffefd5] py-5 px-5 rounder-1g w-[50%]">
        <div className="flex items-start justify-between">
            <h1 className="text-[#2f4f4f] text-s font-semibold tracking-wide">
            {title}</h1>
            <button className={`${title === "Total Earnings" ? "bg-[#008000]" :
            "bg-[#f68100]"} p-3 rounded-1g text-[#f5f5f5] text-xl`}>{icon}</button>
        </div>
        <div>
            <h1 className="text-[#000000] text-4xl font-bold mt-5">{number}</h1>
            <h1 className ="text-[#000000] text-lg mt-2"><span className="text-[#228b22]">{footerNum}%</span> than yesterday</h1>
        </div>
    </div>
  )
}

export default MiniCard
