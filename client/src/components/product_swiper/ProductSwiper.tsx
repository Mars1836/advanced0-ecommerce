import styles from "./product_swiper.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const ProductSwiper: React.ComponentType = () => {
  return <div className={cx("product_swiper")}></div>;
};
export default ProductSwiper;
