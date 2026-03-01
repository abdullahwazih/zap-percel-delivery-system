import { Link } from "react-router";
import logo from "../../assets/logo.png"; // adjust path if needed

const Logo = ({ size = 32, textSize = "text-2xl" }) => {
    return (
        <Link to="/" className="flex items-end -space-x-3 group">

            {/* Image */}
            <img
                src={logo}
                alt="ZapShift Logo"
                style={{ width: size, height: size }}
                className="object-contain -translate-y-1 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Text */}
            <span className={`${textSize} font-bold tracking-[-0.04em] leading-none -ms-1`}>
                Zap<span style={{ color: '#CAEB66' }}>Shift</span>
            </span>
        

        </Link>
    );
};

export default Logo;
