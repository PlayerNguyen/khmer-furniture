import React, { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Link, Route, Routes } from "react-router-dom";
const Home = React.lazy(() => import("./components/Home/Home"));
const Credentials = React.lazy(() =>
  import("./components/Credentials/Credentials")
);
import "react-toastify/dist/ReactToastify.css";
const SignUp = React.lazy(() => import("./components/Credentials/SignUp"));
const SignIn = React.lazy(() => import("./components/Credentials/SignIn"));
import Navbar from "./components/Navbar/Navbar";
const SignOut = React.lazy(() => import("./components/Credentials/SignOut"));
const CredentialSelection = React.lazy(() =>
  import("./components/Credentials/CredentialSelection")
);

import NoMatch from "./components/NoMatch/NoMatch";
import Footer from "./components/Footer/Footer";

const Product = React.lazy(() => import("./components/Product/Product"));
const ProductView = React.lazy(() =>
  import("./components/Product/ProductView")
);
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const ProfileGeneral = React.lazy(() =>
  import("./components/Profile/ProfileGeneral")
);
const RequestSignedIn = React.lazy(() =>
  import("./components/RequestSignedIn/RequestSignedIn")
);

import { AiFillHome, AiOutlineUser } from "react-icons/ai";
const Checkout = React.lazy(() => import("./components/Checkout/Checkout"));
import { useSelector } from "react-redux";
import useUnload from "./hooks/useUnload";
const Sell = React.lazy(() => import("./components/Sell/Sell"));
const BrowseProducts = React.lazy(() =>
  import("./components/BrowseProducts/BrowseProducts")
);
const AdminProduct = React.lazy(() =>
  import("./components/Admin/AdminProduct")
);
const AdminCategory = React.lazy(() =>
  import("./components/Admin/AdminCategory")
);
const AdminLayout = React.lazy(() => import("./components/Admin/AdminLayout"));
/**
 *
 * @returns a routes components
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        {/* Home */}
        <Route
          index
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        {/* Browse products */}
        <Route
          path="/browse-products"
          element={
            <Suspense>
              <BrowseProducts />
            </Suspense>
          }
        ></Route>

        {/* Sell */}
        <Route
          path="/sell"
          element={
            <Suspense>
              <Sell />
            </Suspense>
          }
        ></Route>

        {/* Users for register / sign in  */}
        <Route
          path="/users"
          element={
            <Suspense>
              <Credentials />
            </Suspense>
          }
        >
          {/* TODO: check whether user is logged in or not, to put current */}
          <Route
            index
            element={
              <Suspense>
                <CredentialSelection />
              </Suspense>
            }
          />
          <Route
            path="/users/sign-up"
            element={
              <Suspense>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/users/sign-in"
            element={
              <Suspense>
                <SignIn />
              </Suspense>
            }
          />
          <Route path="/users/sign-out" element={<SignOut />} />
        </Route>
        <Route
          path="/products"
          element={
            <Suspense>
              <Product />
            </Suspense>
          }
        >
          <Route
            path=":productId"
            element={
              <Suspense>
                <ProductView />
              </Suspense>
            }
          />
        </Route>

        {/* Require signed in */}
        <Route
          element={
            <Suspense>
              <RequestSignedIn />
            </Suspense>
          }
        >
          {/* Profile overview */}
          <Route
            path="/profile"
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          >
            {/* General information of profile */}
            <Route
              path="/profile/general"
              element={
                <Suspense>
                  <ProfileGeneral />
                </Suspense>
              }
            />
          </Route>
        </Route>

        {/* Check out system */}
        <Route
          path="/checkout"
          element={
            <Suspense>
              <Checkout />
            </Suspense>
          }
        ></Route>

        <Route
          path="/admin"
          element={
            <Suspense>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route
            path="/admin/products"
            element={
              <Suspense>
                <AdminProduct />
              </Suspense>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <Suspense>
                <AdminCategory />
              </Suspense>
            }
          />
        </Route>

        {/* 404 not found */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  const items = useSelector((state) => state.cart.items);

  useUnload((event) => {
    event.preventDefault();
    // event.returnValue = "";
    // console.log(items);
    localStorage.setItem(
      process.env.CART_ITEM_KEY_NAME
        ? process.env.CART_ITEM_KEY_NAME
        : "cartItems",
      JSON.stringify(items)
    );
  });

  return (
    <div className="drawer bg-base-200">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Suspense>
          <Navbar />
        </Suspense>

        {/* Render home */}
        <AppRoutes />

        {/* Footer */}
        <Footer />
      </div>
      {/* Drawer side */}
      <div className="drawer-side">
        <label htmlFor="app-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          <li>
            <Link to="/" className="">
              <i>
                <AiFillHome />
              </i>
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link to="/profile">
              <i>
                <AiOutlineUser />
              </i>
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
}
