import { useEffect } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const toggleCartState = useSelector((state) => state.toggleCart.visibleCart);
  const cart = useSelector((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://myproject-a19c1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        },
      );

      if (!response.ok) {
        throw new Error("Sending product to cart have been failed");
      }

      const resData = await response.json();

      // try {
      //   console.log(resData);
      // } catch (error) {
      //   console.log(error.message);
      // }
    };
    fetchData();
  }, [cart]);

  return (
    <Layout>
      {toggleCartState && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
