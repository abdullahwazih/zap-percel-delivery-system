import { useParams } from 'react-router';

const Payment = () => {
    const { parcelId } = useParams();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Payment</h2>
            <p>Parcel ID: {parcelId}</p>
        </div>
    );
};

export default Payment;
