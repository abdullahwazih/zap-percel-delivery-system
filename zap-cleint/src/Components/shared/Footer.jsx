import { Link } from "react-router";
import Logo from "./NavLogo";

const Footer = () => {
    return (
        <footer className="w-full rounded-[24px] bg-black px-6 py-12 md:px-10 md:py-14">
            <div className="mx-auto max-w-4xl text-center text-white">
                <div className="flex items-center justify-center gap-2">
                    <Logo size={40} textSize="text-3xl" />
                </div>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments - we deliver on time, every time.
                </p>

                <div className="my-6 border-t border-dashed border-cyan-700/60"></div>

                <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/80">
                    <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
                    <Link to="/coverage" className="hover:text-primary transition-colors">Coverage</Link>
                    <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                    <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                </nav>

                <div className="my-6 border-t border-dashed border-cyan-700/60"></div>

                <div className="flex items-center justify-center gap-4">
                    <a
                        href="#"
                        aria-label="LinkedIn"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0077B5] text-white"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                            <path d="M6.94 8.5H3.56v10.88h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 3Zm5.04 5.5H7v10.88h3.25V14c0-1.43.27-2.81 2.04-2.81 1.74 0 1.76 1.63 1.76 2.9v5.29h3.25v-5.84c0-2.87-.62-5.09-3.97-5.09-1.61 0-2.7.89-3.14 1.74h-.05V8.5Z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        aria-label="X"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
                    >
                        <span className="text-sm font-bold">X</span>
                    </a>
                    <a
                        href="#"
                        aria-label="Facebook"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                            <path d="M13.5 8.5V6.8c0-.72.48-.89.82-.89h2.1V3h-2.9C10.8 3 10.2 5 10.2 6.27V8.5H8v3h2.2V21h3.3v-9.5h2.67l.4-3H13.5Z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        aria-label="YouTube"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000] text-white"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                            <path d="M21.8 8.01a2.8 2.8 0 0 0-1.97-1.98C18.1 5.5 12 5.5 12 5.5s-6.1 0-7.83.53A2.8 2.8 0 0 0 2.2 8.01 29.3 29.3 0 0 0 1.7 12c0 1.33.17 2.66.5 3.99a2.8 2.8 0 0 0 1.97 1.98c1.73.53 7.83.53 7.83.53s6.1 0 7.83-.53a2.8 2.8 0 0 0 1.97-1.98c.33-1.33.5-2.66.5-3.99 0-1.33-.17-2.66-.5-3.99ZM10 14.73V9.27L15 12l-5 2.73Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
