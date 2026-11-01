import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "../https";
import { setUser, removeUser } from "../redux/slices/userSlice";

const useLoadData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
  try {
    const { data } = await getUserData();
    console.log(data);
    const { _id, name, email, phone, role } = data.data;
dispatch(setUser({ _id, name, email, phone, role }));
   } catch (error) {
  dispatch(removeUser());
  console.log(error);
} finally {
  setIsLoading(false);
}
  };

      fetchUser();
  }, [dispatch]);

  return isLoading;
};

export default useLoadData;