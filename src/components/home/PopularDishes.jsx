import React from 'react'
import { popularDishes } from "../../constants"

const PopularDishes = () => {
  return (
    <div className="mt-5 pr-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg">
            <div className="flex justify-between items-center px-6 py-1"> 
                <h1 className='text-[#fffaf0] text-lg font-semibold tracking-wide'>
                    Popular Dishes</h1>
                <a herf="" className="text-[#025cca] text-sm font-semibold">View all</a>
            </div>
            <div>
                {
                PopularDishes.map((dish) =>{

                })
                }
            </div>
        </div>
    </div>
  )
}

export default PopularDishes
