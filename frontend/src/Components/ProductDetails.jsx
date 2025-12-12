import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState("");

  // Fetch product
  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get(`/products/${slug}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Fetch related products
  useEffect(() => {
    if (!product?.slug) return;
    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        const res = await axiosInstance.get(`/products/${product.slug}/related`);
        setRelated(res.data || []);
      } catch (err) {
        console.error(err);
        setRelated([]);
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchRelated();
  }, [product]);

  if (loading)
    return <p className="h-screen flex items-center justify-center text-gray-600">Loading product...</p>;
  if (error)
    return <p className="h-screen flex items-center justify-center text-red-500">{error}</p>;
  if (!product)
    return <p className="h-screen flex items-center justify-center">Product not found</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center px-4 sm:px-6 md:px-12">
      
      {/* Main Product Card */}
      <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-3xl">
        {product.images?.length > 0 && (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-xl shadow-lg overflow-hidden mb-4 w-full max-w-md"
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx} className="flex justify-center items-center">
                <img
                  src={img.url}
                  alt={`${product.productName} ${idx + 1}`}
                  loading="lazy"
                  className="max-h-[250px] w-auto object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <h1 className="text-3xl font-bold text-center">{product.productName}</h1>
        <p className="text-gray-700 text-center max-w-sm">{product.description}</p>

        {/* Related Products Carousel directly below description */}
        {related.length > 0 && (
          <div className="w-full mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Related Products
            </h2>
            {loadingRelated ? (
              <p className="text-center text-gray-600">Loading related products...</p>
            ) : (
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="pb-6"
              >
                {related.map((p) => (
                  <SwiperSlide key={p.slug} className="flex justify-center">
                    <div className="border rounded-lg p-2 hover:shadow-xl transition-all w-full max-w-[180px] flex flex-col bg-white overflow-hidden">
                      <div className="h-36 sm:h-44 flex justify-center items-center bg-gray-100 overflow-hidden">
                        {p.images?.length > 0 ? (
  <img
    src={p.images[Math.min(p.coverImageIndex ?? 0, p.images.length - 1)]?.url}
    alt={p.productName}
    className="object-contain w-full h-full transform transition-transform duration-300 hover:scale-105"
  />
) : (
  <div className="text-gray-400 text-sm">No Image</div>
)}
                      </div>
                      <h3 className="mt-2 font-medium text-sm text-center text-gray-800 p-2 truncate">
                        {p.productName}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;