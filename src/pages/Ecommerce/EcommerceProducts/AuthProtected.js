import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useProfile } from "../../../Components/Hooks/UserHooks";

import { logoutUser } from "../../../store/actions";

const AuthProtected = (props) => {
  /*
    Navigate is un-auth access protected routes via url
    */

  // if (!userProfile && loading && !token) {
  //   return (
  //     <Navigate to={{ pathname: "/landing", state: { from: props.location } }} />
  //   );
  // }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };