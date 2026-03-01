import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";

const calculateDeliveryCost = ({ parcelType, parcelWeight, senderDistrict, receiverDistrict }) => {
    const weight = Number(parcelWeight);

    if (!parcelType || !Number.isFinite(weight) || weight <= 0 || !senderDistrict || !receiverDistrict) {
        return null;
    }

    const isWithinCity = senderDistrict === receiverDistrict;

    if (parcelType === "document") {
        return isWithinCity ? 60 : 80;
    }

    const baseCost = isWithinCity ? 110 : 150;
    if (weight <= 3) {
        return baseCost;
    }

    // Charge extra for each additional kg (or partial kg) above 3kg.
    const extraKg = Math.ceil(weight - 3);
    const extraWeightCharge = extraKg * 40;
    const outsideCitySurcharge = isWithinCity ? 0 : 40;

    return baseCost + extraWeightCharge + outsideCitySurcharge;
};

const SendPercel = () => {
    const {
        register: bindField,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            parcel_type: "document",
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

    const estimatedCost = calculateDeliveryCost({
        parcelType,
        parcelWeight,
        senderDistrict,
        receiverDistrict,
    });

    const onSubmit = (data) => {
        const deliveryCost = calculateDeliveryCost({
            parcelType: data.parcel_type,
            parcelWeight: data.parcel_weight,
            senderDistrict: data.sender_district,
            receiverDistrict: data.receiver_district,
        });

        const isWithinCity = data.sender_district === data.receiver_district;

        const payload = {
            ...data,
            delivery_zone: isWithinCity ? "within_city" : "outside_city_district",
            delivery_cost: deliveryCost,
        };

        Swal.fire({
            title: "Booking Summary",
            icon: "success",
            confirmButtonText: "Confirm",
            confirmButtonColor: "#A3D94E",
            html: `
                <div style="text-align:left;font-size:14px;">
                    <p><strong>Parcel:</strong> ${data.parcel_name}</p>
                    <p><strong>Type:</strong> ${data.parcel_type === "document" ? "Document" : "Non-Document"}</p>
                    <p><strong>Route:</strong> ${isWithinCity ? "Within City" : "Outside City/District"}</p>
                    <p><strong>Cost:</strong> ৳${deliveryCost ?? 0}</p>
                </div>
            `,
        });

        console.log("Send Parcel Form Data ->", payload);
    };

    return (
        <section className="mx-auto w-full max-w-6xl rounded-2xl bg-base-200 px-4 py-5 md:px-6">
            <div className="rounded-2xl bg-white p-4 md:p-7">
                <h1 className="text-3xl font-extrabold text-secondary">Send A Parcel</h1>
                <p className="mt-2 text-sm font-semibold text-secondary/80">Enter your parcel details</p>

                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap items-center gap-6">
                        <label className="flex items-center gap-2 text-xs font-semibold text-secondary">
                            <input
                                type="radio"
                                name="parcel_type"
                                className="h-3.5 w-3.5 accent-[#A3D94E]"
                                value="document"
                                {...bindField("parcel_type", { required: "Please choose a parcel type." })}
                            />
                            Document
                        </label>
                        <label className="flex items-center gap-2 text-xs text-secondary/75">
                            <input
                                type="radio"
                                name="parcel_type"
                                className="h-3.5 w-3.5 accent-[#A3D94E]"
                                value="not_document"
                                {...bindField("parcel_type", { required: "Please choose a parcel type." })}
                            />
                            Not Document
                        </label>
                    </div>
                    {errors.parcel_type && <p className={errorClass}>{errors.parcel_type.message}</p>}

                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>Parcel Name</label>
                            <input
                                type="text"
                                placeholder="Parcel Name"
                                className={inputClass}
                                {...bindField("parcel_name", { required: "Parcel name is required." })}
                            />
                            {errors.parcel_name && <p className={errorClass}>{errors.parcel_name.message}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Parcel Weight (KG)</label>
                            <input
                                type="number"
                                placeholder="Parcel Weight (KG)"
                                className={inputClass}
                                {...bindField("parcel_weight", {
                                    required: "Parcel weight is required.",
                                    min: { value: 0.1, message: "Weight must be greater than 0." },
                                })}
                            />
                            {errors.parcel_weight && <p className={errorClass}>{errors.parcel_weight.message}</p>}
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <h2 className="mb-2 text-xs font-bold text-secondary">Sender Details</h2>
                            <div className="space-y-2">
                                <div>
                                    <label className={labelClass}>Sender Name</label>
                                    <input
                                        type="text"
                                        placeholder="Sender Name"
                                        className={inputClass}
                                        {...bindField("sender_name", { required: "Sender name is required." })}
                                    />
                                    {errors.sender_name && <p className={errorClass}>{errors.sender_name.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Sender Address</label>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className={inputClass}
                                        {...bindField("sender_address", { required: "Sender address is required." })}
                                    />
                                    {errors.sender_address && (
                                        <p className={errorClass}>{errors.sender_address.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelClass}>Sender Phone No</label>
                                    <input
                                        type="tel"
                                        placeholder="Sender Phone No"
                                        className={inputClass}
                                        {...bindField("sender_phone", {
                                            required: "Sender phone number is required.",
                                        })}
                                    />
                                    {errors.sender_phone && <p className={errorClass}>{errors.sender_phone.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Your District</label>
                                    <select
                                        defaultValue=""
                                        className={inputClass}
                                        {...bindField("sender_district", {
                                            required: "Please select your district.",
                                        })}
                                    >
                                        <option value="" disabled>
                                            Select your district
                                        </option>
                                        <option>Dhaka</option>
                                        <option>Chattogram</option>
                                        <option>Rajshahi</option>
                                        <option>Khulna</option> 
                                        <option>Barishal</option>
                                        <option>Sylhet</option>
                                        <option>Rangpur</option>
                                        <option>Mymensingh</option>
                                    </select>
                                    {errors.sender_district && (
                                        <p className={errorClass}>{errors.sender_district.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelClass}>Pickup Instruction</label>
                                    <textarea
                                        placeholder="Pickup Instruction Box"
                                        className="h-20 w-full resize-none rounded-sm border border-[#D9DEE5] bg-white px-3 py-2 text-xs text-secondary outline-none placeholder:text-[#A3ACB7] focus:border-[#A3D94E]"
                                        {...bindField("pickup_instruction", {
                                            required: "Pickup instruction is required.",
                                        })}
                                    />
                                    {errors.pickup_instruction && (
                                        <p className={errorClass}>{errors.pickup_instruction.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-2 text-xs font-bold text-secondary">Receiver Details</h2>
                            <div className="space-y-2">
                                <div>
                                    <label className={labelClass}>Receiver Name</label>
                                    <input
                                        type="text"
                                        placeholder="Receiver Name"
                                        className={inputClass}
                                        {...bindField("receiver_name", { required: "Receiver name is required." })}
                                    />
                                    {errors.receiver_name && (
                                        <p className={errorClass}>{errors.receiver_name.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelClass}>Receiver Address</label>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className={inputClass}
                                        {...bindField("receiver_address", {
                                            required: "Receiver address is required.",
                                        })}
                                    />
                                    {errors.receiver_address && (
                                        <p className={errorClass}>{errors.receiver_address.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelClass}>Receiver Contact No</label>
                                    <input
                                        type="tel"
                                        placeholder="Receiver Contact No"
                                        className={inputClass}
                                        {...bindField("receiver_phone", {
                                            required: "Receiver contact number is required.",
                                        })}
                                    />
                                    {errors.receiver_phone && (
                                        <p className={errorClass}>{errors.receiver_phone.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelClass}>Receiver District</label>
                                    <select
                                        defaultValue=""
                                        className={inputClass}
                                        {...bindField("receiver_district", {
                                            required: "Please select receiver district.",
                                        })}
                                    >
                                        <option value="" disabled>
                                            Select receiver district
                                        </option>
                                        <option>Dhaka</option>
                                        <option>Chattogram</option>
                                        <option>Rajshahi</option>
                                        <option>Khulna</option>
                                        <option>Barishal</option>
                                        <option>Sylhet</option>
                                        <option>Rangpur</option>
                                        <option>Mymensingh</option>
                                    </select>
                                    {errors.receiver_district && (
                                        <p className={errorClass}>{errors.receiver_district.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelClass}>Delivery Instruction</label>
                                    <textarea
                                        placeholder="Delivery Instruction"
                                        className="h-20 w-full resize-none rounded-sm border border-[#D9DEE5] bg-white px-3 py-2 text-xs text-secondary outline-none placeholder:text-[#A3ACB7] focus:border-[#A3D94E]"
                                        {...bindField("delivery_instruction", {
                                            required: "Delivery instruction is required.",
                                        })}
                                    />
                                    {errors.delivery_instruction && (
                                        <p className={errorClass}>{errors.delivery_instruction.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
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

                    {estimatedCost !== null && (
                        <p className="mt-4 text-sm font-semibold text-secondary">
                            Estimated Delivery Cost: <span className="text-primary">৳{estimatedCost}</span>
                        </p>
                    )}

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
