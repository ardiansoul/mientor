import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services";
import query from "@/constants/query-keys";
import { User } from "@/types/user";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ICONS } from "@/constants/icons";
import { Info } from "lucide-react";
import { client } from "@/app/wrapper";

const userFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phone: z.string(),
  roleId: z.string(),
  avatarUrl: z.string(),
});

interface UserFormProps {
  id?: string; // Jadikan optional untuk mode add
  initialData: Partial<User>;
  actionType: string;
  onSubmitSuccess?: () => void; // Callback untuk success
}

export default function UserForm({
  initialData,
  id,
  actionType,
  onSubmitSuccess,
}: UserFormProps) {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: initialData.firstName ?? "",
      lastName: initialData.lastName ?? "",
      email: initialData.email ?? "",
      phone: initialData.phone ?? "",
      roleId: initialData.roleId ?? "",
      avatarUrl: initialData.avatarUrl ?? "",
    },
  });

  const { mutateAsync, error } = useMutation({
    mutationFn:
      actionType === "update"
        ? (data: User) => UserService.updateUser(id!, data)
        : (data: User) => UserService.createUser(data),
    mutationKey:
      actionType === "update" ? query.updateUser(id!) : query.addUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: query.users(0) });
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    console.log("submited");
    await mutateAsync(values as User);
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Form {...form}>
      {error ? (
        <Alert>
          <Info />
          <AlertTitle>{error?.response?.data?.message}</AlertTitle>
        </Alert>
      ) : null}
      <form id="user-form" onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
