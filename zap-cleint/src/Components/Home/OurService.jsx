import serviceIcon from "../../assets/service.png";

const services = [
    {
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
    },
    {
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
        featured: true,
    },
    {
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
];

const OurService = () => {
    return (
        <section className="my-8 sm:my-10">
            <div className="rounded-[22px] bg-[#01454D] px-4 py-10 sm:px-8 sm:py-14 lg:px-14">
                <h2 className="text-center text-4xl font-extrabold text-white">
                    Our Services
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-7 text-[#D6E3E5] sm:text-base">
                    Enjoy fast, reliable parcel delivery with real-time tracking and
                    zero hassle. From personal packages to business shipments we deliver
                    on time, every time.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <article
                            key={service.title}
                            className={`rounded-2xl p-6 text-center sm:p-8 ${
                                service.featured
                                    ? "bg-primary text-secondary"
                                    : "bg-[#F3F5F6] text-secondary"
                            }`}
                        >
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9E8F3]">
                                <img
                                    src={serviceIcon}
                                    alt="Service icon"
                                    className="h-9 w-9 object-contain"
                                />
                            </div>
                            <h3 className="mx-auto mt-5 max-w-[260px] text-2xl font-extrabold leading-tight sm:text-3xl">
                                {service.title}
                            </h3>
                            <p
                                className={`mx-auto mt-4 max-w-[290px] text-base leading-7 ${
                                    service.featured
                                        ? "text-secondary/80"
                                        : "text-[#5F6B72]"
                                }`}
                            >
                                {service.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurService;
