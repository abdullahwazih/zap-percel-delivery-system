import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import customerTop from "../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("/reviews.json");
                if (!response.ok) {
                    throw new Error("Failed to load review data.");
                }

                const data = await response.json();
                setReviews(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Failed to load review data.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        if (swiperRef.current?.autoplay && reviews.length > 1) {
            swiperRef.current.autoplay.start();
        }
    }, [reviews]);

    if (loading) {
        return <div className="py-10 text-center text-[#56757A]">Loading reviews...</div>;
    }

    if (error) {
        return <div className="py-10 text-center text-red-500">{error}</div>;
    }

    return (
        <section className="my-10 sm:my-14">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <img
                        src={customerTop}
                        alt="Customer reviews"
                        className="mx-auto h-auto w-[120px] object-contain sm:w-[150px]"
                    />
                    <h2 className="text-secondary mt-4 text-3xl font-extrabold sm:text-4xl">
                        What our customers are saying
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#6D7D81]">
                        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                        Achieve proper alignment and strengthen your body with ease.
                    </p>
                </div>

                <div className="review-slider mt-8">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        centeredSlides
                        loop={reviews.length > 3}
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                        breakpoints={{
                            640: { slidesPerView: 1.4, spaceBetween: 12 },
                            768: { slidesPerView: 2, spaceBetween: 14 },
                            1024: { slidesPerView: 2.35, spaceBetween: 16 },
                            1280: { slidesPerView: 2.8, spaceBetween: 18 },
                        }}
                        navigation={{
                            prevEl: ".review-prev",
                            nextEl: ".review-next",
                        }}
                        pagination={{
                            el: ".review-pagination",
                            clickable: true,
                        }}
                        className="px-2 py-3 sm:px-3"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id} className="py-4">
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="mt-3 flex items-center justify-center gap-5">
                        <button
                            type="button"
                            className="review-prev flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E1E3] bg-white text-lg text-[#5B6F73] transition hover:border-[#AFC4C8]"
                            aria-label="Previous review"
                        >
                            &#8592;
                        </button>

                        <div className="review-pagination !static !w-auto" />

                        <button
                            type="button"
                            className="review-next flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-secondary transition hover:brightness-95"
                            aria-label="Next review"
                        >
                            &#8594;
                        </button>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .review-slider .swiper-slide {
                        opacity: 0.45;
                        transform: scale(0.92);
                        transition: transform 0.28s ease, opacity 0.28s ease;
                    }
                    .review-slider .swiper-slide-active {
                        opacity: 1;
                        transform: scale(1);
                    }
                    .review-slider .swiper-pagination-bullet {
                        width: 8px;
                        height: 8px;
                        margin: 0 4px !important;
                        background: #6fb9c0;
                        opacity: 0.4;
                    }
                    .review-slider .swiper-pagination-bullet-active {
                        opacity: 1;
                        background: #0b6a73;
                    }
                `}
            </style>
        </section>
    );
};

export default Review;
