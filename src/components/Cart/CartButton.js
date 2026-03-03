import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { toggleCartActions } from "../../store";

import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const totalQuantity = useSelector((state) => state.addToCart.totalQuantity);

  const toggleCartState = useSelector((state) => state.toggleCart.visibleCart);

  const handleToggleCart = () => {
    dispatch(toggleCartActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>{!toggleCartState ? "My" : "Close"} Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
