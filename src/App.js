import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { toggleCartActions } from "./store";  "It is needed for USEEFFECT() COMPONENT METHOD"
import { sendCartData, fetchCartData } from "./store/cart-actions"; // Needed for ACTION CREATOR THUNK
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const toggleCartState = useSelector((state) => state.toggleCart.visibleCart);
  const cart = useSelector((state) => state.addToCart);
  const notification = useSelector((state) => state.toggleCart.notification);

  //  USE EFFECT COMPONENET METHOD *************************************************************************************************************************

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch(
  //       toggleCartActions.showNotification({
  //         status: "Pending",
  //         title: "Sending...",
  //         message: "Sending your products",
  //       }),
  //     );
  //     const response = await fetch(
  //       "https://myproject-a19c1-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error("Sending product to cart have been failed");
  //     }

  //     dispatch(
  //       toggleCartActions.showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "Sent products to cart successfully",
  //       }),
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   fetchData().catch((error) => {
  //     dispatch(
  //       toggleCartActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: "Ops! Something went wrong Can't sent your products",
  //       }),
  //     );
  //   });
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleCartState && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
