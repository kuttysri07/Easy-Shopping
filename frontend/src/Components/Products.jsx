import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./Redux/Products/products.Slice";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const {
    loading,
    products: allProducts,
    error,
  } = useSelector((state) => state.products); // Destructure state directly
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* product */}
            {Array.isArray(allProducts) ? (
              allProducts.map((product) => (
                <div
                  onClick={() => navigate(`/product/${product._id}`)}
                  key={product.id}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer"
                >
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-contain object-center w-full h-full block cursor-pointer"
                      src={product.image}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {product.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.title}
                    </h2>
                    <p className="mt-1">${product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
