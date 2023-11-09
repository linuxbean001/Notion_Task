import { useState, useEffect } from "react";
import "./NotionCard.css";
import Header from "./BasicComponent/Header";

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

function NotionCard() {
  const [dataAPI, setDataAPI] = useState<Product[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<ProductVariant[]>(
    []
  );
  const [wishlist, setWishlist] = useState<boolean[]>([]);
  const [cartItems, setCartItems] = useState<ProductVariant[]>([]);

  // console.log("cartItems",cartItems)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://1b79c99a-654a-43c7-ae32-74467dfcff23.mock.pstmn.io/api/v1/products"
        );
        if (response.ok) {
          const data = await response.json();
          setDataAPI(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dataAPI.length > 0 && selectedVariants.length !== dataAPI.length) {
      const defaultVariants: ProductVariant[] = dataAPI.map(
        (product) => product.variants[0]
      );
      setSelectedVariants(defaultVariants);
    }
  }, [dataAPI, selectedVariants]);

  const handleColorClick = (variant: ProductVariant, productIndex: number) => {
    const updatedVariants = [...selectedVariants];
    updatedVariants[productIndex] = variant;
    setSelectedVariants(updatedVariants);
  };

  

  const toggleWishlist = (index: number) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist[index] = !updatedWishlist[index];
    setWishlist(updatedWishlist);


    // Add or remove items to/from the cart based on wishlist toggle
    const selectedVariant = selectedVariants[index];
    const updatedCart = updatedWishlist.reduce((cart, wish, idx) => {
      if (wish) {
        cart.push(selectedVariants[idx]);
      }
      return cart;
    }, [] as ProductVariant[]);
    setCartItems(updatedCart);
  };

  console.log("add",selectedVariants)

  return (
    <div>
      <Header
        cartItemCount={cartItems.length}
        selectedVariants={selectedVariants}
        dataAPI={dataAPI}
        wishlistItems={wishlist}
        toggleWishlist={toggleWishlist}
      />
      <div className="flex flex-wrap mt-5 justify-center">
        {dataAPI.map((product, index) => (
          <div
            key={index}
            className="rounded overflow-hidden shadow-lg shadow-inner mt-5  m-4"
            style={{ maxWidth: "300px", marginTop: "50px" }}
          >
            <img
              className="w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHftdYGFyVJTVUUcDRDPZWrPRFTV-RsD_lew&usqp=CAU"
            />
            <div className="bg-gray-700 mt-2">
              <div className="px-3 py-3">
                <h1 className="mb-2 font-medium text-center text-lg text-white">
                  <b>{product.title}</b>
                </h1>
                <div className="text-white text-justify mb-2">
                  {product.description.split(" ").slice(0, 15).join(" ")}
                  {product.description.split(" ").length > 15 ? "..." : ""}
                </div>

                <p className="text-white text-base text-justify mb-2">
                  <b className="text-white">Vendor:</b> &nbsp;{product.vendor}
                </p>
                <div
                  className="text-white text-sm text-justify mt-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex" }}>
                    {product.variants.map((variant, vIndex) => (
                      <div key={vIndex} style={{ marginRight: "10px" }}>
                        <div
                          onClick={() => handleColorClick(variant, index)}
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: variant.color,
                            border: "1px solid white",
                            marginBottom: "5px",
                            cursor: "pointer",
                            borderRadius: "8px",
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-between">
                    {selectedVariants[index] && (
                      <p className="text-white text-lg flex">
                        &#8377; <b>{selectedVariants[index].price}</b> &nbsp;
                        {selectedVariants[index].reducedPrice && (
                          <p className="text-white text-lg line-through">
                            {selectedVariants[index].reducedPrice}
                          </p>
                        )}
                      </p>
                    )}
                    {/* wishlist section */}
                    <span
                      className="cursor-pointer text-3xl"
                      onClick={() => toggleWishlist(index)}
                    >
                      {wishlist[index] ? "❤️" : "🤍"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotionCard;
