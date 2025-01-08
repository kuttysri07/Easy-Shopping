import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart, fetchSingleProduct } from "./Redux/Products/ProductFilter";
import { checkStatus } from "./Redux/auth/auth.login";

const ProductView = () => {
  const [qty, setQty] = useState(1); // Default quantity should be at least 1 to avoid adding 0 items

  const { id: selectedProductId } = useParams();
  const dispatch = useDispatch();

  const {
    singleProduct: product,
    loading,
    error,
    cartStatus

  } = useSelector((state) => state.product);

  const state = useSelector((state) => state.login.User);

  // Handle edge case: User might not be logged in yet
  const userId = state?.user._id;
  console.log(userId);

  useEffect(() => {
    dispatch(checkStatus());

    if (selectedProductId) {
      dispatch(fetchSingleProduct(selectedProductId));
    }
  }, [dispatch, selectedProductId]);

  const handleCart = () => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    if (qty <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    dispatch(addCart({ productId: selectedProductId, qty, userId }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!product) return <div>No product found</div>;

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {/* Add star rating dynamically if available */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      fill={index < 4 ? "currentColor" : "none"}
                      className={`w-4 h-4 ${
                        index < 4 ? "text-indigo-500" : "text-gray-400"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {[...Array(3)].map((_, index) => (
                    <button
                      key={index}
                      className={`border-2 border-gray-300 ml-1 ${
                        index === 1
                          ? "bg-gray-700"
                          : index === 2
                          ? "bg-indigo-500"
                          : ""
                      } rounded-full w-6 h-6 focus:outline-none`}
                    ></button>
                  ))}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {["SM", "M", "L", "XL"].map((size) => (
                      <option key={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div className="flex ml-6 items-center">
                  <span className="mr-3">Qty</span>
                  <input
                    type="number"
                    onChange={(e) => setQty(e.target.value)}
                    className="border-2  rounded  p-2 w-20"
                  />
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                <button
                  onClick={() => handleCart(product._id)}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                 
                >
               Add to Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.07l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductView;
