import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCTS = [
  {
    id: "p1",
    price: 5,
    title: "book1",
    description: "this is best the book",
  },

  {
    id: "p2",
    price: 10,
    title: "book2",
    description: "this is a good book",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
