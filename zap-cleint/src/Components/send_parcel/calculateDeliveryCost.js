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

    const extraKg = Math.ceil(weight - 3);
    const extraWeightCharge = extraKg * 40;
    const outsideCitySurcharge = isWithinCity ? 0 : 40;

    return baseCost + extraWeightCharge + outsideCitySurcharge;
};

export default calculateDeliveryCost;
