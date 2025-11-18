import React from "react";

const ProductCard = ({
  product,
  tableId,
}: {
  product: Product;
  tableId: string;
}) => {
  const addProduct = () => {
    let addedProducts;
    const currentProduct = JSON.parse(localStorage.getItem(tableId) as string);
    if (!currentProduct) {
      addedProducts = [
        {
          product,
          quantity: 1,
          notes: "",
        },
      ];
    } else {
      const productExists = currentProduct.find(
        (current: any) => current.product._id === product._id
      );
      if (productExists) {
        addedProducts = currentProduct.map((current: any) => {
          if (current.product._id === product._id) {
            return { ...current, quantity: current.quantity + 1 };
          } else {
            return current;
          }
        });
      } else {
        const addedProduct = {
          product,
          quantity: 1,
          notes: "",
        };
        currentProduct.push(addedProduct);
        addedProducts = currentProduct;
        console.log(addedProducts);
      }
    }
    localStorage.setItem(tableId, JSON.stringify(addedProducts));
    window.dispatchEvent(new Event("local-storage-change"));
  };
  return (
    <div className=" p-4 flex justify-between items-start border-b border-gray-200 relative">
      <div>
        <h3 className="font-semibold italic text-lg text-[#1c2b22]">
          {product.name}
        </h3>
        <p className="text-sm italic text-[#1c2b22] mt-1 max-w-xs">
          {product.description}
        </p>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <p className="font-medium text-[#1c2b22]">Rs. {product.price}</p>
        <button
          onClick={addProduct}
          className="bg-forestGreen  text-white font-semibold text-sm px-4 py-1 rounded-full shadow-sm hover:bg-forestGreen/90 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
