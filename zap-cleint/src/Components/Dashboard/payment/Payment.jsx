import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosInstance = useAxios();

    const { data: parcelData } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/parcels/${parcelId}`);
            return response.data;
        }
    });

    const handlePayment = async () => {
        if (!parcelData) return;

        const paymentInfo = {
            parcelId: parcelId,
            cost: parcelData.delivery_cost,      // ✅ FIXED (was amount)
            email: parcelData.senderEmail,       // ✅ FIXED (was customerEmail)
            parcelName: parcelData.parcel_name   // ✅ REQUIRED for Stripe
        };

        try {
            const res = await axiosInstance.post('/create-checkout-session', paymentInfo);
            console.log('Checkout session created:', res.data);

            // 🔥 Redirect to Stripe Checkout
            console.log('Redirecting to Stripe Checkout at:', res.data.url);
            window.location.href = res.data.url;

        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Payment</h2>
            <p>Parcel ID: {parcelId}</p>
            <p>Sender Email: {parcelData?.senderEmail}</p>
            <p>Parcel Name: {parcelData?.parcel_name}</p>
            <p>Parcel Cost: {parcelData?.delivery_cost} </p>
            <button onClick={handlePayment} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
