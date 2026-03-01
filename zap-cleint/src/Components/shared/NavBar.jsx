// src/components/layout/NavBar.jsx
import { NavLink } from "react-router";
import Logo from "./NavLogo";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
    const { authInfo } = useAuth();
    const { user, logOut } = authInfo;

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "rounded-full bg-primary px-4 py-2 font-semibold text-secondary"
            : "px-2 py-2 text-secondary/70 transition hover:text-secondary";

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="navbar bg-base-200 w-full    mt-4 mx-auto rounded-2xl shadow-sm px-6">

            {/* Logo */}
            <div className="navbar-start">
                <Logo size={40} textSize="text-3xl" />
            </div>

            {/* Center Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4 text-sm">
                    <li><NavLink to="/send-percel" className={navLinkClass}>Send Percel</NavLink></li>
                    <li><NavLink to="/coverage" className={navLinkClass}>Coverage</NavLink></li>
                    <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
                    <li><NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink></li>
                    <li><NavLink to="/blog" className={navLinkClass}>Blog</NavLink></li>
                    <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
                </ul>
            </div>

            {/* Buttons */}
            <div className="navbar-end gap-3 ">
                {user ? (
                    <div className="flex items-center gap-4">
                        <p>{user.displayName}</p>
                        <button
                            onClick={handleLogout}
                            className="btn btn-sm rounded-full text-base bg-transparent border border-base-content/40 hover:bg-base-200">
                            Logout
                        </button>
                    </div>


                ) : (
                    <>
                        <NavLink
                            to="/auth/login"
                            className="btn btn-sm rounded-full text-base bg-transparent border border-base-content/40 hover:bg-base-200"
                        >
                            Sign In
                        </NavLink>
                        <NavLink
                            to="/auth/register"
                            className="btn btn-secondary btn-sm rounded-full text-base"
                        >
                            Sign Up →
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
