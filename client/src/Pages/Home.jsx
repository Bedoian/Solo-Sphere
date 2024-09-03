
import TabJobs from "../Components/TabJobs";
import Swipers from '../Components/Swipers'
const Home = () => {
    return (
        <div>
            <div className=" lg:mx-20">
                <Swipers></Swipers>
            </div>
            <TabJobs></TabJobs>
        </div>
    );
};

export default Home;