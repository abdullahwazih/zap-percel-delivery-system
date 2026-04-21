import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import ParcelTypeSelector from "./ParcelTypeSelector";
import ParcelDetails from "./ParcelDetails";
import SenderDetails from "./SenderDetails";
import ReceiverDetails from "./ReceiverDetails";
import CostSummary from "./CostSummary";
import calculateDeliveryCost from "./calculateDeliveryCost";

const SendPercel = () => {
    const axiosInstance = useAxios();
    const { authInfo } = useAuth();
    const { user } = authInfo || {};

    const {
        register: bindField,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            parcel_type: "document",
            senderEmail: "",
        },
    });

    const inputClass =
        "h-9 w-full rounded-sm border border-[#D9DEE5] bg-white px-3 text-xs text-secondary outline-none placeholder:text-[#A3ACB7] focus:border-[#A3D94E]";

    const labelClass = "mb-1 block text-[10px] font-medium text-secondary/80";
    const errorClass = "mt-1 text-[10px] text-red-500";

    const parcelType = useWatch({ control, name: "parcel_type" });
    const parcelWeight = useWatch({ control, name: "parcel_weight" });
    const senderDistrict = useWatch({ control, name: "sender_district" });
    const receiverDistrict = useWatch({ control, name: "receiver_district" });

    useEffect(() => {
        if (user?.email) {
            setValue("senderEmail", user.email);
        }
    }, [setValue, user?.email]);

    const estimatedCost = calculateDeliveryCost({
        parcelType,
        parcelWeight,
        senderDistrict,
        receiverDistrict,
    });

    const onSubmit = async (data) => {
        const senderEmail = user?.email || data.senderEmail;
        const deliveryCost = calculateDeliveryCost({
            parcelType: data.parcel_type,
            parcelWeight: data.parcel_weight,
            senderDistrict: data.sender_district,
            receiverDistrict: data.receiver_district,
        });

        const isWithinCity = data.sender_district === data.receiver_district;

        const payload = {
            ...data,
            senderEmail,
            parcel_weight: Number(data.parcel_weight),
            delivery_zone: isWithinCity ? "within_city" : "outside_city_district",
            delivery_cost: deliveryCost,
        };

        const confirmation = await Swal.fire({
            title: "Confirm Booking",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Book Parcel",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#A3D94E",
            html: `
                <div style="text-align:left;font-size:14px;">
                    <p><strong>Parcel:</strong> ${data.parcel_name}</p>
                    <p><strong>Type:</strong> ${data.parcel_type === "document" ? "Document" : "Non-Document"}</p>
                    <p><strong>From:</strong> ${data.sender_district}</p>
                    <p><strong>To:</strong> ${data.receiver_district}</p>
                    <p><strong>Route:</strong> ${isWithinCity ? "Within City" : "Outside City/District"}</p>
                    <p><strong>Weight:</strong> ${payload.parcel_weight} KG</p>
                    <p><strong>Cost:</strong> ৳${deliveryCost ?? 0}</p>
                </div>
            `,
        });

        if (!confirmation.isConfirmed) {
            await Swal.fire({
                title: "Booking Cancelled",
                text: "Your parcel was not submitted.",
                icon: "info",
                confirmButtonColor: "#A3D94E",
            });
            return;
        }

        try {
            const result = await axiosInstance.post("/parcels", payload);

            await Swal.fire({
                title: "Parcel Booked",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#A3D94E",
                html: `
                    <div style="text-align:left;font-size:14px;">
                        <p><strong>Parcel:</strong> ${data.parcel_name}</p>
                        <p><strong>Type:</strong> ${data.parcel_type === "document" ? "Document" : "Non-Document"}</p>
                        <p><strong>Route:</strong> ${isWithinCity ? "Within City" : "Outside City/District"}</p>
                        <p><strong>Cost:</strong> ৳${deliveryCost ?? 0}</p>
                        <p><strong>Booking ID:</strong> ${result.data?.id ?? "N/A"}</p>
                    </div>
                `,
            });

            console.log("Send Parcel API Response ->", result.data);
        } catch (error) {
            console.error("Error creating parcel:", error);
            Swal.fire({
                title: "Booking Failed",
                text: error.response?.data?.message || "Failed to create parcel. Please try again.",
                icon: "error",
                confirmButtonColor: "#A3D94E",
            });
        }
    };

    return (
        <section className="mx-auto w-full max-w-6xl rounded-2xl bg-base-200 px-4 py-5 md:px-6">
            <div className="rounded-2xl bg-white p-4 md:p-7">
                <h1 className="text-3xl font-extrabold text-secondary">Send A Parcel</h1>
                <p className="mt-2 text-sm font-semibold text-secondary/80">Enter your parcel details</p>

                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...bindField("senderEmail")} />
                    <ParcelTypeSelector bindField={bindField} errors={errors} errorClass={errorClass} />

                    <ParcelDetails
                        bindField={bindField}
                        errors={errors}
                        inputClass={inputClass}
                        labelClass={labelClass}
                        errorClass={errorClass}
                    />

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <SenderDetails
                            bindField={bindField}
                            errors={errors}
                            inputClass={inputClass}
                            labelClass={labelClass}
                            errorClass={errorClass}
                        />
                        <ReceiverDetails
                            bindField={bindField}
                            errors={errors}
                            inputClass={inputClass}
                            labelClass={labelClass}
                            errorClass={errorClass}
                        />
                    </div>

                    <label className="mt-4 flex items-center gap-2 text-[11px] text-secondary/75">
                        <input
                            type="checkbox"
                            className="h-3.5 w-3.5 accent-[#A3D94E]"
                            {...bindField("pickup_time_ack", {
                                required: "Please confirm pickup time.",
                            })}
                        />
                        Pickup Time 4pm-7pm Approx.
                    </label>
                    {errors.pickup_time_ack && <p className={errorClass}>{errors.pickup_time_ack.message}</p>}

                    <CostSummary estimatedCost={estimatedCost} />

                    <button
                        type="submit"
                        className="mt-6 h-9 rounded-sm bg-primary px-6 text-xs font-semibold text-secondary transition hover:brightness-95"
                    >
                        Proceed to Confirm Booking
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SendPercel;
