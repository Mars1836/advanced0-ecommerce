import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./default.module.scss";
import Header from "../../components/header/Hearder";
import Footer from "../../components/footer/Footer";

type Props = {
  children: ReactNode;
};

const cx = classNames.bind(styles);
function DefaultLayout({ children }: Props) {
  return (
    <div className={cx("default_layout")}>
      <Header></Header>
      <div className={cx("body_wrapper")}>{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default DefaultLayout;
