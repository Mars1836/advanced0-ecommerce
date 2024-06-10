import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAuth } from "../redux/slices/authSlice";
const withoutAuth = <P extends object>(
  WrappedComponent: React.ComponentType
): React.ComponentType<P> => {
  return (props: P) => {
    const user = useSelector(selectUserAuth);
    const navigate = useNavigate();
    useEffect(() => {
      if (user) navigate("/");
    }, [user, navigate]);
    if (user) {
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withoutAuth;
