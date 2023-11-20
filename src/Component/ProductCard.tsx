// ProductCard.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Product, ProductVariant } from "./types";

interface ProductCardProps {
  product: Product;
  index: number;
  selectedVariants: ProductVariant[];
  wishlist: boolean[];
  handleColorClick: (variant: ProductVariant, productIndex: number) => void;
  toggleWishlist: (index: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  selectedVariants,
  wishlist,
  handleColorClick,
  toggleWishlist,
}) => {
  return (
    <div
      key={index}
      className="rounded-md border border-slate-500 overflow-hidden shadow-lg shadow-inner mt-5  m-4 bg-gray-700 maximumWidth"
    >
      <img
        className="w-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHftdYGFyVJTVUUcDRDPZWrPRFTV-RsD_lew&usqp=CAU"
      />
      <div className="mt-2">
        <div className="px-3 py-3">
          <h1 className="mb-2 font-medium text-white font">
            <b className="uppercase">{product.title}</b>
          </h1>
          <div className="text-gray-400 text-justify mb-2 font-normal subpixel-antialiased">
            {product.description.split(" ").slice(0, 15).join(" ")}
            {product.description.split(" ").length > 15 ? "..." : ""}
          </div>

          <p className="text-gray-400 text-base text-justify mb-2">
            <b className="text-gray-400">Vendor:</b> &nbsp;
            {product.vendor}
          </p>

          <div className="text-white text-sm text-justify mt-3 flex flex-col">
            <div className="flex">
              {product.variants.map((variant, vIndex) => (
                <div key={vIndex} className="mr-2">
                  <div
                    onClick={() => handleColorClick(variant, index)}
                    className="colorData"
                    style={{
                      backgroundColor: variant.color,
                      border: `${
                        selectedVariants[index]?.color === variant.color
                          ? "3px solid white"
                          : "1px solid white"
                      }`,
                      boxShadow:
                        selectedVariants[index]?.color === variant.color
                          ? "0 0 5px 2px rgba(0, 0, 0, 0.5)"
                          : "none",
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-between items-center">
              {selectedVariants[index] && (
                <p className="text-white text-lg flex">
                  {selectedVariants[index].reducedPrice && (
                    <p className="text-gray-400 text-lg line-through text-justify">
                      &euro; {selectedVariants[index].reducedPrice}
                    </p>
                  )}{" "}
                  &nbsp; &euro; <b>{selectedVariants[index].price}</b>
                </p>
              )}
              {/* wishlist section */}
              <span
                className={`cursor-pointer p-2 text-3xl flex items-center justify-center border w-14 border-white rounded-lg ${
                  wishlist[index] ? "bg-red-600" : "text-white"
                }`}
                onClick={() => toggleWishlist(index)}
              >
                <FontAwesomeIcon className="text-2xl" icon={faHeart} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
