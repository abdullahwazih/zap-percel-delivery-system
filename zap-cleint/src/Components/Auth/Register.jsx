import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import axios from "axios";

import AuthImg from "../../assets/authentication.png";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();
    const { authInfo } = useAuth();
    const { signupWithEmail, signInWithGoogle, verifyEmail, logOut } = authInfo;

    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [pendingVerificationUser, setPendingVerificationUser] = useState(null);

    const {
        register: bindField,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async ({ name, email, password, photo }) => {
        setAuthError("");
        setAuthSuccess("");
        setIsSubmitting(true);

        try {
            let imageUrl = "";

            if (photo && photo[0]) {
                const formData = new FormData();
                formData.append("image", photo[0]); // ImgBB expects a file under "image"

                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST}`,
                    formData
                );

                imageUrl = response.data.data.display_url;
                console.log("Image uploaded successfully:", imageUrl);
            }
            const userCredential = await signupWithEmail(email, password);
            await updateProfile(userCredential.user, { displayName: name, photoURL: imageUrl });

            try {
                await verifyEmail(userCredential.user);
                setAuthSuccess(
                    "Registration successful. A verification email has been sent. Please verify your email to continue."
                );
                setPendingVerificationUser(userCredential.user);
            } catch (verificationError) {
                console.error("Email verification failed:", verificationError);
                setAuthSuccess(
                    "Registration successful, but verification email could not be sent right now. Please try again later."
                );
            }

            reset();
        } catch (error) {
            setAuthError(error?.message || "Registration failed.");
        } finally {
            setIsSubmitting(false);
        }
        await logOut();
    };

    const handleVerificationCheck = async () => {

        if (!pendingVerificationUser) return;

        setAuthError("");
        setIsSubmitting(true);

        try {
            await pendingVerificationUser.reload();

            if (!pendingVerificationUser.emailVerified) {
                setAuthError("Email is not verified yet. Please check your inbox and click the verification link.");
                return;
            }

            setAuthSuccess("Email verified successfully. You can now log in.");
            setPendingVerificationUser(null);
            navigate("/auth/login");
        } catch (error) {
            setAuthError(error?.message || "Could not verify email status right now.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleRegister = async () => {

        setAuthError("");
        setAuthSuccess("");
        setIsSubmitting(true);

        try {
            await signInWithGoogle();
            setAuthSuccess("Signed in with Google successfully.");
        } catch (error) {
            setAuthError(error?.message || "Google sign-in failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-secondary text-4xl font-extrabold">Create an Account</h1>
            <p className="mt-2 text-sm text-secondary/75">Register with ZapShift</p>



            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-3">


                <div>
                    <label className=" block text-sm font-medium text-secondary/85">Photo</label>

                    <div className="flex items-center mb-1">

                        <img src={AuthImg} alt="Authentication" className=" h-12 w-12 mt-2" />

                        <input type="file" className="file-input file-input-ghost mt-4" {...bindField("photo")} />

                    </div>
                    <label className="mb-1.5 block text-sm font-medium text-secondary/85">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="h-11 w-full rounded-md border border-[#D2D8DE] bg-transparent px-3 text-sm text-secondary outline-none placeholder:text-[#9BA5AF] focus:border-[#A3D94E]"
                        {...bindField("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-secondary/85">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Email"
                        className="h-11 w-full rounded-md border border-[#D2D8DE] bg-transparent px-3 text-sm text-secondary outline-none placeholder:text-[#9BA5AF] focus:border-[#A3D94E]"
                        {...bindField("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                            }
                        })}
                    />

                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-secondary/85">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="h-11 w-full rounded-md border border-[#D2D8DE] bg-transparent px-3 pr-16 text-sm text-secondary outline-none placeholder:text-[#9BA5AF] focus:border-[#A3D94E]"
                            {...bindField("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                                maxLength: {
                                    value: 32,
                                    message: "Password cannot exceed 32 characters",
                                },
                                pattern: {
                                    value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                    message:
                                        "Password must include uppercase, lowercase, number, and special character",
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/70 hover:text-secondary"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                    <path
                                        d="M3 3l18 18"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M9.4 5.2A11 11 0 0 1 12 5c5.5 0 9.5 4.6 10.8 7-.6 1.2-1.9 3-3.9 4.6M6.7 6.7C4.3 8.2 2.7 10.4 1.9 12c1.3 2.4 5.3 7 10.1 7 1.1 0 2.1-.2 3-.5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                    <path
                                        d="M1.9 12C3.2 9.6 7.2 5 12 5s8.8 4.6 10.1 7c-1.3 2.4-5.3 7-10.1 7S3.2 14.4 1.9 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        fill="none"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 h-11 w-full rounded-md bg-primary text-sm font-bold text-secondary transition hover:brightness-95"
                >
                    {isSubmitting ? "Processing..." : "Register"}
                </button>
            </form>

            {authError && (
                <p className="mt-3 text-sm text-red-500">{authError}</p>
            )}

            {authSuccess && (
                <p className="mt-3 text-sm text-green-600">{authSuccess}</p>
            )}

            {pendingVerificationUser && (
                <button
                    type="button"
                    onClick={handleVerificationCheck}
                    disabled={isSubmitting}
                    className="mt-3 h-11 w-full rounded-md border border-[#A3D94E] text-sm font-bold text-secondary transition hover:bg-[#F5FAEA]"
                >
                    {isSubmitting ? "Checking..." : "I have verified my email"}
                </button>
            )}

            <p className="mt-4 text-sm text-secondary/60">
                Already have an account?{" "}
                {pendingVerificationUser ? (
                    <span className="font-medium text-secondary/50">Verify email first</span>
                ) : (
                    <Link to="/auth/login" className="font-medium text-[#7AB63B] hover:underline">
                        Login
                    </Link>
                )}
            </p>

            <p className="my-3 text-center text-sm text-secondary/60">Or</p>

            <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={isSubmitting}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#DDE1E7] text-sm font-semibold text-secondary"
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                        fill="#4285F4"
                        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.2 2.8-2.6 3.7v3h4.2c2.5-2.3 3.9-5.6 3.9-8.8Z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-4.2-3c-1.1.8-2.5 1.3-3.7 1.3-2.9 0-5.4-2-6.3-4.7H1.3v3.1A12 12 0 0 0 12 24Z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.7 14.7a7.2 7.2 0 0 1 0-4.5V7.1H1.3a12 12 0 0 0 0 10.6l4.4-3Z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.3-3.3A11.4 11.4 0 0 0 12 0 12 12 0 0 0 1.3 7.1l4.4 3.1c.9-2.7 3.4-4.7 6.3-4.7Z"
                    />
                </svg>
                Register with google
            </button>
        </div>
    );
};

export default Register;
