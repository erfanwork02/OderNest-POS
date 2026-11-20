import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { BiSolidDish } from "react-icons/bi";

import {
  addDish,
  getMenu,
} from "../../https/index";

const AddDishModal = ({
  setIsAddDishModalOpen,
}) => {
  const queryClient = useQueryClient();

  const [categoryId, setCategoryId] =
    useState("");

  const [dishName, setDishName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const {
    data: menuResponse,
    isLoading,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  const categories =
    menuResponse?.data?.data || [];

  useEffect(() => {
    if (
      categories.length > 0 &&
      !categoryId
    ) {
      setCategoryId(
        categories[0]._id
      );
    }
  }, [categories, categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      alert(
        "Please select a category."
      );
      return;
    }

    if (!dishName.trim()) {
      alert(
        "Please enter a dish name."
      );
      return;
    }

    if (
      price === "" ||
      Number(price) < 0
    ) {
      alert(
        "Please enter a valid price."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await addDish({
        categoryId,
        name: dishName.trim(),
        price: Number(price),
        description:
          description.trim(),
      });

      await queryClient.invalidateQueries({
        queryKey: ["menu"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["admin-dashboard"],
      });

      alert(
        "Dish added successfully."
      );

      setDishName("");
      setPrice("");
      setDescription("");

      setIsAddDishModalOpen(false);
    } catch (error) {
      console.error(
        "Add dish error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to add dish.";

      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-[100]
        px-4
      "
    >
      <div
        className="
          bg-[#1f1f1f]
          border
          border-[#303030]
          rounded-2xl
          w-full
          max-w-lg
          p-6
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-[#fb6100]/10
                flex
                items-center
                justify-center
              "
            >
              <BiSolidDish
                className="
                  text-[#fb6100]
                  text-2xl
                "
              />
            </div>

            <div>
              <h2 className="text-white text-xl font-bold">
                Add Dish
              </h2>

              <p className="text-[#8f8f8f] text-sm">
                Add a new item to a menu category
              </p>
            </div>

          </div>

          <button
            onClick={() =>
              setIsAddDishModalOpen(false)
            }
            className="
              text-[#ababab]
              hover:text-white
              text-2xl
              transition
            "
          >
            <IoClose />
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* CATEGORY */}
          <div>
            <label className="text-[#ababab] text-sm">
              Category
            </label>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value
                )
              }
              disabled={isLoading}
              className="
                w-full
                mt-2
                bg-[#252525]
                border
                border-[#343434]
                text-white
                px-4
                py-3
                rounded-xl
                outline-none
                focus:border-[#fb6100]
                transition
              "
            >
              {isLoading && (
                <option>
                  Loading...
                </option>
              )}

              {!isLoading &&
                categories.length === 0 && (
                  <option value="">
                    No categories available
                  </option>
                )}

              {categories.map(
                (category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* DISH NAME */}
          <div className="mt-4">
            <label className="text-[#ababab] text-sm">
              Dish Name
            </label>

            <input
              type="text"
              value={dishName}
              onChange={(e) =>
                setDishName(
                  e.target.value
                )
              }
              placeholder="Example: Cheese Pizza"
              className="
                w-full
                mt-2
                bg-[#252525]
                border
                border-[#343434]
                text-white
                px-4
                py-3
                rounded-xl
                outline-none
                focus:border-[#fb6100]
                transition
              "
            />
          </div>

          {/* PRICE */}
          <div className="mt-4">
            <label className="text-[#ababab] text-sm">
              Price
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              placeholder="Example: 12.99"
              className="
                w-full
                mt-2
                bg-[#252525]
                border
                border-[#343434]
                text-white
                px-4
                py-3
                rounded-xl
                outline-none
                focus:border-[#fb6100]
                transition
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4">
            <label className="text-[#ababab] text-sm">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Optional description"
              rows={3}
              className="
                w-full
                mt-2
                bg-[#252525]
                border
                border-[#343434]
                text-white
                px-4
                py-3
                rounded-xl
                outline-none
                focus:border-[#fb6100]
                transition
                resize-none
              "
            />
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-3 mt-6">

            <button
              type="button"
              onClick={() =>
                setIsAddDishModalOpen(false)
              }
              className="
                bg-[#252525]
                border
                border-[#343434]
                text-white
                py-3
                rounded-xl
                font-semibold
                hover:bg-[#303030]
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                categories.length === 0
              }
              className={`
                py-3
                rounded-xl
                text-white
                font-semibold
                transition
                ${
                  isSubmitting ||
                  categories.length === 0
                    ? "bg-[#777] cursor-not-allowed"
                    : "bg-[#fb6100] hover:bg-[#e55700]"
                }
              `}
            >
              {isSubmitting
                ? "Adding..."
                : "Add Dish"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDishModal;