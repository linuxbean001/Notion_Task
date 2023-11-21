import { useState, useEffect } from "react";
import "./NotionCard.css";
import Header from "./BasicComponent/Header";
import ProductCard from "./ProductCard";

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
  const [cartItemCount, setCartItemCount] = useState(cartItems.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hiring-workspace.vercel.app/api/v1/furniture"
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

    const updatedCart = updatedWishlist.reduce((cart, wish, idx) => {
      if (wish) {
        cart.push(selectedVariants[idx]);
      }
      return cart;
    }, [] as ProductVariant[]);
    setCartItems(updatedCart);
    setCartItemCount(updatedCart.length);
  };

  return (
    <div>
      <Header
        cartItemCount={cartItemCount}
        selectedVariants={selectedVariants}
        dataAPI={dataAPI}
        wishlistItems={wishlist}
        toggleWishlist={toggleWishlist}
        cartItems={cartItems}
        updateCartItemCount={(newCount) => setCartItemCount(newCount)}
        setWishlist={(newWishlist) => setWishlist(newWishlist)}
      />
      <div className="flex flex-wrap mt-5 justify-center">
        {dataAPI.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            index={index}
            selectedVariants={selectedVariants}
            wishlist={wishlist}
            handleColorClick={handleColorClick}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}

export default NotionCard;
