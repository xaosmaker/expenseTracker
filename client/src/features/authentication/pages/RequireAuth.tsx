import { Navigate, Outlet } from "react-router-dom";
import { parse } from "cookie";

export default function RequireAuth() {
  const cookie = parse(document.cookie)
  let loginCookie: { isLogin: boolean } = { isLogin: false };

  if (typeof cookie.login === "string") {
    try {
      loginCookie = JSON.parse(cookie.login);
    }
    catch (e) {
      console.log(e);
    }

  }

  if (loginCookie.isLogin) {
    return <Outlet />

  }
  return <Navigate to={"/login"}></Navigate>










}

