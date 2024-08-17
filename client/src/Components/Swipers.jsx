import img1 from '../assets/images/carousel1.jpg'
import img2 from '../assets/images/carousel2.jpg'
import img3 from '../assets/images/carousel3.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Slide from './Slide';

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Slide image={img1} text={'Start Your Digital Marketing Campaigns up n running'}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img2} text={'Get Your Web Development Program Done In A Minute'}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img3} text={'Get Your Graphic Design Project Done In A Minute'}></Slide></SwiperSlide>
      </Swiper>
    </>
  );
}