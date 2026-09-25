import React from 'react'
import { FaCheckDouble } from "react-icons/fa"
import { FaCircle } from "react-icons/fa"
function OrderList() {
  return (
    <div className="flex item-center gap-6 mb-3">
        <button className="bg-[#f68100] p-3 text-xl font-bold rounded-lg">MH</button>
        <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col item-start gap-1">
                <h1 className="text-[#000000] text-lg font-semibold 
                tracking-wide">Mahedi Hasan</h1>
                <p className="Text-[ababab] text-sm">8 items</p>
            </div>
            <div>
                <h1 className="text-[#008080] font-semibold border border-[#ff6347]
                rounded-lg p-2">Table no: 3</h1>
            </div>
            <div className="flex flex-col items-start gap-2">
                <p className="bg-green-300 text-green-600 px-4"><FaCheckDouble 
                className="inline mr-2" /> Ready</p>
                <p className="text-[#2e8b57] text-sm"><FaCircle 
                className="inline mr-2 text-green-600" /> Ready to serve</p>
            </div>
        </div>
    </div>
  )
}

export default OrderList
