import bookingIcon from "../../assets/bookingIcon.png";

const steps = [
    "Booking Pick & Drop",
    "Cash On Delivery",
    "Delivery Hub",
    "Booking SME & Corporate",
];

const HowItWorks = () => {
    return (
        <section className="my-8 sm:my-10">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-secondary text-3xl font-bold">How it Works</h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {steps.map((title) => (
                        <article
                            key={title}
                            className="rounded-2xl bg-[#F5F6F7] p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                        >
                            <img
                                src={bookingIcon}
                                alt="Booking icon"
                                className="h-9 w-9 object-contain"
                            />
                            <h3 className="text-secondary mt-4 text-xl font-bold leading-tight">
                                {title}
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-[#6B7280]">
                                From personal packages to business shipments we deliver
                                on time, every time.
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
