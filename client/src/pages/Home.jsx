import React from "react";
import Hero from "../components/Screens/HomePage/Hero";
import HowItWork from "../components/Screens/HomePage/HowItWork";
import AvailableProperties from "../components/Screens/HomePage/AvailableProperties";
import CoreFeature from "../components/Screens/HomePage/CoreFeature";
import SubscribeNewsletter from "../components/Screens/common/SubscribeNewsletter.jsx";
import PopularAreas from "../components/Screens/HomePage/PopularAreas.jsx";
import FeaturedPropertyListing from "../components/Screens/HomePage/FeaturedPropertyListing";
import SuggestedProperties from "../components/Screens/HomePage/SuggestedProperties.jsx";
import PropertyList from "../components/Screens/HomePage/PropertyList.jsx";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="pt-[4.5rem] w-[98%]">
        <Hero />
      </div>
      <CoreFeature />
      <FeaturedPropertyListing />
      <PopularAreas />
      <SuggestedProperties />
      <AvailableProperties />
      {/* <PropertyList /> */}
      <HowItWork />
      <SubscribeNewsletter />
    </div>
  );
};

export default Home;
