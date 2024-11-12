import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { USER_DATA, USER_WITHOUT_ID } from "@/type";

import axios from "axios";
import toast from "react-hot-toast";

type AppContextType = {
  displayModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  initialUserFormData: USER_DATA;
  userList: USER_DATA[];
  userFormData: USER_WITHOUT_ID;
  setUserFormData: Dispatch<SetStateAction<USER_WITHOUT_ID>>;
  updateUserId: string | null;
  setUpdateUserId: Dispatch<SetStateAction<string | null>>;
  fetchUserList: () => Promise<void>;
  addNewUser: (data: USER_WITHOUT_ID) => Promise<void>;
  editUser: (data: USER_WITHOUT_ID, id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
};

const initialUserFormData: USER_DATA = {
  id: "",
  username: "",
  email: "",
  dob: new Date(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = () => {
    setDisplayModal(true);
  };
  const closeModal = () => {
    setDisplayModal(false);
  };
  const [userList, setUserList] = useState<USER_DATA[]>([]);
  const [userFormData, setUserFormData] =
    useState<USER_WITHOUT_ID>(initialUserFormData);
  const [updateUserId, setUpdateUserId] = useState<string | null>(null);

  //  fetch user list
  const fetchUserList = async () => {
    try {
      const apiResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user`
      );
      if (apiResponse.data) {
        setUserList(apiResponse.data);
      } else {
        toast.error("Failed to fetch user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };
  //  add new user
  const addNewUser = async (data: USER_WITHOUT_ID) => {
    try {
      const apiResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          ...data,
        }
      );
      if (apiResponse.data.success) {
        setUserList((prev) => [...prev, apiResponse.data.user]);
        toast.success("User added successfully");
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };
  //  edit user
  const editUser = async (data: USER_WITHOUT_ID, id: string) => {
    try {
      const apiResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          id: id,
          ...data,
        }
      );
      if (apiResponse.data.success) {
        setUserList((prev) =>
          prev.map((user) => (user.id === id ? { id: id, ...data } : user))
        );
        toast.success("User updated successfully");
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };
  //  delete user
  const deleteUser = async (id: string) => {
    try {
      const apiResponse = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user?id=${id}`
      );
      if (apiResponse.data.success) {
        setUserList((prev) => prev.filter((user) => user.id !== id));
        toast.success("User removed successfully");
      } else {
        toast.error("Failed to remove user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const values = {
    displayModal,
    openModal,
    closeModal,
    initialUserFormData,
    userList,
    //form data
    userFormData,
    setUserFormData,
    //
    updateUserId,
    setUpdateUserId,

    // CRUD functions
    fetchUserList,
    addNewUser,
    editUser,
    deleteUser,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext hook must be used within AppContextProvider"
    );
  }
  return context;
};
