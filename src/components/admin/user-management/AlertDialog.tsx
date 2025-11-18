"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValues, userFormSchema } from "@/schemas/user.schema";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "@/hooks/user.hooks";
import { useState } from "react";

interface AddUserAlertDialogProps {
  onSuccess?: () => void;
}

const AddUserAlertDialog = ({ onSuccess }: AddUserAlertDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      password: "",
      userName: "",
      role: undefined,
    },
  });

  const { mutate: createUser } = useCreateUser();

  const onSubmit = (data: UserFormValues) => {
    setIsCreating(true);

    createUser(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "User created successfully");
        reset();
        setOpen(false);
        setIsCreating(false);
        onSuccess?.(); //  trigger parent callback
      },
      onError: (err: Error) => {
        toast.error(err?.message || "Failed to create user");
        setIsCreating(false);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
    setIsCreating(false);
  };

  const isLoading = isSubmitting || isCreating;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[500px] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Create New User
          </AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2 px-1">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter full name"
              {...register("fullName")}
              disabled={isLoading}
            />
            {errors.fullName ? (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            ) : (
              <p className="text-gray-500 text-sm">Enter full name</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="userName">Username *</Label>
            <Input
              id="userName"
              placeholder="Enter username"
              {...register("userName")}
              disabled={isLoading}
            />
            {errors.userName ? (
              <p className="text-red-500 text-sm">{errors.userName.message}</p>
            ) : (
              <p className="text-gray-500 text-sm">Enter username</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password ? (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            ) : (
              <p className="text-gray-500 text-sm">Minimum 6 characters</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waiter">Waiter</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="chef">Chef</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <AlertDialogFooter className="pt-4">
            <AlertDialogCancel onClick={handleCancel} disabled={isLoading}>
              Cancel
            </AlertDialogCancel>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add User"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddUserAlertDialog;
