const DISTRICTS = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"];

const textareaClass =
    "h-20 w-full resize-none rounded-sm border border-[#D9DEE5] bg-white px-3 py-2 text-xs text-secondary outline-none placeholder:text-[#A3ACB7] focus:border-[#A3D94E]";

const ReceiverDetails = ({ bindField, errors, inputClass, labelClass, errorClass }) => {
    return (
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
                    {errors.receiver_name && <p className={errorClass}>{errors.receiver_name.message}</p>}
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
                    {errors.receiver_address && <p className={errorClass}>{errors.receiver_address.message}</p>}
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
                    {errors.receiver_phone && <p className={errorClass}>{errors.receiver_phone.message}</p>}
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
                        {DISTRICTS.map((district) => (
                            <option key={district}>{district}</option>
                        ))}
                    </select>
                    {errors.receiver_district && <p className={errorClass}>{errors.receiver_district.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Delivery Instruction</label>
                    <textarea
                        placeholder="Delivery Instruction"
                        className={textareaClass}
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
    );
};

export default ReceiverDetails;
