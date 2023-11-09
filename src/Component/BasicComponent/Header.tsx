import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Modal from "react-modal";

interface HeaderProps {
  cartItemCount: number;
  selectedVariants: ProductVariant[];
  dataAPI: Product[];
  wishlistItems: boolean[];
  toggleWishlist: (index: number) => void;
}

interface ProductVariant {
  label: string;
  color: string;
  sku: string;
  price: number;
  reducedPrice?: number;
  thumbnail: string;
  image: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  vendor: string;
  tags?: string[];
  variants: ProductVariant[];
}

function Header({
  cartItemCount,
  selectedVariants,
  dataAPI,
  wishlistItems,
  toggleWishlist,
}: HeaderProps) {
  const notionData = "NOTION TASK";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setSelectedProductIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductIndex(0);
  };

  const selectedProduct = dataAPI[selectedProductIndex];
  const selectedVariant = selectedVariants[selectedProductIndex];

   const deleteFromWishlist = () => {
    const updatedWishlist = [...wishlistItems];
    updatedWishlist[selectedProductIndex] = false;
    toggleWishlist(selectedProductIndex); 
    closeModal(); 
  };



  return (
    <div>
      <header className="bg-gray-700 text-white font-bold py-2 px-4">
        <div className="container mx-auto p-3 flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-white font-bold">{notionData}</h1>
          </div>
          <div>
            <div className="relative flex items-center">
              <FaShoppingCart
                className="text-white text-2xl cursor-pointer"
                onClick={() => openModal(selectedProductIndex)}
              />
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
                  {cartItemCount}
                </span>
              )}
              <span
                className="text-white text-lg ml-2 cursor-pointer"
                onClick={() => openModal(selectedProductIndex)}
              >
                Wishlist
              </span>
            </div>
          </div>
        </div>
      </header>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Product Modal"
      >
        <div className="modal-content">
          {selectedProduct &&
          selectedVariant &&
          wishlistItems[selectedProductIndex] ? (
            <div>
              <div className="border w-full rounded mt-5 flex p-4 justify-between items-center flex-wrap">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHftdYGFyVJTVUUcDRDPZWrPRFTV-RsD_lew&usqp=CAU"
                  className="w-24"
                />
                <div className="w-2/3">
                  <h3 className="text-lg font-medium">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {" "}
                    {selectedProduct.description
                      .split(" ")
                      .slice(0, 15)
                      .join(" ")}
                    {selectedProduct.description.split(" ").length > 15
                      ? "..."
                      : ""}
                  </p>
                  <h4 className="text-red-700 text-xs font-bold mt-1">
                    {selectedProduct.vendor}
                  </h4>
                </div>
                <div>
                  <h4 className="text-3xl font-medium">
                    <sup className="text-lg text-purple-800"> </sup>{" "}
                    &#8377; {selectedVariant.price}
                  </h4>
                  <h5 className="text-sm font-bold text-purple-800">
                    {" "}
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: selectedVariant.color,
                        border: "1px solid white",
                        marginBottom: "5px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        float: "right",
                      }}
                    ></div>
                    <div className="w-full flex justify-between mt-4 float-right">
                      <button className="text-red-700 bg-red-100 px-3 py-1 rounded" onClick={deleteFromWishlist}>
                        DELETE
                      </button>
                    </div>
                  </h5>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-5">
              <p>No data available.</p>
            </div>
          )}
          <button
            className="float-right bg-gray-800 rounded text-white p-1 mt-5"
            onClick={closeModal}
          >
            Close Modal
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
