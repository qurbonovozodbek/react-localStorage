import React from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdShoppingBasket } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";




function layout() {
  return (
    <>
      <div className="container">
          <div className="navBar">
            <div className="links">
              <div className="home">
                <NavLink to="/">
                  <BiSolidCategoryAlt />
                </NavLink>
              </div>
              <div className="savat">
                <NavLink to="/savat">
                  <MdShoppingBasket />
                </NavLink>
              </div>
            </div>
          </div>
        <div className="menu">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default layout;