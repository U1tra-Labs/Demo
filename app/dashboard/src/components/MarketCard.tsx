import React from "react";

type Prop = {
  title: string;
  heading1: string;
  price1: string;
  heading2: string;
  price2: string;
  heading3: string;
  price3: string;
  heading4: string;
  price4: string;
};

const MarketCard = ({
  title,
  heading1,
  price1,
  heading2,
  price2,
  heading3,
  price3,
  heading4,
  price4,
}: Prop) => {
  return (
    <div className="borders w-[349px] min-h-[235px] bg-transparent py-[16px] px-[22px] rounded-[10px]">
      <h1 className="text-[24px] font-bold">{title}</h1>
      <div className="flex pt-[20px] space-x-[16px] items-start justify-between">
        <div className="flex  flex-col items-start space-y-12">
          <div>
            <h1 className="text-[15px] text-slate-400 font-medium">{heading1}</h1>
            <p>${price1}</p>
          </div>
          <div>
            <h1 className="text-[15px] text-slate-400 font-medium">{heading2}</h1>
            <p>${price2}</p>
          </div>
        </div>
        <div className="cardborder-content2" />
        <div className="flex  flex-col items-start space-y-12">
          <div>
            <h1 className="text-[15px] text-slate-400 font-medium">{heading3}</h1>
            <p>${price3}</p>
          </div>
          <div>
            <h1 className="text-[15px] text-slate-400 font-medium">{heading4}</h1>
            <p>${price4}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
