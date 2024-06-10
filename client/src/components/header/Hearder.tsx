import React, { ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./hearder.module.scss";
import logo from "../../assets/logo.png";
import "../../styles/responsive.scss";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import { resetAuthState, selectUserAuth } from "../../redux/slices/authSlice";
import {
  selectNotifications,
  setReadToTrue,
} from "../../redux/slices/notiSlice";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Modal from "@mui/material/Modal";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
const cx = classNames.bind(styles);
function Header() {
  const noti = useSelector(selectNotifications);
  const user = useSelector(selectUserAuth);
  const [openModal, setOpenModal] = React.useState(true);
  const [openSideHeader, setOpenSideHeader] = React.useState(true);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [textSearch, setTextSearch] = React.useState("");

  const dispatch = useDispatch();
  const newNotiNumber: number =
    noti?.filter((i) => {
      return i.isRead === false;
    }).length ?? 0;
  const handleClickNoti = () => {
    console.log("aasdsa");
    dispatch(setReadToTrue());
  };
  const handleTextSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };
  const handleLogout = () => {
    dispatch(resetAuthState());
    window.location.reload();
  };
  return (
    <div className={cx("header")}>
      <div className={cx("header_wrapper", "wide")}>
        <div className={cx("btn_menu_header_mobile")} onClick={handleOpenModal}>
          <MenuIcon sx={{ fontSize: "34px" }}></MenuIcon>
        </div>
        <div className={cx("logo_wrapper")}>
          <img src={logo} alt="" />
        </div>
        <div className={cx("search_wrapper")}>
          <input
            type="text"
            placeholder="Search products...."
            onChange={handleTextSearchChange}
            value={textSearch}
          />{" "}
        </div>
        <div className={cx("action_btn_wrapper")}>
          <p className={cx("user_name")}>{user?.name}</p>
          <>
            <button className={cx("btn", "btn_user")} id="btn_user">
              <PersonOutlineOutlinedIcon />
            </button>
            {user && (
              <Tooltip
                anchorSelect="#btn_user"
                openOnClick={true}
                clickable={true}
                className={cx("user_tooltip_wrapper")}
              >
                <button className={cx("user_tooltip_item")}>Account</button>
                <button className={cx("user_tooltip_item")}>Order</button>
                <button
                  className={cx("user_tooltip_item")}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Tooltip>
            )}
          </>
          <button className={cx("btn", "btn_cart")}>
            <ShoppingCartOutlinedIcon />
          </button>

          <Badge badgeContent={newNotiNumber} color="primary">
            <button
              className={cx("btn", "btn_noti")}
              id="btn_noti"
              onClick={handleClickNoti}
            >
              <NotificationsNoneOutlinedIcon />
            </button>
          </Badge>
          {user && (
            <Tooltip
              anchorSelect="#btn_noti"
              openOnClick={true}
              clickable={true}
              className={cx("noti_tooltip_wrapper")}
              place="bottom-end"
            >
              {noti &&
                noti.map((item) => {
                  return (
                    <div className={cx("noti_tooltip_item")} key={item._id}>
                      <p className={cx("noti_tooltip_title")}>{item.title}</p>
                      <p className={cx("noti_tooltip_content")}>
                        {item.content}
                      </p>
                    </div>
                  );
                })}
            </Tooltip>
          )}
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <div className={cx("modal_header")} onClick={handleCloseModal}>
          <div
            className={cx("header-side", { open: openSideHeader })}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <button
              className={cx("btn_close_header_side")}
              onClick={handleCloseModal}
            >
              Close <ClearOutlinedIcon sx={{ fontSize: "18px" }} />
            </button>
            <div className={cx("header_side_body")}>
              <div className={cx("search_header_side_wrapper")}>
                <input
                  type="text"
                  placeholder="Search products...."
                  onChange={handleTextSearchChange}
                  value={textSearch}
                  className={cx("search_header_side")}
                />{" "}
              </div>
              <div className={cx("header_side_menu")}>
                <div className={cx("header_side_menu_item")}>
                  <HomeOutlinedIcon />
                  <p>Home</p>
                </div>
                {!user ? (
                  <div className={cx("header_side_menu_item")}>
                    <PersonOutlineOutlinedIcon />
                    <p>Login / Register</p>
                  </div>
                ) : (
                  <>
                    <div className={cx("header_side_menu_item")}>
                      <ChatBubbleOutlineOutlinedIcon />
                      <p>Chat</p>
                    </div>

                    <div className={cx("header_side_menu_item")}>
                      <LogoutOutlinedIcon />
                      <p>Logout</p>
                    </div>
                  </>
                )}
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
