import React from "react";
import StarRatings from "react-star-ratings";
import { truncate } from "../../helpers";
import styles from "./product_card.module.scss";
import classNames from "classnames/bind";
import "../../styles/responsive.scss";
const url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIaV14amUsHT20W6VcjdlaXusePBfAlnR6UQ&s";
type Props = {
  product: {
    thumb: string;
    id: string;
    name: string;
    price: number;
    description: string;
    ratingAverage: number;
  };
};
const cx = classNames.bind(styles);
const ProductCard = ({ product }: Props) => {
  return product ? (
    <div className={cx("card-wrapper")} key={product.id}>
      <div className={cx("card")}>
        <img
          className="card-image"
          src={/* product?.thumb || */ url}
          alt={product?.name}
        />
        <div className={cx("card-body")}>
          <div className={cx("card-category")}>
            <a>aasd</a>
            <a>asddds</a>
          </div>
          <a className={cx("card-title")}>{truncate(product?.name, 19)}</a>
          <div className={cx("card-detail")}>
            <StarRatings
              rating={product?.ratingAverage}
              starDimension="18px"
              starSpacing="1px"
              starRatedColor="orange"
            />
          </div>
          <p className={cx("card-price")}>${product?.price}</p>
          {/* <div className={cx("cart-btn-wrapper")}>
              {" "}
              <button className={cx("cart-btn")}>Button</button>
            </div> */}
        </div>
      </div>
    </div>
  ) : (
    <p></p>
  );
};

export default ProductCard;
