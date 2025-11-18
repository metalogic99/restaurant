"use client";

import { SettingsTabs } from "@/components/admin/Settings/SettingsForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toaster } from "sonner";

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen space-y-6">
      <Toaster position="top-right" richColors />

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center border-b">
          <div>
            <CardTitle className="text-2xl font-bold">Settings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your store information
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <SettingsTabs />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
