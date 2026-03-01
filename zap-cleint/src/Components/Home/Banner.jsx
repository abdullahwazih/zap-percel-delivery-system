import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import { Link } from "react-router";



const Banner = () => {
    return (
        <div className="my-4 overflow-hidden rounded-4xl shadow-lg">
            <Carousel
                autoPlay={true}
                stopOnHover={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={1500}
                transitionTime={500}
            >
                <div className="relative">
                    <img
                        src={banner1}
                        alt="Banner slide 1"
                        className="h-[655px] w-full object-cover"
                    />
                    <div className="absolute bottom-2 left-6 md:bottom-[40px] md:left-[120px]">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button className="btn btn-secondary rounded-full px-6">
                                Track your parcel
                            </button>

                            <Link to="/rider">
                                <button className="btn btn-outline rounded-full border-white text-secondary hover:bg-white hover:text-black px-6">
                                    Become a Rider
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative ">
                    <img
                        src={banner2}
                        alt="Banner slide 2"
                        className="h-[655px] w-full object-cover"
                    />
                    <div className="absolute bottom-2 left-6 md:bottom-[40px] md:left-[120px]">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button className="btn btn-secondary rounded-full px-6">
                                Book a Delivery
                            </button>
                            <button className="btn btn-outline rounded-full border-white text-secondary hover:bg-white hover:text-black px-6">
                                Check Pricing
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative ">
                    <img
                        src={banner3}
                        alt="Banner slide 3"
                        className="h-[655px] w-full object-cover"
                    />
                    <div className="absolute bottom-2 left-6 md:bottom-[40px] md:left-[120px]">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button className="btn btn-secondary rounded-full px-6">
                                Send a Package
                            </button>
                            <button className="btn btn-outline rounded-full border-white text-secondary hover:bg-white hover:text-black px-6">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>


    )
}

export default Banner
