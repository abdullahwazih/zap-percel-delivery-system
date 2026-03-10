const CostSummary = ({ estimatedCost }) => {
    if (estimatedCost === null) {
        return null;
    }

    return (
        <p className="mt-4 text-sm font-semibold text-secondary">
            Estimated Delivery Cost: <span className="text-primary">৳{estimatedCost}</span>
        </p>
    );
};

export default CostSummary;
