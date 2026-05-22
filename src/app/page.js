import BookNavigation from "@/component/MainPageComponents/BookNavigation/BookNavigation";
import HeroBanner from "@/component/MainPageComponents/hero/HeroBanner";
import LatestRooms from "@/component/MainPageComponents/LatestRooms/LatestRooms";
import RoomCard from "@/component/roomComponents/RoomCard/RoomCard";

const page = () => {
    
    return (
        <div>
            <div className=' w-screen'>
                <HeroBanner></HeroBanner>
                <LatestRooms></LatestRooms>
                <BookNavigation></BookNavigation>
            </div>
        </div>
    );
};

export default page;