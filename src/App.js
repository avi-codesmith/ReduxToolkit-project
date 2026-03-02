import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const toggleCartState = useSelector((state) => state.toggleCart);
  return (
    <Layout>
      {toggleCartState && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
