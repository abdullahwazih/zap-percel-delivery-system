import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcel = () => {


    const { authInfo } = useAuth();
    const { user } = authInfo;

    const axiosInstance = useAxios();




    const { data: parcels, isLoading, error, refetch } = useQuery({

        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get('/parcels?email=' + user?.email);
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error occurred</p>;
    console.log(parcels);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                axiosInstance.delete(`parcels/${id}`)
                    .then(response => {
                        console.log('Parcel deleted:', response.data);
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your parcel has been deleted.",
                            icon: "success"
                        });

                    })
                    .catch(error => {       
                        console.error('Error deleting parcel:', error);
                    });

            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <p>Parcels of user {user?.email}</p>
            <table className="table table-md">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Destination</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Cost</th>
                        <th>Payment Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => {
                        const isPaid = parcel?.payment_status === 'paid' || parcel?.paid === true;
                        
                        return (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{parcel.parcel_name}</td>
                            <td>{parcel.parcel_weight}</td>
                            <td>{parcel.receiver_name}</td>
                            <td>{parcel.receiver_address}</td>
                            <td>{parcel.receiver_phone}</td>
                            <td>{parcel.delivery_cost}</td>
                            <td>
                                <div className="flex items-center gap-2">
                                    <span className={`badge ${isPaid ? 'badge-success' : 'badge-warning'}`}>
                                        {isPaid ? 'Paid' : 'Unpaid'}
                                    </span>
                                    {!isPaid && (
                                        <Link to={`/dashboard/payment/${parcel._id}`} className="btn btn-xs btn-primary">
                                            Pay
                                        </Link>
                                    )}
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center gap-2">
                                    <button className="btn btn-sm btn-ghost" title="View" aria-label="View">
                                        <Eye size={16} />
                                    </button>
                                    <button className="btn btn-sm btn-ghost" title="Edit" aria-label="Edit">
                                        <Pencil size={16} />
                                    </button>
                                    <button className="btn btn-sm btn-ghost text-red-500" title="Delete" aria-label="Delete" onClick={() => handleDelete(parcel._id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}

export default MyParcel;
