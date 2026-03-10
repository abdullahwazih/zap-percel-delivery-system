const ParcelTypeSelector = ({ bindField, errors, errorClass }) => {
    return (
        <>
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
        </>
    );
};

export default ParcelTypeSelector;
