import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import core Swiper CSS
import "swiper/css/navigation"; // Import Navigation module CSS
import "swiper/css/pagination"; // Import Pagination module CSS
import "swiper/css/autoplay"; // Import Autoplay module CSS

// Import Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import necessary modules

const Home = () => {
  return (
    <>
      <div
        className="w-full z-10 bg-blue-800 flex justify-center items-center text-4xl text-white font-extrabold py-4 shadow-md mt-20"
      >
        Find and Host Events with eventA
      </div>
      
      {/* Swiper Section */}
      <div className="w-full mt-6">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={true} // Enable navigation
          pagination={{ clickable: true }} // Enable pagination
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Enable autoplay with 3s delay
          modules={[Navigation, Pagination, Autoplay]} // Add Autoplay to modules
          className="swiper-container"
        >
          <SwiperSlide>
            <img src="https://placehold.co/1200x400" alt="Slide 1" className="w-full h-auto" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://placehold.co/1200x400" alt="Slide 2" className="w-full h-auto" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://placehold.co/1200x400" alt="Slide 3" className="w-full h-auto" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://placehold.co/1200x400" alt="Slide 4" className="w-full h-auto" />
          </SwiperSlide>
        </Swiper>
      </div>

      <br />

      {/* Event Cards Section */}
      <div className="flex justify-evenly">
        <div
          className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Wedding</h2>
            <p>Book your wedding venues</p>
          </div>
          <figure>
            <img src="https://placehold.co/600x400" alt="Wedding" />
          </figure>
        </div>

        <div
          className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Live Concert</h2>
            <p>Book your tickets</p>
          </div>
          <figure>
            <img src="https://placehold.co/600x400" alt="Concert" />
          </figure>
        </div>

        <div
          className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Political Event</h2>
            <p>Participate in your favorite political event</p>
          </div>
          <figure>
            <img src="https://placehold.co/600x400" alt="Political Event" />
          </figure>
        </div>
      </div>

      <br />
      <br />

      <div className="flex justify-evenly">
        <div
          className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Educational Event</h2>
            <p>Participate in your favorite education session</p>
          </div>
          <figure>
            <img src="https://placehold.co/600x400" alt="Educational Event" />
          </figure>
        </div>

        <div
          className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Sports</h2>
            <p>Register your team or buy tickets.</p>
          </div>
          <figure>
            <img src="https://placehold.co/600x400" alt="Sports" />
          </figure>
        </div>

        <div
          className="card bg-base-100 w-96 shadow-xl object-cover transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Food Festival</h2>
            <p>Book your tickets for the festival.</p>
          </div>
          <figure>
            <img src="https://placehold.co/600x400" alt="Food Festival" />
          </figure>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Home;
