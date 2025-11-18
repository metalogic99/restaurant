"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormValues } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/auth.hooks";
import { toast } from "sonner";
import LoadingSmall from "@/components/shared/LoadingSmall";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onChange",
  });
  const { mutate: login, isPending: loginLoading } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-100">
        {/* Left Side Image */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-50 to-amber-50 items-center justify-center p-8">
          <Image
            src="/login.svg"
            alt="Login Illustration"
            width={320}
            height={320}
            className="object-contain drop-shadow-md"
            priority
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <Card className="w-full border-0 shadow-none bg-transparent">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Welcome Back
              </CardTitle>
              <p className="text-sm text-gray-500">Sign in to your account</p>
            </CardHeader>

            <CardContent className="space-y-6 mt-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700">
                    User Name
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="username"
                      type="username"
                      {...register("userName")}
                      placeholder="Enter your username"
                      className="pl-10 h-11 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  {errors.userName && touchedFields.userName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.userName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-11 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && touchedFields.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  {loginLoading ? <LoadingSmall /> : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
