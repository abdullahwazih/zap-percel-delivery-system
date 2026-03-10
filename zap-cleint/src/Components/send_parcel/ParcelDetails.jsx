const ParcelDetails = ({ bindField, errors, inputClass, labelClass, errorClass }) => {
    return (
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
    );
};

export default ParcelDetails;
