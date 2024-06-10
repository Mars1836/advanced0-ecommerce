import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAuth } from "../redux/slices/authSlice";
import SocketInit from "../wapper_components/SocketInit";
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType
): React.ComponentType<P> => {
  return (props: P) => {
    const user = useSelector(selectUserAuth);
    useEffect(() => {
      console.log("authhhh");
    }, []);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return (
      <SocketInit>
        <WrappedComponent {...props} />
      </SocketInit>
    );
  };
};

export default withAuth;
