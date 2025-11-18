import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUpdateSpecial } from "@/hooks/special.hooks";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const EditPop = ({
  children,
  special,
}: {
  children: React.ReactNode;
  special: Special;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [updatedSpecial, setUpdatedSpecial] = useState<Special>(special);
  const [imagePreview, setImagePreview] = useState<string>(special.image);
  const { mutate: updateSpecial, isPending } = useUpdateSpecial();

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setUpdatedSpecial({ ...updatedSpecial, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUpdatedSpecial({ ...updatedSpecial, image: "" });
    setImagePreview("");
  };

  const handleUpdateSpecial = () => {
    if (
      !updatedSpecial.name ||
      updatedSpecial.price <= 0 ||
      !updatedSpecial.image
    ) {
      toast.error("Invalid entry or Fill all required fields");
      return;
    }
    console.log(updatedSpecial);
    const formdata = new FormData();
    formdata.append("name", updatedSpecial.name);
    formdata.append("description", updatedSpecial.description as string);
    formdata.append("price", String(updatedSpecial.price));
    formdata.append("image", updatedSpecial.image);

    updateSpecial(
      { sendData: formdata, specialId: special._id },
      {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Today&apos;s Special</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={updatedSpecial.name}
              onChange={(e) =>
                setUpdatedSpecial({ ...updatedSpecial, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Item name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              value={updatedSpecial.description}
              onChange={(e) =>
                setUpdatedSpecial({
                  ...updatedSpecial,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Price (Rs.)
            </label>
            <input
              type="number"
              step="any"
              value={updatedSpecial.price || ""}
              onChange={(e) =>
                setUpdatedSpecial({
                  ...updatedSpecial,
                  price: Number(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
              placeholder="Price"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              hidden
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {!imagePreview ? (
              <div
                onClick={() => imageRef.current?.click()}
                className="border-2 cursor-pointer border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-forestGreen transition"
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
              </div>
            ) : (
              <div className="relative">
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    width={300}
                    height={400}
                  />
                </div>
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdateSpecial}>
            {isPending ? "Editing.." : "Edit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditPop;
