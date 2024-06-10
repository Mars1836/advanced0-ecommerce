import styles from "./login.module.scss";
import "../../styles/responsive.scss";
import classNames from "classnames/bind";
import DefaultLayout from "../../layouts/default/DefaultLayout";
import { useLoginMutation } from "../../redux/slices/authApi";
import { useState } from "react";
const cx = classNames.bind(styles);
export interface Props {}

const LoginPage: React.ComponentType = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [login] = useLoginMutation();
  function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setPasswordInput(e.target.value);
  }

  function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmailInput(e.target.value);
  }
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const userData = await login({
      email: emailInput,
      password: passwordInput,
    }).unwrap();
    console.log(userData);
  }
  return (
    <DefaultLayout>
      <div className="grid wide">
        <div className="row center">
          <div className="col s3-6 s2-8 s1-10 s0-12">
            <form action="" className={cx("form")} onSubmit={handleSubmit}>
              <div className={cx("input_wrapper")}>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className={cx("boundary")}
                  onChange={handleEmailInput}
                  value={emailInput}
                />
              </div>
              <div className={cx("input_wrapper")}>
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  className={cx("boundary")}
                  onChange={handlePasswordInput}
                  value={passwordInput}
                />
              </div>
              <button type="submit" className={cx("submit", "boundary")}>
                Login Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LoginPage;
