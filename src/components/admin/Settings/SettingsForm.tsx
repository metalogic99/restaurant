"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Globe, Phone, MapPin, Store, Upload } from "lucide-react";
import { useGetSettings, useUpdateSettings } from "@/hooks/settings.hooks";
import { settingsSchema, SettingsFormValues } from "@/schemas/settings.schema";

export const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState("view");
  const { data: settings, isLoading, isError } = useGetSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayName: "",
      phoneNumber: "",
      location: "",
      logo: "",
    },
    values: settings,
  });

  useEffect(() => {
    if (settings?.logo) setLogoPreview(settings.logo);
  }, [settings]);

  useEffect(() => {
    return () => {
      if (logoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (data: SettingsFormValues) => {
    const formData = new FormData();
    formData.append("displayName", data.displayName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("location", data.location);

    if (logoFile) {
      formData.append("logo", logoFile);
    } else if (!logoPreview) {
      formData.append("logo", ""); // Signal removal
    }

    updateSettings(formData, {
      onSuccess: () => {
        toast.success("Settings updated successfully");
        setActiveTab("view");
      },
      onError: () => {
        toast.error("Failed to update settings");
      },
    });
  };

  if (isLoading) return <p>Loading settings...</p>;
  if (isError) return <p>Failed to load settings.</p>;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="view">View Settings</TabsTrigger>
        <TabsTrigger value="edit">Edit Settings</TabsTrigger>
      </TabsList>

      {settings ? (
        <TabsContent value="view">
          {/* VIEW MODE */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <Store className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <Label className="text-muted-foreground">Display Name</Label>
                <p className="text-lg font-medium mt-1">
                  {settings ? settings.displayName || "Not set" : "Not set"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <Globe className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <Label className="text-muted-foreground">Logo</Label>
                {settings.logo ? (
                  <div className="relative mt-2 h-16 w-16 rounded-lg border overflow-hidden">
                    <Image
                      src={settings.logo}
                      alt="Store Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-1">Not set</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <Label className="text-muted-foreground">Phone Number</Label>
                <p className="text-lg font-medium mt-1">
                  {settings.phoneNumber || "Not set"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <Label className="text-muted-foreground">Location</Label>
                <p className="text-lg font-medium mt-1">
                  {settings.location || "Not set"}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      ) : (
        <TabsContent value="view">
          <div>Settings not set yet</div>
        </TabsContent>
      )}

      <TabsContent value="edit">
        {/* EDIT MODE - FORM */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Display Name */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg mt-1">
              <Store className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                {...form.register("displayName")}
                placeholder="Your Store Name"
              />
              {form.formState.errors.displayName && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.displayName.message}
                </p>
              )}
            </div>
          </div>

          {/* Logo Upload */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg mt-1">
              <Globe className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Logo</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isPending}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {logoPreview && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleRemoveLogo}
                      disabled={isPending}
                    >
                      Remove Logo
                    </Button>
                  )}
                </div>

                {logoPreview && (
                  <div className="relative inline-block">
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-contain rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg mt-1">
              <Phone className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                {...form.register("phoneNumber")}
                placeholder="e.g. +977-9800000000"
              />
              {form.formState.errors.phoneNumber && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg mt-1">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...form.register("location")}
                placeholder="Kathmandu, Nepal"
              />
              {form.formState.errors.location && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("view")}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
};
