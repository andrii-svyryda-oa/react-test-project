import { useEffect, useMemo, useState } from "react";
import { getUsers } from "../api/users.api";

export const useFetchUsersQuery = (paginationData, searchText) => {
  const [usersData, setUsersData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const usersData = await getUsers(paginationData);

      setUsersData(usersData);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [paginationData]);

  const propagateDeleteUser = (userId) => {
    setDeletedUsers([...deletedUsers, userId]);
  };

  const filteredUsersData = useMemo(() => {
    if (!usersData) return usersData;

    const lowerSearchText = searchText.toLowerCase();

    return {
      ...usersData,
      data: usersData.data.filter(
        (u) =>
          (u.email.includes(lowerSearchText) ||
            u.first_name.includes(lowerSearchText) ||
            u.last_name.includes(lowerSearchText)) &&
          !deletedUsers.includes(u.id)
      ),
    };
  }, [usersData, searchText, deletedUsers]);

  return {
    isLoading,
    error,
    usersData: filteredUsersData,
    propagateDeleteUser,
  };
};
