import React from "react";
import Image from "next/image";
import Currency from "react-currency-formatter";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectItems, selectTotal } from "../slices/basketSlice";

//* DECLARE CONST
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    // todo: goi backend de tao. 1 checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });
    // todo: chuyen nguoi dung toi trang checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    console.log(checkoutSession );
    if (result.error) {
      alert(result.error.message);
    }
  };
  //* DECLARE CONST
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Shopping Basket."}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* Left */}

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={` button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
        {/* Right */}
      </main>
    </div>
  );
};

export default Checkout;
