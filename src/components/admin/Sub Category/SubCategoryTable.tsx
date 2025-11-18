// "use client";
// import { Trash2 } from "lucide-react";
// import { useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { toast } from "sonner";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   useDeleteSubCategory,
//   useGetSubCategories,
// } from "@/hooks/sub-category.hooks";
// import { AlertDialogConfirm } from "./AlertDialogConfirm";
// import EditSubCategoryDialog from "./EditSubCategory";
// import AddProductForm from "../Product/ProductForm";
// import ProductTable from "../Product/ProductTable";

// export function SubCategoryTable() {
//   const { data: subcategories, isLoading, isError } = useGetSubCategories();
//   const { mutate: deleteSubCategory, isPending: isDeleting } =
//     useDeleteSubCategory();

//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);

//   const handleDelete = (id: string) => {
//     deleteSubCategory(id, {
//       onSuccess: () => {
//         toast.success("Subcategory deleted successfully");
//       },
//       onError: () => {
//         toast.error("Failed to delete subcategory");
//       },
//     });
//   };

//   const handleRowClick = (subcategory) => {
//     console.log("Subcategory clicked:", subcategory);
//     setSelectedSubcategory(subcategory);
//     setIsDialogOpen(true);
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         {[...Array(3)].map((_, i) => (
//           <Skeleton key={i} className="h-12 w-full" />
//         ))}
//       </div>
//     );
//   }

//   if (isError) {
//     return <div>Error loading subcategories</div>;
//   }

//   if (!subcategories || subcategories.length === 0) {
//     return <div>No subcategories found</div>;
//   }

//   return (
//     <>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Parent Category</TableHead>
//             <TableHead>Subcategory Name</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {subcategories.map((subcategory) => (
//             <TableRow
//               key={subcategory._id}
//               onClick={() => handleRowClick(subcategory)}
//               className="cursor-pointer hover:bg-gray-50"
//             >
//               <TableCell className="font-medium">
//                 {subcategory.parentCategory?.name || "No Category"}
//               </TableCell>
//               <TableCell className="font-semibold">
//                 {subcategory.name}
//               </TableCell>
//               <TableCell className="text-right">
//                 <div className="flex gap-2 justify-end">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={(e) => e.stopPropagation()} // Prevent row click when clicking edit
//                   >
//                     <EditSubCategoryDialog subcategory={subcategory} />
//                   </Button>
//                   <AlertDialogConfirm
//                     title={`Delete ${subcategory.name}?`}
//                     description="This action cannot be undone. This will permanently delete the subcategory."
//                     onConfirm={() => handleDelete(subcategory._id)}
//                   >
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       disabled={isDeleting}
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <Trash2 size={16} className="text-red-500" />
//                     </Button>
//                   </AlertDialogConfirm>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//           <AlertDialogHeader className="flex-shrink-0">
//             <AlertDialogTitle className="text-xl">
//               {selectedSubcategory?.name} - Products
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               Manage products for "{selectedSubcategory?.name}" subcategory
//             </AlertDialogDescription>
//           </AlertDialogHeader>

//           <div className="flex-1 overflow-y-auto space-y-4">
//             {/* Add Product Button */}
//             <div className="flex justify-between items-center border-b pb-3">
//               <h3 className="text-lg font-semibold">Products</h3>
//               <Button
//                 onClick={() => setIsAddProductFormOpen(true)}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 Add Product
//               </Button>
//             </div>

//             {/* Products Table */}
//             {selectedSubcategory && (
//               <ProductTable subcategoryId={selectedSubcategory._id} />
//             )}
//           </div>

//           <AlertDialogFooter className="flex-shrink-0 border-t pt-4">
//             <AlertDialogCancel>Close</AlertDialogCancel>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Add Product Form Dialog */}
//       <AlertDialog
//         open={isAddProductFormOpen}
//         onOpenChange={setIsAddProductFormOpen}
//       >
//         <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               Add Product 
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               Create a new product 
//               subcategory
//             </AlertDialogDescription>
//           </AlertDialogHeader>

//           {selectedSubcategory && (
//             <AddProductForm
//               onSuccessClose={() => setIsAddProductFormOpen(false)}
//               defaultSubcategory={selectedSubcategory._id}
//             />
//           )}
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }


"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteSubCategory,
  useGetSubCategories,
} from "@/hooks/sub-category.hooks";
import { AlertDialogConfirm } from "./AlertDialogConfirm";
import EditSubCategoryDialog from "./EditSubCategory";
import AddProductForm from "../Product/ProductForm";
import ProductTable from "../Product/ProductTable";

// Define the SubCategory interface
interface SubCategory {
  _id: string;
  name: string;
  parentCategory?: {
    _id: string;
    name: string;
  };
}

export function SubCategoryTable() {
  const { data: subcategories, isLoading, isError } = useGetSubCategories();
  const { mutate: deleteSubCategory, isPending: isDeleting } =
    useDeleteSubCategory();

  // Properly type the selectedSubcategory state
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteSubCategory(id, {
      onSuccess: () => {
        toast.success("Subcategory deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete subcategory");
      },
    });
  };

  const handleRowClick = (subcategory: SubCategory) => {
    console.log("Subcategory clicked:", subcategory);
    setSelectedSubcategory(subcategory);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading subcategories</div>;
  }

  if (!subcategories || subcategories.length === 0) {
    return <div>No subcategories found</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parent Category</TableHead>
            <TableHead>Subcategory Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcategories.map((subcategory: SubCategory) => (
            <TableRow
              key={subcategory._id}
              onClick={() => handleRowClick(subcategory)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell className="font-medium">
                {subcategory.parentCategory?.name || "No Category"}
              </TableCell>
              <TableCell className="font-semibold">
                {subcategory.name}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()} // Prevent row click when clicking edit
                  >
                    <EditSubCategoryDialog subcategory={subcategory} />
                  </Button>
                  <AlertDialogConfirm
                    title={`Delete ${subcategory.name}?`}
                    description="This action cannot be undone. This will permanently delete the subcategory."
                    onConfirm={() => handleDelete(subcategory._id)}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isDeleting}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </AlertDialogConfirm>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <AlertDialogHeader className="flex-shrink-0">
            <AlertDialogTitle className="text-xl">
              {selectedSubcategory?.name} - Products
            </AlertDialogTitle>
            <AlertDialogDescription>
              Manage products 
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Add Product Button */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">Products</h3>
              <Button
                onClick={() => setIsAddProductFormOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Add Product
              </Button>
            </div>

            {/* Products Table */}
            {selectedSubcategory && (
              <ProductTable subcategoryId={selectedSubcategory._id} />
            )}
          </div>

          <AlertDialogFooter className="flex-shrink-0 border-t pt-4">
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Product Form Dialog */}
      <AlertDialog
        open={isAddProductFormOpen}
        onOpenChange={setIsAddProductFormOpen}
      >
        <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Add Product to {selectedSubcategory?.name}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Create a new product 
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedSubcategory && (
            <AddProductForm
              onSuccessClose={() => setIsAddProductFormOpen(false)}
              defaultSubcategory={selectedSubcategory._id}
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}