"use client";

import AddCategoryAlert from "@/components/admin/Category/AddCategoryAlert";
import CategoryTable from "@/components/admin/Category/CategoryTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetCategories } from "@/hooks/category.hooks";

const AddCategory = () => {
  const { data: categories = [], isError, isLoading } = useGetCategories();

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen space-y-6">
      <Card className="shadow-md rounded-lg">
        <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">
              Menu Categories
            </CardTitle>
          </div>
          <div>
            <AddCategoryAlert />
          </div>
        </CardHeader>
      </Card>

      {/* Categories Table */}
      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Current Categories ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isError ? (
            <p className="text-red-500">Failed to load categories</p>
          ) : isLoading ? (
            <p>Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-500">
              No categories found. Add your first category!
            </p>
          ) : (
            <CategoryTable categories={categories} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategory;
