export default function ProductCard({ product }) {
  let highlights = [];
  try {
    highlights = Array.isArray(product.highlights)
      ? product.highlights
      : JSON.parse(product.highlights || "[]");
  } catch {
    highlights = [];
  }

  const shortDescription = product.description
    ? product.description.slice(0, 120) + "..."
    : "";

  return (
    <div className="product-card">
      <div className="product-top">
        <img
          src={product.primary_image_url}
          alt={product.product_name}
          className="product-image"
        />

        <div className="product-info">
          <h3 className="product-title">
            <a
              href={product.product_url}
              target="_blank"
              className="product-title"
            >
              {product.product_name}
            </a>
          </h3>

          <p>Brand: {product.brand_name}</p>
          <p>Category: {product.category_2}</p>
          <p>Price: {product.price} {product.currency}</p>

          {highlights.length > 0 && (
            <p>Highlights: {highlights.join(", ")}</p>
          )}
        </div>
      </div>

      <div className="product-description-wrapper">
        <p className="product-description-short">
          {shortDescription} <strong>Details</strong>
        </p>

        <div className="product-description-full">
          {product.description}
        </div>
      </div>
    </div>
  );
}
