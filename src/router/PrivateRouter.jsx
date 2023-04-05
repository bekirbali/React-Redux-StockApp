import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.authReducer);
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
