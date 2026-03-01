import RiderIllustration from "../../assets/big-deliveryman.png";

const Rider = () => {
    return (
        <section className="mx-auto mt-6 w-full max-w-7xl rounded-3xl bg-[#f5f6f7] px-6 py-8 md:px-10 md:py-10">
            <h1 className="text-4xl font-extrabold text-secondary">Be a Rider</h1>
            <p className="mt-3 max-w-3xl text-sm text-secondary/65">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                From personal packages to business shipments we deliver on time, every time.
            </p>

            <h2 className="mt-9 border-b border-secondary/10 pb-3 text-3xl font-extrabold text-secondary">
                Tell us about yourself
            </h2>

            <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
                <form className="space-y-3.5">
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Your Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-secondary outline-none placeholder:text-[#98a4af] focus:border-[#A3D94E]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Driving License Number
                        </label>
                        <input
                            type="text"
                            placeholder="Driving License Number"
                            className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-secondary outline-none placeholder:text-[#98a4af] focus:border-[#A3D94E]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Your Email
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-secondary outline-none placeholder:text-[#98a4af] focus:border-[#A3D94E]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Your Region
                        </label>
                        <select className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-[#98a4af] outline-none focus:border-[#A3D94E]">
                            <option>Select your Region</option>
                            <option>Dhaka</option>
                            <option>Chattogram</option>
                            <option>Khulna</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Your District
                        </label>
                        <select className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-[#98a4af] outline-none focus:border-[#A3D94E]">
                            <option>Select your District</option>
                            <option>Dhaka</option>
                            <option>Gazipur</option>
                            <option>Narayanganj</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            NID No
                        </label>
                        <input
                            type="text"
                            placeholder="NID"
                            className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-secondary outline-none placeholder:text-[#98a4af] focus:border-[#A3D94E]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-secondary outline-none placeholder:text-[#98a4af] focus:border-[#A3D94E]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Bike Brand Model and Year
                        </label>
                        <input
                            type="text"
                            placeholder="Bike Brand Model and Year"
                            className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-secondary outline-none placeholder:text-[#98a4af] focus:border-[#A3D94E]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Bike Registration Number
                        </label>
                        <input
                            type="text"
                            placeholder="Bike Registration Number"
                            className="h-11 w-full rounded-md border border-[#d4dbe3] bg-white px-3 text-sm text-secondary outline-none placeholder:text-[#98a4af] focus:border-[#A3D94E]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-secondary/90">
                            Tell Us About Yourself
                        </label>
                        <textarea
                            rows="1"
                            placeholder="Tell Us About Yourself"
                            className="w-full rounded-md border border-[#d4dbe3] bg-white px-3 py-3 text-sm text-secondary outline-none placeholder:text-[#98a4af] focus:border-[#A3D94E]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-1 h-11 w-full rounded-md bg-primary text-sm font-bold text-secondary transition hover:brightness-95"
                    >
                        Submit
                    </button>
                </form>

                <div className="hidden lg:flex lg:justify-center lg:pt-6">
                    <img
                        src={RiderIllustration}
                        alt="Rider illustration"
                        className="h-auto w-full max-w-md"
                    />
                </div>
            </div>
        </section>
    );
};

export default Rider;
