import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../../store/GlobalProvider";

// Show the component only when the user is logged in
// Otherwise, redirect the user to login page
const PrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("institution") !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

export default PrivateRoute;
