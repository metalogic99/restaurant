"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SubCategoryHeader } from "@/components/admin/Sub Category/SubCategoryHeader";
import { SubCategoryForm } from "@/components/admin/Sub Category/AddSubCategoryForm";
import { SubCategoryTable } from "@/components/admin/Sub Category/SubCategoryTable";

export default function SubCategoryPage() {
  const [showForm, setShowForm] = useState(false);

  // const handleClick = () => {
  //   console.log("subcategory table clicked");
  //   alert("sub category table clicked");
  // };

  // onClick={handleClick}

  return (
    <div
      className="max-w-5xl mx-auto p-4 bg-gray-50 min-h-screen"
     
    >
      <Card className="mb-6">
        <SubCategoryHeader
          onAddNew={() => setShowForm(true)}
          showForm={showForm}
        />
        {showForm && <SubCategoryForm onCancel={() => setShowForm(false)} />}
      </Card>

      <Card>
        <CardContent className="p-6" >
          <SubCategoryTable />
        </CardContent>
      </Card>
    </div>
  );
}
