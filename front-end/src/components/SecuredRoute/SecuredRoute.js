
import React from "react";
import { Route } from "react-router-dom";
export const Forbidden = () => <div>Forbidden</div>;
const SecuredRoute = ({ component, render, path,  token }) => {
 const renderIf = props => {
   if (!token) {
     return <Forbidden />;
   }
   if (render) {
     return render(props);
   }
   const Component = component
   return <Component {...props} />;
 };
 return <Route path={path} render={renderIf} />;
};
export default SecuredRoute;