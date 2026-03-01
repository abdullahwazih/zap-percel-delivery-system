import { useState } from "react";

const tabContent = {
    Story: [
        "We started with a simple promise - to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination - on time, every time.",
        "From a small local operation, we grew by listening carefully to customers and solving real delivery pain points. We kept improving route planning, response time, and parcel handling standards to build trust in every district we serve.",
        "Today, our story is still being written with every shipment. We stay focused on consistency, transparency, and dependable support so individuals and businesses can deliver with confidence.",
    ],
    Mission: [
        "Our mission is to simplify logistics for everyone by making parcel movement predictable, trackable, and affordable.",
        "We aim to combine smart technology with human-centered service so every customer can schedule, monitor, and receive deliveries without friction.",
        "By continuously improving our network and operations, we work to deliver every package safely and on time while maintaining excellent customer care.",
    ],
    Success: [
        "Our success is measured by successful deliveries, repeat customers, and long-term partnerships with merchants across the country.",
        "We have scaled operations with a strong fulfillment process, efficient rider network, and proactive support team that keeps delivery flows stable even during peak demand.",
        "Each milestone reflects our commitment to reliability, operational excellence, and the trust customers place in us every day.",
    ],
    "Team & Others": [
        "Behind every delivery is a dedicated team of riders, operations specialists, and support professionals working together in real time.",
        "We invest in training, communication, and process discipline so teams can respond quickly and maintain service quality across locations.",
        "Alongside our internal team, we collaborate with merchants and partners to keep improving the full delivery experience for end customers.",
    ],
};

const tabs = Object.keys(tabContent);

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState("Story");

    return (
        <section className="my-6 px-4 sm:my-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-[24px] bg-[#F3F5F4] px-6 py-12 sm:px-10 sm:py-14">
                <h1 className="text-secondary text-4xl font-extrabold sm:text-5xl">
                    About Us
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary/65">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero
                    hassle. From personal packages to business shipments - we deliver on
                    time, every time.
                </p>

                <div className="mt-9 border-t border-[#D9DFE2] pt-8">

                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-2xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={
                                    activeTab === tab
                                        ? "font-bold text-[#4F6D24] transition"
                                        : "text-secondary/55"
                                }
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 space-y-5 text-xl leading-relaxed text-secondary/70">
                        {tabContent[activeTab].map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
