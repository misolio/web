import ProductCard from "./ProductCard";

export default function ProductsList({ products = [] }) {
  if (!products.length) {
    return <p>No suitable products found</p>;
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
