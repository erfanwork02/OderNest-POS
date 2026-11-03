import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../https/index";

export default function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await getOrders()).data.data,
    refetchOnWindowFocus: true,
  });
}
