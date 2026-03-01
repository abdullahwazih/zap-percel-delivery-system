import Banner from "../Components/Home/Banner";
import CompanySwiper from "../Components/Home/CompanySwiper";
import DeliveryHighlights from "../Components/Home/DeliveryHighlights";
import FAQSection from "../Components/Home/FAQSection";
import HowItWorks from "../Components/Home/HowItWorks";
import MerchantPriority from "../Components/Home/MerchantPriority";
import OurService from "../Components/Home/OurService";
import Review from "../Components/Home/Review";
import Divider from "../Components/shared/Divider";

const HomeLayout = () => {
    return (
        <>
            <Banner />
            <HowItWorks />
            <OurService />
            <CompanySwiper />
            <Divider />
            <DeliveryHighlights />
            <MerchantPriority />
            <Review />
            <FAQSection />
        </>
    );
};

export default HomeLayout;
