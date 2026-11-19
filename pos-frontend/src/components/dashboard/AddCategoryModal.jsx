import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { MdCategory } from "react-icons/md";

import { addCategory } from "../../https/index";

const AddCategoryModal = ({
  setIsAddCategoryModalOpen,
}) => {
  const queryClient = useQueryClient();

  const [categoryName, setCategoryName] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      setIsSubmitting(true);

      await addCategory({
        name: categoryName.trim(),
      });

      await queryClient.invalidateQueries({
        queryKey: ["menu"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["admin-dashboard"],
      });

      alert("Category added successfully.");

      setCategoryName("");

      setIsAddCategoryModalOpen(false);
    } catch (error) {
      console.error(
        "Add category error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to add category.";

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
          max-w-md
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
              <MdCategory
                className="
                  text-[#fb6100]
                  text-2xl
                "
              />
            </div>

            <div>
              <h2 className="text-white text-xl font-bold">
                Add Category
              </h2>

              <p className="text-[#8f8f8f] text-sm">
                Create a new menu category
              </p>
            </div>

          </div>

          <button
            onClick={() =>
              setIsAddCategoryModalOpen(false)
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

          <label className="text-[#ababab] text-sm">
            Category Name
          </label>

          <input
            type="text"
            value={categoryName}
            onChange={(e) =>
              setCategoryName(e.target.value)
            }
            placeholder="Example: Pizza"
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

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-3 mt-6">

            <button
              type="button"
              onClick={() =>
                setIsAddCategoryModalOpen(false)
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
              disabled={isSubmitting}
              className={`
                py-3
                rounded-xl
                text-white
                font-semibold
                transition
                ${
                  isSubmitting
                    ? "bg-[#777] cursor-not-allowed"
                    : "bg-[#fb6100] hover:bg-[#e55700]"
                }
              `}
            >
              {isSubmitting
                ? "Adding..."
                : "Add Category"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;