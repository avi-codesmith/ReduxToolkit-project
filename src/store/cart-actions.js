import { toggleCartActions } from "./index";
import { addToCartActions } from "./index";

// ACTION CREATOR METHOD *****************************************************************************************************************************

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://myproject-a19c1-default-rtdb.firebaseio.com/cart.json",
      );

      if (!response.ok) {
        throw new Error("Ops! something went wrong pls try again!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        addToCartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        }),
      );
    } catch (error) {
      dispatch(
        toggleCartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Ops! Something went wrong Can't load products",
        }),
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      toggleCartActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending your products",
      }),
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://myproject-a19c1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Sending product to cart have been failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        toggleCartActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent products to cart successfully",
        }),
      );
    } catch (error) {
      dispatch(
        toggleCartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Ops! Something went wrong Can't sent your products",
        }),
      );
    }
  };
};
