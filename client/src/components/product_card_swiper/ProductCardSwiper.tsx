import classNames from "classnames/bind";
import ProductCard from "../product_card/ProductCard";
import styles from "./product_card_swiper.module.scss";
import "../../styles/responsive.scss";
import Slider from "react-slick";

type Props = {
  products: Array<ProductInfor>;
};
type ProductInfor = {
  thumb: string;
  id: string;
  name: string;
  price: number;
  description: string;
  ratingAverage: number;
};
const cx = classNames.bind(styles);
const ProductCardSwiper = ({ products }: Props) => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className={cx("card-swiper-wrapper")}>
      <div className="slider-container">
        <Slider {...settings}>
          {products?.map((product) => {
            return <ProductCard product={product} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ProductCardSwiper;
