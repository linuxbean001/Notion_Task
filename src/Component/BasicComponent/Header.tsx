import { useState,useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


interface HeaderProps {
  cartItemCount: number;
  selectedVariants: ProductVariant[];
  dataAPI: Product[];
  wishlistItems: boolean[];
  toggleWishlist: (index: number) => void;
  cartItems: ProductVariant[];
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
  // selectedVariants,
  // dataAPI,
  wishlistItems,
  toggleWishlist,
  cartItems,
}: HeaderProps) {
  const notionData = "NOTION TASK";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [cartItemData, setCartItemData] = useState(cartItems)

  console.log("maje hi maje hai ", cartItemData);

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setSelectedProductIndex(index);
  };

   useEffect(() => {
    setCartItemData(cartItems);
  }, [cartItems]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductIndex(0);
  };

  // const selectedProduct = dataAPI[selectedProductIndex];
  // const selectedVariant = selectedVariants[selectedProductIndex];

const removeItemBySKU = (sku:any)=> {
  const updatedCartItems = cartItemData.filter((item) => item.sku !== sku);
  setCartItemData(updatedCartItems);
  
}








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
          <h1>
            {" "}
            <b className="text-2xl">Knoll</b>{" "}
            <span className="bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 p-1">
              {cartItemCount}
            </span>
          </h1>
          {cartItemData.length != 0 ? (
            <div>
              {cartItemData.map((item, index) => (
                <div  key={index}  className="border w- rounded mt-5 flex p-4 items-center flex-wrap">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHftdYGFyVJTVUUcDRDPZWrPRFTV-RsD_lew&usqp=CAU"
                    className="w-24"
                  />
                  <div className="">
                    <h3 className="text-lg font-medium">{item.sku}</h3>
                    <p className="text-gray-600 text-xs">{item.label}</p>
                  </div>
                  <div className="flex ml-auto">
                    <h4 className="text-lg font-medium mr-3">
                      <sup className="text-lg text-purple-800"> </sup> &euro;{" "}
                      {item.price}
                      <br />
                      
                       {
                        item.reducedPrice ? <span className="line-through">  &euro; {item.reducedPrice} </span> : ""
                       }
                     
                    </h4>

                    <h5 className="text-sm font-bold text-purple-800">
                      <div className="w-full flex justify-between mt-1 float-right">
                        <button
                          className="text-red-700 bg-red-100 border p-2 rounded"
                           onClick={() => removeItemBySKU(item.sku)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </h5>
                  </div>
                </div>
              ))}
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
