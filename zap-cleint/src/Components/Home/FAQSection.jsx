import { useState } from "react";

const faqItems = [
    {
        question: "How does this posture corrector work?",
        answer:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: it helps your body stay aligned and builds better posture habits over time.",
    },
    {
        question: "Is it suitable for all ages and body types?",
        answer:
            "Yes, most models are adjustable and designed for different body shapes. For children or people with medical conditions, consult a healthcare professional before regular use.",
    },
    {
        question: "Does it really help with back pain and posture improvement?",
        answer:
            "It can help reduce discomfort caused by poor posture and encourage a healthier sitting and standing position. Best results come from consistent use with stretching and strengthening routines.",
    },
    {
        question: "Does it have smart features like vibration alerts?",
        answer:
            "Some variants include reminder features such as vibration alerts when slouching is detected. Availability depends on the exact model you choose.",
    },
    {
        question: "How will I be notified when the product is back in stock?",
        answer:
            "You can subscribe to back-in-stock notifications using your email or phone number on the product page, and we will send an alert as soon as it becomes available.",
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(-1);

    return (
        <section className="my-12 sm:my-16">
            <div className="px-4 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-secondary text-3xl font-extrabold sm:text-5xl">
                        Frequently Asked Question (FAQ)
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6E7E82]">
                        Enhance posture, mobility, and well-being effortlessly with Posture
                        Pro. Achieve proper alignment, reduce pain, and strengthen your body
                        with ease!
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-6xl space-y-3">

                    {faqItems.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <article

                                key={item.question}

                                className={`overflow-hidden rounded-xl border transition ${
                                    isOpen
                                        ? "border-[#2AA8B9] bg-[#DFF2F4]"
                                        : "border-[#D7DCDF] bg-[#F6F8F9]"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                                >
                                    <span className="text-secondary text-base font-bold sm:text-lg">
                                        {item.question}
                                    </span>
                                    <span
                                        className={`text-secondary text-xl leading-none transition-transform ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                        aria-hidden="true"
                                    >
                                        ˅
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="border-t border-[#C8DBDF] px-5 pb-5 pt-4">
                                        <p className="text-sm leading-7 text-[#5E6E73] sm:text-base">
                                            {item.answer}
                                        </p>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>

                <div className="mt-9 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        className="rounded-xl bg-primary px-6 py-3 text-lg font-bold text-secondary transition hover:brightness-95"
                    >
                        See More FAQ's
                    </button>
                    <button
                        type="button"
                        aria-label="See more FAQs"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E1E1E] text-xl text-primary"
                    >
                        ↗
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
