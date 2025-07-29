"use client";

import { DataTable } from "@/components/data-table";
import { RowAction } from "@/components/row-action";
import query from "@/constants/query-keys";
import { UserService } from "@/services";
import { Response } from "@/types/api";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  createColumnHelper,
  PaginationState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface UserTableProps {
  showDialog: (value: string) => void;
}

export default function UserTable({ showDialog }: UserTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const { data } = useQuery<Response<User[]>>({
    queryKey: query.users(pagination.pageIndex),
    queryFn: UserService.getUsers,
    initialData: { data: [], message: "", meta: {} },
  });

  const columnHelper = createColumnHelper<User>();
  const columns = useMemo<ColumnDef<User, string>[]>(
    () => [
      columnHelper.accessor("id", {
        header: "Id",
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <RowAction
            row={props.row}
            actions={[
              { type: "edit", handler: () => showDialog("edit-user") },
              { type: "delete", handler: () => showDialog("delete-user") },
            ]}
          />
        ),
      }),
    ],
    []
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={data.data}
        pagination={pagination}
        setPagination={setPagination}
        pageCount={data.meta?.pageCount || 0}
      />
    </>
  );
}
