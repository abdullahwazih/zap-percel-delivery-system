import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="card w-full max-w-xl bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                            !
                        </div>
                        <h2 className="card-title text-2xl">Payment Cancelled</h2>
                    </div>
                    <p className="mt-2 text-base-content/70">
                        Your payment was cancelled. If this was a mistake, you can try again.
                    </p>
                    <div className="card-actions mt-4">
                        <Link to="/dashboard/my-parcels" className="btn btn-primary">
                            Try Again
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

export default PaymentCancelled;
