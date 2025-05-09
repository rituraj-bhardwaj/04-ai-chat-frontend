import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Message, Cards } from "./index";

const ChatContainer = ({ messages, className }) => {
  // console.log(messages);
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2700,
    arrows: true,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 3,
          dots: false,
          autoplay: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  return messages?.length === 0 ? (
    <div
      className={`w-full flex flex-col justify-center px-8 ${className} slider-container`}
    >
      <Slider {...settings}>
        <Cards />
        <Cards />
        <Cards />
      </Slider>

    </div>
  ) : (
    <div
      className={`w-full max-w-[1024px] flex flex-col gap-4 py-6 px-2 my-1 mx-auto overflow-y-scroll ${className}`}
    >
      {messages.map((item) => (
        <Message key={item?.id} id={item?.id} messageType={item?.role} message={item?.content} />
      ))}
    </div>
  );
};

export default ChatContainer;
