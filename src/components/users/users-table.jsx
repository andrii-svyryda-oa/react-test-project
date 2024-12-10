import { Button, Spin, Table } from "antd";
import { useFetchUsersQuery } from "../../hooks/useFetchUsers";
import { useState } from "react";
import { SearchInput } from "../common/search-input";
import { usersTableBaseColumns } from "./constants";
import { deleteUser } from "../../api/users.api";

export const UsersTable = () => {
  const [paginationData, setPaginationData] = useState({
    page: 1,
    pageSize: 6,
  });
  const [searchText, setSearchText] = useState("");

  const { usersData, error, isLoading, propagateDeleteUser } =
    useFetchUsersQuery(paginationData, searchText);

  if (error) {
    return <div>Error occurred: {error}</div>;
  }

  const onDeleteUser = async (userId) => {
    await deleteUser(userId);

    propagateDeleteUser(userId);
  };

  const allColumns = usersTableBaseColumns.concat([
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Button type="primary" color="red" onClick={() => onDeleteUser(row.id)}>
          Delete
        </Button>
      ),
    },
  ]);

  return (
    <div>
      <SearchInput onChange={setSearchText} />
      <Table
        loading={isLoading}
        dataSource={usersData?.data}
        columns={allColumns}
        pagination={{
          onChange: (page, pageSize) => {
            setPaginationData({ page, pageSize });
          },
          total: usersData?.total,
        }}
      />
    </div>
  );
};
