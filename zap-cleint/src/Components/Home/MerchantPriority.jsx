import merchantBg from "../../assets/be-a-merchant-bg.png";
import merchantBox from "../../assets/location-merchant.png";

const MerchantPriority = () => {
    return (
        <section className="my-8 sm:my-10">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#01454D] px-5 py-10 sm:px-10 sm:py-14">
                <img
                    src={merchantBg}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 left-0 w-[58%] opacity-80"
                />

                <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
                    <div>
                        <h2 className="max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                            Merchant and Customer Satisfaction is Our First Priority
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-[#CFE1E3] sm:text-base">
                            We offer the lowest delivery charge with the highest value
                            along with 100% safety of your product. Pathao courier
                            delivers your parcels in every corner of Bangladesh right on
                            time.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button className="btn rounded-full border-none bg-primary px-7 text-base font-bold text-secondary hover:bg-[#d8f378]">
                                Become a Merchant
                            </button>
                            <button className="btn rounded-full border border-primary bg-transparent px-7 text-base font-bold text-primary hover:bg-primary hover:text-secondary">
                                Earn with ZapShift Courier
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <img
                            src={merchantBox}
                            alt="Merchant delivery illustration"
                            className="w-full max-w-md object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MerchantPriority;
