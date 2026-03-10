const DISTRICTS = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"];

const textareaClass =
    "h-20 w-full resize-none rounded-sm border border-[#D9DEE5] bg-white px-3 py-2 text-xs text-secondary outline-none placeholder:text-[#A3ACB7] focus:border-[#A3D94E]";

const SenderDetails = ({ bindField, errors, inputClass, labelClass, errorClass }) => {
    return (
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
                    {errors.sender_address && <p className={errorClass}>{errors.sender_address.message}</p>}
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
                        {DISTRICTS.map((district) => (
                            <option key={district}>{district}</option>
                        ))}
                    </select>
                    {errors.sender_district && <p className={errorClass}>{errors.sender_district.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Pickup Instruction</label>
                    <textarea
                        placeholder="Pickup Instruction Box"
                        className={textareaClass}
                        {...bindField("pickup_instruction", {
                            required: "Pickup instruction is required.",
                        })}
                    />
                    {errors.pickup_instruction && <p className={errorClass}>{errors.pickup_instruction.message}</p>}
                </div>
            </div>
        </div>
    );
};

export default SenderDetails;
