import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import {
  getTables,
  deleteTable,
} from "../../https";

const DeleteTableModal = ({
  setIsDeleteTableModalOpen,
}) => {
  const queryClient = useQueryClient();

  const {
    data: resData,
    isLoading,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const tables = resData?.data?.data || [];

  const handleDelete = async (table) => {
    if (table.status === "Booked") {
      enqueueSnackbar(
        "Booked tables cannot be deleted.",
        {
          variant: "error",
        }
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete Table ${table.tableNo}?`
    );

    if (!confirmed) return;

    try {
      await deleteTable(table._id);

      enqueueSnackbar(
        `Table ${table.tableNo} deleted successfully.`,
        {
          variant: "success",
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message ||
          "Failed to delete table.",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] border border-[#343434] rounded-2xl w-[500px] max-h-[650px] overflow-hidden">

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#343434]">
          <div>
            <h2 className="text-white text-xl font-bold">
              Delete Table
            </h2>

            <p className="text-[#8f8f8f] text-sm mt-1">
              Select an available table to delete
            </p>
          </div>

          <button
            onClick={() =>
              setIsDeleteTableModalOpen(false)
            }
            className="text-[#ababab] hover:text-white"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="p-5 max-h-[500px] overflow-y-auto">
          {isLoading ? (
            <p className="text-[#ababab] text-center py-10">
              Loading tables...
            </p>
          ) : tables.length === 0 ? (
            <p className="text-[#ababab] text-center py-10">
              No tables found.
            </p>
          ) : (
            <div className="space-y-3">
              {tables.map((table) => {
                const isBooked =
                  table.status === "Booked";

                return (
                  <div
                    key={table._id}
                    className="flex items-center justify-between bg-[#252525] border border-[#343434] rounded-xl px-4 py-4"
                  >
                    <div>
                      <h3 className="text-white font-semibold">
                        Table {table.tableNo}
                      </h3>

                      <p className="text-[#8f8f8f] text-sm mt-1">
                        {table.seats} seats •{" "}
                        {table.status}
                      </p>
                    </div>

                    <button
                      disabled={isBooked}
                      onClick={() =>
                        handleDelete(table)
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                        isBooked
                          ? "bg-[#333] text-[#666] cursor-not-allowed"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <MdDelete size={17} />
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteTableModal;