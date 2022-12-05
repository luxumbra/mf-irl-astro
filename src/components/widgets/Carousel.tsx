import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const Carousel = () => {
  console.log(Swiper, SwiperSlide);

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      navigation
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  );
}

export default Carousel;