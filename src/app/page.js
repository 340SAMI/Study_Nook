import BookNavigation from "@/component/BookNavigation.jsx/BookNavigation";
import HeroBanner from "@/component/hero/HeroBanner";

const page = () => {
    return (
        <div>
            <div className=' w-screen'>
                <HeroBanner></HeroBanner>
                <BookNavigation></BookNavigation>
            </div>
        </div>
    );
};

export default page;