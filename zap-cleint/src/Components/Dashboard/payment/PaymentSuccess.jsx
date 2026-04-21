import { Link, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const PaymentSuccess = () => {
    
    const axiosInstance = useAxios();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['payment-session-status', sessionId],
        enabled: !!sessionId,
        queryFn: async () => {
            const response = await axiosInstance.get('/payments/session-status', {
                params: { session_id: sessionId }
            });
            return response.data;
        }
    });

    const isPaid = data?.payment_status === 'paid';
    const hasSessionId = !!sessionId;

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="card w-full max-w-xl bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                            ✓
                        </div>
                        <h2 className="card-title text-2xl">
                            {!hasSessionId ? 'Invalid Payment Session' : isPaid ? 'Payment Successful' : 'Payment Processing'}
                        </h2>
                    </div>
                    <p className="mt-2 text-base-content/70">
                        {!hasSessionId
                            ? 'No Stripe session id found in URL.'
                            : isPaid
                            ? 'Thanks! Your payment was completed and your parcel is now in processing.'
                            : 'Your payment is being verified. Refresh in a moment if this stays pending.'}
                    </p>
                    {isLoading && (
                        <p className="mt-2 text-sm text-base-content/60">Checking payment status...</p>
                    )}
                    {isError && (
                        <p className="mt-2 text-sm text-error">Could not verify payment status right now.</p>
                    )}
                    {data?.payment_status && (
                        <p className="mt-2 text-sm text-base-content/60">
                            Status: {data.payment_status}
                        </p>
                    )}
                    {sessionId && (
                        <p className="mt-2 text-sm text-base-content/50 break-all">
                            Session ID: {sessionId}
                        </p>
                    )}
                    <div className="card-actions mt-4">
                        <Link to="/dashboard/my-parcels" className="btn btn-primary">
                            View My Parcels
                        </Link>
                        <Link to="/" className="btn btn-ghost">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
