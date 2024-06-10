import React from "react";
import StarRatings from "react-star-ratings";
import { truncate } from "../../helpers";

type Props = {
  thumb: string;
  id: string;
  name: string;
  price: number;
  description: string;
  ratingAverage: number;
};

const ProductCart = (props: Props) => {
  return (
    <div className="card" key={props.id}>
      <img className="card-image" src={props.thumb} alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{truncate(props.name, 55)}</h5>
        <p className="card-description">{truncate(props.description, 55)}</p>
        <p className="card-price">${props.price}</p>
        <div className="card-detail">
          <StarRatings
            rating={props.ratingAverage}
            starDimension="16px"
            starSpacing="1px"
            starRatedColor="black"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
