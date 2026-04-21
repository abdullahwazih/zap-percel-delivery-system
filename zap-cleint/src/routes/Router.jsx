import { createBrowserRouter } from "react-router";
import BaseLayout from "../layout/BaseLayout";
import HomeLayout from "../layout/HomeLayout";
import Coverage from "../Components/Coverage_02";
import AboutUs from "../Components/AboutUs";
import AuthLayout from "../layout/Routing_Layouts/AuthLayout";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import Rider from "../Components/be_a_rider/Rider";
import PrivateRoutes from "./PrivateRoutes";
import SendPercel from "../Components/send_parcel/SendPercel";
import Dashboard from "../layout/Routing_Layouts/Dashboard";
import MyParcel from "../Components/Dashboard/my_percels/MyPercel";
import Payment from "../Components/Dashboard/payment/Payment";
import PaymentSuccess from "../Components/Dashboard/payment/PaymentSuccess";
import PaymentCancelled from "../Components/Dashboard/payment/PaymentCancelled";


const router = createBrowserRouter([
    {
        path: "/",
        Component: BaseLayout,
        children: [
            {
                path: "/",
                Component: HomeLayout,
            },
            {
                path: "/coverage",
                Component: Coverage,
            },
            {
                path: "/about",
                Component: AboutUs,
            },
            {
                path: '/rider',
                element: <PrivateRoutes> <Rider /></PrivateRoutes>

            },
            {
                path: 'send-percel',
                element: <PrivateRoutes><SendPercel /></PrivateRoutes>
            }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "register",
                Component: Register,
            },
            {
                path: "login",
                Component: Login,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes> <Dashboard /> </PrivateRoutes>,
        children: [
            {
                path: "my-parcels",
                Component: MyParcel,
            },
            {
                path: "payment/:parcelId",
                Component: Payment,
            },
            {
                path: "payment-success",
                Component: PaymentSuccess,
            },
            {
                path: "payment-cancelled",
                Component: PaymentCancelled,
            },
        ]
    }
]);

export default router;
