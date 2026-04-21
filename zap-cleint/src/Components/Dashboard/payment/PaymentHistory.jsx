import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const { authInfo } = useAuth();
    const { user } = authInfo || {};
    const axiosInstance = useAxios();

    const {
        data: payments = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["paymentHistory", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get(`/payment-history?email=${user.email}`);
            return res.data;
        },
    });

    return (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Payment History</h2>
                <p className="text-sm text-base-content/60">
                    Parcels with completed transactions.
                </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-base-200 bg-base-100">
                <table className="table table-md">
                    <thead>
                        <tr>
                            <th>Parcel Name</th>
                            <th>Parcel Id</th>
                            <th>Sender Email</th>
                            <th>Receiver Email</th>
                            <th>Receiver Name</th>
                            <th>Address</th>
                            <th>Cost</th>
                            <th>Tracking Number</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={9} className="py-10 text-center text-base-content/60">
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={9} className="py-10 text-center text-base-content/60">
                                    Failed to load payment history.
                                </td>
                            </tr>
                        ) : payments.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="py-10 text-center text-base-content/60">
                                    No payment history found.
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="font-medium">{payment.parcel_name}</td>
                                    <td className="font-mono text-xs break-all">{payment.parcel_id}</td>
                                    <td className="text-xs break-all">{payment.sender_email}</td>
                                    <td className="text-xs break-all">{payment.receiver_email}</td>
                                    <td>{payment.receiver_name}</td>
                                    <td className="text-xs break-all">{payment.address}</td>
                                    <td>
                                        <span className="badge badge-success badge-outline">
                                            ৳ {payment.cost}
                                        </span>
                                    </td>
                                    <td className="font-mono text-xs break-all">{payment.tracking_number}</td>
                                    <td className="text-xs break-all">{payment.created_at}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
 
