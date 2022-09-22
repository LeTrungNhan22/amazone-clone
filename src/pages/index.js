import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";

export default function Home({ products, session }) {
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
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session,
    },
  };
}
// GET >>>> https://fakestoreapi.com/products
