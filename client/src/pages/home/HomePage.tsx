import * as React from "react";
import DefaultLayout from "../../layouts/default/DefaultLayout";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../configs/axios.config";
import ChatForm from "../../components/chat_form/ChatForm";
import ProductCardSwiper from "../../components/product_card_swiper/ProductCardSwiper";
import SwiperBoard from "../../components/swiper _board/SwiperBoard";
import Responsive from "../../components/test/Test";
export interface Props {}

const HomePage: React.ComponentType = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get("/product/spu/suggest");
      setProducts(data.metadata);
    };
    fetchData();
  }, []);
  return (
    <DefaultLayout>
      <SwiperBoard></SwiperBoard>
      <ProductCardSwiper products={products}></ProductCardSwiper>
      <ChatForm></ChatForm>
    </DefaultLayout>
  );
};
export default HomePage;
