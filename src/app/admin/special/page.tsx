"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Edit, Plus, Upload, X } from "lucide-react";
import CommonSection from "@/components/shared/CommonSection";
import Image from "next/image";
import { toast } from "sonner";
import { useAddSpecial, useGetSpecials } from "@/hooks/special.hooks";
import AdminError from "@/components/admin/AdminError";
import Loading from "@/components/shared/Loading";
import EditPop from "@/components/admin/Special/EditPop";
import DeleteSpecial from "@/components/guest/DeleteSpecial";

type SpecialItem = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function TodaySpecialAdmin() {
  const imageRef = useRef<HTMLInputElement>(null);
  const [newSpecial, setNewSpecial] = useState<SpecialItem>({
    name: "",
    description: "",
    price: 0,
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const { mutate: addSpecial, isPending } = useAddSpecial();
  const { data, isLoading, error } = useGetSpecials();

  const specials = useMemo(() => {
    return data ? data.specials : [];
  }, [data]);

  const handleAddSpecial = () => {
    if (!newSpecial.name || newSpecial.price <= 0 || !newSpecial.image) {
      toast.error("Invalid entry or Fill all required fields");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", newSpecial.name);
    formdata.append("description", newSpecial.description);
    formdata.append("price", String(newSpecial.price));
    formdata.append("image", newSpecial.image);
    addSpecial(formdata, {
      onSuccess: (data) => {
        toast.success(data.message);
        setNewSpecial({ name: "", description: "", price: 0, image: "" });
        setImagePreview("");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleRemoveImage = () => {
    setNewSpecial({ ...newSpecial, image: "" });
    setImagePreview("");
  };

  const handleImageUpload = (e: any) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    setNewSpecial({ ...newSpecial, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log("new special are", newSpecial);
  }, [newSpecial]);

  return (
    <CommonSection>
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold mb-4 mt-5 ">
          Manage Today&apos;s Specials
        </h3>

        <div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newSpecial.name}
                  onChange={(e) =>
                    setNewSpecial({ ...newSpecial, name: e.target.value })
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
                  value={newSpecial.description}
                  onChange={(e) =>
                    setNewSpecial({
                      ...newSpecial,
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
                  value={newSpecial.price || ""}
                  onChange={(e) =>
                    setNewSpecial({
                      ...newSpecial,
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
            </div>
            <button
              onClick={handleAddSpecial}
              className="bg-forestGreen text-white px-4 py-2 rounded hover:bg-darkGreen transition flex items-center gap-2"
            >
              <Plus size={18} />
              {isPending ? "Adding...." : " Add Special"}
            </button>
          </div>

          {error ? (
            <AdminError error={error} />
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-medium mb-3">
                Current Specials ({specials.length})
              </h4>

              {!specials || specials.length === 0 ? (
                <div>
                  {isLoading ? (
                    <div className="w-full h-30 flex items-center justify-center">
                      <Loading />
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No specials added yet
                    </p>
                  )}
                </div>
              ) : (
                <ul className="divide-y">
                  {specials.map((item, index) => (
                    <li
                      key={index}
                      className="py-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                        <p className="text-sm">Rs. {item.price}</p>
                      </div>
                      <Image
                        src={item.image}
                        width={300}
                        height={200}
                        alt="Image"
                      />
                      <div>
                        <EditPop special={item}>
                          <button
                            className="text-red-500 hover:text-red-700 p-2"
                            aria-label="Delete"
                          >
                            <Edit size={18} />
                          </button>
                        </EditPop>
                        <DeleteSpecial id={item._id}></DeleteSpecial>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </CommonSection>
  );
}
