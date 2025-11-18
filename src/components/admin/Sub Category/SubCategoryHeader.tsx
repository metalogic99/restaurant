"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useGetSubCategories } from "@/hooks/sub-category.hooks";

interface SubCategoryHeaderProps {
  onAddNew: () => void;
  showForm: boolean;
}

export function SubCategoryHeader({
  onAddNew,
  showForm,
}: SubCategoryHeaderProps) {
  const { data: subcategories = [] } = useGetSubCategories();

  return (
    <CardHeader className="flex flex-row justify-between items-center">
      <div>
        <CardTitle className="text-2xl">
          Subcategories ({subcategories.length}){" "}
        </CardTitle>
        <CardDescription>
          Manage subcategories under menu categories
        </CardDescription>
      </div>
      <Button className="gap-2" onClick={onAddNew} disabled={showForm}>
        <Plus size={20} />
        Add Subcategory
      </Button>
    </CardHeader>
  );
}
