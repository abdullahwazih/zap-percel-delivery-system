import amazon from "../../assets/brands/amazon.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import startPeople from "../../assets/brands/start_people.png";

const companies = [
    { name: "Casio", logo: casio },
    { name: "Amazon", logo: amazon },
    { name: "Moonstar", logo: moonstar },
    { name: "Star+", logo: star },
    { name: "Start People", logo: startPeople },
    { name: "Randstad", logo: randstad },
];

const CompanySwiper = () => {
    const marqueeLogos = [...companies, ...companies];

    return (
        <section className="my-8 sm:my-12">
            <div className="rounded-2xl bg-[#EEF1F2] px-4 py-8 sm:px-8">
                <h2 className="text-secondary text-center text-3xl font-extrabold sm:text-4xl">
                    We've helped thousands of sales teams
                </h2>
                <div className="group mt-8 overflow-hidden">
                    <div className="flex w-max animate-[brandMarquee_18s_linear_infinite] gap-10 group-hover:[animation-play-state:paused] sm:gap-14">
                        {marqueeLogos.map((company, index) => (
                            <div
                                key={`${company.name}-${index}`}
                                className="flex h-16 min-w-[120px] items-center justify-center sm:min-w-[150px]"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="h-8 w-auto object-contain opacity-90"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>
                {`@keyframes brandMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }`}
            </style>
        </section>
    );
};

export default CompanySwiper;
