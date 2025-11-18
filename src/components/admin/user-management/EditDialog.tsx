"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValues, userFormSchema } from "@/schemas/user.schema";
import { toast } from "sonner";
import { useUpdateUsers } from "@/hooks/user.hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface UserUpdateDialogProps {
  user: User;
  onSuccess?: () => void;
}

const UserUpdateDialog = ({ user, onSuccess }: UserUpdateDialogProps) => {
  const [open, setOpen] = useState(false);
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
      fullName: user.fullName,
      userName: user.userName, 
      password: "",
      role: user.role,
    },
  });

  useEffect(() => {
    reset({
      fullName: user.fullName,
      userName: user.userName, 
      password: "",
      role: user.role,
    });
  }, [user, reset]);

  const { mutate: updateUser, isPending } = useUpdateUsers();

  const onSubmit = (data: UserFormValues) => {
    updateUser(
      { id: user._id, data },
      {
        onSuccess: (res) => {
          toast.success(res?.success || "User updated successfully");
          reset();
          setOpen(false);
          onSuccess?.();
        },
        onError: (err: Error) => {
          toast.error(err?.message || "Failed to update user");
        },
      }
    );
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const isLoading = isSubmitting || isPending;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[500px] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Update User
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2 px-1">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter full name"
              {...register("fullName")}
              disabled={isLoading}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
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
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password (optional)"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update User"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserUpdateDialog;
