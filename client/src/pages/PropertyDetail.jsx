import React from "react";
import PropertyImages from "../components/Screens/PropertyPage/PropertyImages";
import sampleProperties from "../utils/dummyData/sampleProperties";

const PropertyDetail = () => {
  return (
    <div>
      <div className="bg-white flex flex-col items-center justify-center">
        <div className="pt-[4.5rem] w-[100%]">
          <PropertyImages properties={sampleProperties} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
