import { Outlet } from "react-router";
import Logo from "../../Components/shared/NavLogo";
import authImage from "../../assets/authImage.png";

const AuthLayout = () => {
    return (
        <section className="min-h-screen px-4 py-6 sm:px-6 md:px-8">
            
            <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl overflow-hidden rounded-2xl bg-[#F2F3F2]">

                <div className="w-full px-6 py-7 sm:px-10 md:w-1/2 md:px-12 md:py-10">
                
                    <Logo size={40} textSize="text-3xl" />

                    <div className="mx-auto mt-12 w-full max-w-md md:mt-16">
                        <Outlet />
                    </div>

                    <div className="mt-10 flex justify-center rounded-2xl bg-[#E8EFDE] p-6 md:hidden">
                        <img
                            src={authImage}
                            alt="Parcel handoff illustration"
                            className="h-auto w-full max-w-[280px] object-contain"
                        />
                    </div>
                </div>

                <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#E8EFDE] p-8 lg:p-14">
                    <img
                        src={authImage}
                        alt="Parcel handoff illustration"
                        className="h-auto w-full max-w-[360px] object-contain"
                    />
                </div>
            </div>
            
        </section>
    );
};

export default AuthLayout;
