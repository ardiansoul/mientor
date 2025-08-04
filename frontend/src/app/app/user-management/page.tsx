"use client";
import { AppDialog } from "@/components/app-dialog";
import { useDialog } from "@/hooks/use-dialog";
import UserTable from "./user-table";
import UserForm from "./user-form";
import { User } from "@/types/user";
import { ActionBar } from "@/components/action-bar";
import { ICONS } from "@/constants/icons";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services";
import query from "@/constants/query-keys";
import { client } from "@/app/wrapper";

export default function UserManagement() {
  const dialog = useDialog();

  const handleFormSuccess = () => {
    dialog.setIsOpen(false);
  };

  const mutation = useMutation({
    mutationFn: (id: string) => UserService.deleteUser(id),
    mutationKey: query.deleteUser(String(dialog?.data?.id)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: query.users(0) });
      dialog.setIsOpen(false);
    },
  });

  return (
    <div className="container px-10">
      <AppDialog
        isOpen={dialog.isOpen}
        setIsOpen={dialog.setIsOpen}
        title={`${capitalizeFirstLetter(dialog.type)} User`}
        description="This action will permanent"
        actions={[
          {
            variant: "solid",
            intent: "danger",
            text: "Cancel",
            handler: () => dialog.setIsOpen(false),
          },
          {
            type: "submit",
            variant: "solid",
            intent: "success",
            form: "user-form",
            // handler: () => console.log("triggered"),
            text: dialog.type.includes("delete") ? "Confirm" : "Submit",
            ...(dialog.type === "delete"
              ? { handler: () => mutation.mutateAsync(String(dialog.data.id)) }
              : {}),
          },
        ]}
      >
        {dialog.type !== "delete" ? (
          <UserForm
            initialData={dialog.data as unknown as User}
            actionType={dialog.type}
            id={String(dialog.data?.id ?? "")}
            onSubmitSuccess={handleFormSuccess}
          />
        ) : (
          <></>
        )}
      </AppDialog>
      <ActionBar
        title="Manajemen Produk"
        onSearch={(val) => console.log("Kirim ke backend:", val)}
        actions={[
          {
            variant: "solid",
            children: ICONS["i-add"],
            onClick: () => dialog.showDialog("create"),
          },
        ]}
      />
      <UserTable showDialog={dialog.showDialog} />
    </div>
  );
}
