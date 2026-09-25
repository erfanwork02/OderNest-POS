import React from 'react'
import { popularDishes } from "../../constants"

const PopularDishes = () => {
  return (
    <div className="w-full px-3">
      <div className="bg-[#bc8f8f] w-full rounded-lg">
            <div className="flex justify-between items-center px-6 py-1"> 
                <h1 className='text-[#000000] text-lg font-semibold tracking-wide'>
                    Popular Dishes</h1>

                <a 
                herf="" 
                className="text-[#025cca] text-sm font-semibold"
                >View all
                </a>
            </div>

            <div className="overflow-y-scroll h-[680px] scrollbar-hide">
                {popularDishes.map((dish) => {
                    return (
                    <div
                    key={dish.id} 
                    className="flex items-center gap-4 bg-[#fa8072] rounded-[15px] px-6 py-4 mx-4 mt-3 
                                border border-[#ff6347]"
                    >
                        <h1 className="text-[#f5f5f5] font-bold text-xl mr-1">{dish.id < 10 ? `0${dish.id}` : dish.id}</h1>
                        <img src={dish.image}
                        alt={dish.name}
                        className="w-[50px] h-[50px] rounded-full" 
                        />

                        <div>
                            <h1 className="text-[#000000] font-semibold tracking-wide"> {dish.name}</h1>
                            <p className="text-[#f5f5f5] text-s font-bold mt-1">
                                <span className="text-[#ffff00] text-sm">orders: </span>
                                {dish.numberOfOrders}</p>
        </div>
    </div>
    );
})
}
</div>
</div>
</div>
);
};
export default PopularDishes;
