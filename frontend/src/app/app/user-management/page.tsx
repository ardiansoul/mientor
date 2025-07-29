"use client";
import { AppDialog } from "@/components/app-dialog";
import { useDialog } from "@/hooks/use-dialog";
import UserTable from "./user-table";
import UserForm from "./user-form";
import { User } from "@/types/user";

export default function UserManagement() {
  const dialog = useDialog();

  const handleFormSuccess = () => {
    dialog.setIsOpen(false);
    // Tambahkan refetch data table jika perlu
  };
  return (
    <div className="container p-10">
      <AppDialog
        isOpen={dialog.isOpen}
        setIsOpen={dialog.setIsOpen}
        title={dialog.type.includes("delete") ? "Delete User" : "Update User"}
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
          },
        ]}
      >
        <UserForm
          initialData={dialog.data as unknown as User}
          actionType={dialog.type}
          id={String(dialog.data?.id ?? "")}
          onSubmitSuccess={handleFormSuccess}
        />
      </AppDialog>
      <UserTable showDialog={dialog.showDialog} />
    </div>
  );
}
