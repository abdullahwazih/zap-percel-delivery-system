import liveTrackingImg from "../../assets/live-tracking.png";
import safeDeliveryImg from "../../assets/safe-delivery.png";

const highlights = [
    {
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: liveTrackingImg,
    },
    {
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: safeDeliveryImg,
    },
    {
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns anytime you need us.",
        image: safeDeliveryImg,
    },
];

const DeliveryHighlights = () => {
    return (
        <section className="my-8 sm:my-10">
            <div className="mx-auto max-w-7xl space-y-3 sm:space-y-4">
                {highlights.map((item) => (
                    <article
                        key={item.title}
                        className="rounded-2xl bg-[#F3F5F6] p-4 sm:p-6"
                    >
                        <div className="grid items-center gap-4 md:grid-cols-[150px_1px_1fr] md:gap-6">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-24 w-28 object-contain sm:h-28 sm:w-32"
                            />

                            <div className="hidden h-24 border-l border-dashed border-[#7FA8AF] md:block" />

                            <div>
                                <h3 className="text-secondary text-2xl font-bold sm:text-3xl">
                                    {item.title}
                                </h3>
                                <p className="mt-2 max-w-4xl text-sm leading-7 text-[#5F6B72] sm:text-base">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default DeliveryHighlights;
