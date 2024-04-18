import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../App.css';

const ImageSlider = ({ images }) => {
  return (
    <>
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images?.map((img, idx) => (
          <SwiperSlide className="sm:max-h-[28rem] w-full" key={idx}>
            <img src={img} alt={img} className="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
