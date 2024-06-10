import styles from "./footer.module.scss";
import classNames from "classnames/bind";
import feature1 from "../../assets/feature-icon-1.svg";
import feature2 from "../../assets/feature-icon-2.svg";
import feature3 from "../../assets/feature-icon-3.svg";
import feature4 from "../../assets/feature-icon-4.svg";
import feature5 from "../../assets/feature-icon-5.svg";
import "../../styles/responsive.scss";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("footer")}>
      <div className="grid wide">
        <div className={cx("feature_wrapper")}>
          <div className="row">
            <div className="col s3-2.4 s2-4 s1-6 s0-6">
              <div className={cx("feature")}>
                <img alt="" src={feature1} />
                <p className={cx("text-weight")}>FAST DELIVERY</p>
                <p className={cx("text-light")}>Across West & East India</p>
              </div>
            </div>
            <div className="col s3-2.4  s2-4 s1-6 s0-6">
              <div className={cx("feature")}>
                <img alt="" src={feature2} />
                <p className={cx("text-weight")}>SAFE PAYMENT</p>
                <p className={cx("text-light")}>100% Secure Payment</p>
              </div>
            </div>
            <div className="col s3-2.4  s2-4 s1-6 s0-6">
              <div className={cx("feature")}>
                <img alt="" src={feature3} />
                <p className={cx("text-weight")}>ONLINE DISCOUNT</p>
                <p className={cx("text-light")}>Add Multi-buy Discount</p>
              </div>
            </div>
            <div className="col s3-2.4  s2-4 s1-6 s0-6">
              <div className={cx("feature")}>
                <img alt="" src={feature4} />
                <p className={cx("text-weight")}>HELP CENTER</p>
                <p className={cx("text-light")}>Dedicated 24/7 Support</p>
              </div>
            </div>
            <div className="col s3-2.4 l s2-4 s1-6 s0-6">
              <div className={cx("feature")}>
                <img alt="" src={feature5} />
                <p className={cx("text-weight")}>CURATED ITEMS</p>
                <p className={cx("text-light")}>From Handpicked Sellers</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("widget_wrapper")}>
          <div className="row">
            <div className="col s3-2.4 s2-4 s1-6 s0-12">
              <div className={cx("widget")}>
                <p className={cx("text-weight", "title")}>LET US HELP YOU</p>
                <p className={cx("text-light")}>
                  {"If you have any question, please"}
                  <br />
                  {" contact us at: "}
                  <a className={cx("text-link")}>support@example.com</a>
                </p>
                <br />
                <br />
                <p className={cx("text-light")}>Social Media:</p>
                <p className={cx("text-light")}>Social Media:</p>
              </div>
            </div>
            <div className="col s3-2.4 s2-4 s1-6 s0-12">
              <div className={cx("widget")}>
                <p className={cx("text-weight", "title")}>
                  LOOKING FOR ORFARM?
                </p>
                <p className={cx("text-light")}>
                  68 St. Vicent Place, Glasgow, Greater Newyork NH2012, UK.
                </p>
                <br />
                <br />
                <div>
                  <p className={cx("text-light")}>Monday – Friday:</p>{" "}
                  <p className={cx("text-weight")}>8:10 AM – 6:10 PM</p>
                </div>
                <div>
                  <p className={cx("text-light")}>Saturday:</p>{" "}
                  <p className={cx("text-weight")}>10:10 AM – 06:10 PM</p>
                </div>
                <div>
                  <p className={cx("text-light")}>Sunday:</p>{" "}
                  <p className={cx("text-weight")}>Close</p>
                </div>
              </div>
            </div>
            <div className="col s3-2.4 s2-4 s1-6 s0-12">
              <div className={cx("widget")}>
                <p className={cx("text-weight", "title")}>HOT CATEGORIES</p>
                <p className={cx("text-light")}>Fruits & Vegetables</p>
                <p className={cx("text-light")}>Dairy Products</p>
                <p className={cx("text-light")}>Package Foods</p>
                <p className={cx("text-light")}>Beverage</p>
                <p className={cx("text-light")}>Health & Wellness</p>
              </div>
            </div>
            <div className="col s3-full s2-12 s1-12 s0-12">
              <div className={cx("widget", "widget_last")}>
                <p className={cx("text-weight", "title")}>OUR NEWSLETTER</p>
                <p className={cx("text")}>
                  Subscribe to the Orfarm mailing list to receive updates on new
                  arrivals & other information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
