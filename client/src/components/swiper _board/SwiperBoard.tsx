import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./swiper_board.module.scss";
import classNames from "classnames/bind";
import swiperboard1 from "../../assets/swiperboard1.jpg";
import swiperboard2 from "../../assets/swiperboard2.jpg";
import swiperboard3 from "../../assets/swiperboard3.jpg";
import "./slick.scss";
const cx = classNames.bind(styles);
export default function SwiperBoard() {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    cssEase: "linear",
    pauseOnHover: true,
  };
  return (
    <div className="swiper-board-wrapper">
      <div className={cx("swiper-board", "slider-containe")}>
        <Slider {...settings}>
          <div className={cx("item")}>
            <img src={swiperboard1} alt="" />
          </div>
          <div className={cx("item")}>
            <img src={swiperboard2} alt="" />
          </div>
          <div className={cx("item")}>
            <img src={swiperboard3} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}
