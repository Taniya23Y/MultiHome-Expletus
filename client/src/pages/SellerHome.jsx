import React from "react";
import SellerHero from "../components/Screens/SellerPage/SellerHero";
import CategoryUI from "../components/Screens/SellerPage/CategoryUI";
import HowItWorks from "../components/Screens/SellerPage/HowItWorks";

const SellerHome = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="pt-[4.3rem] w-[100%] px-2">
        <SellerHero />
      </div>
      <CategoryUI />
      <HowItWorks />

      {/* FAQ Section */}
      <section className="container mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {/* FAQ Item */}
          <details className="bg-white p-5 rounded-lg shadow">
            <summary className="font-semibold cursor-pointer text-lg">
              How do I create a seller account on MultiHome?
            </summary>
            <p className="mt-3 text-gray-600">
              Simply click the “Create Seller Account” button and fill out your
              basic business information, property details, and verification
              documents. Your account will be activated once verified.
            </p>
          </details>

          {/* FAQ Item */}
          <details className="bg-white p-5 rounded-lg shadow">
            <summary className="font-semibold cursor-pointer text-lg">
              What documents are required for verification?
            </summary>
            <p className="mt-3 text-gray-600">
              You will need identity proof, property ownership documents, and
              optionally tax or business registration documents if you are
              registering as a real estate business.
            </p>
          </details>

          {/* FAQ Item */}
          <details className="bg-white p-5 rounded-lg shadow">
            <summary className="font-semibold cursor-pointer text-lg">
              Can I connect my bank account for receiving payments?
            </summary>
            <p className="mt-3 text-gray-600">
              Yes! MultiHome allows secure bank account linking so that you
              receive payments directly after closing a deal. All transfers are
              encrypted and processed through trusted payment partners.
            </p>
          </details>

          {/* FAQ Item */}
          <details className="bg-white p-5 rounded-lg shadow">
            <summary className="font-semibold cursor-pointer text-lg">
              How many properties can I list?
            </summary>
            <p className="mt-3 text-gray-600">
              You can list unlimited properties—residential, commercial, plots,
              rentals, and more. Each listing must pass our verification team
              before going live.
            </p>
          </details>

          {/* FAQ Item */}
          <details className="bg-white p-5 rounded-lg shadow">
            <summary className="font-semibold cursor-pointer text-lg">
              Is there any fee to become a seller?
            </summary>
            <p className="mt-3 text-gray-600">
              Creating a seller account is free! MultiHome may charge service
              commissions on successful sales or premium upgrades for advanced
              tools, but basic listing remains free.
            </p>
          </details>

          {/* FAQ Item */}
          <details className="bg-white p-5 rounded-lg shadow">
            <summary className="font-semibold cursor-pointer text-lg">
              How do I communicate with buyers?
            </summary>
            <p className="mt-3 text-gray-600">
              MultiHome provides an integrated chat system that allows real-time
              communication with buyers. You can also schedule visits, respond
              to questions, and manage offers.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
};

export default SellerHome;
