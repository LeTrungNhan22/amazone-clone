
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">

      {/* Header */}
      <Header />
      {/* Header */}

      {/* Body */}
      <main className="max-w-screen-xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Banner */}

        {/* ProductFeed */}
        <ProductFeed products={products} />

        {/* ProductFeed */}
      </main>
      {/* Body */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products: products,
    },
  };
}
// GET >>>> https://fakestoreapi.com/products
