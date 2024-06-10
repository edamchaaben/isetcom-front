import React from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'; 
import "./feature.css";

const FeaturedItem = ({ title, number, rate, isNegative }) => {
  return (
    <div className="featuredItem">
      <span className="featuredTitle">{title}</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">{number}</span>
        <span className="featuredMoneyRate">
          {rate} {isNegative ? <ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}
        </span>
      </div>
      <span className="featuredSub">test</span>
    </div>
  );
};

const Featured = () => {
  return (
    <div className="featured">
      <FeaturedItem title="Client" number="500+" rate="-11.4" isNegative={false} />
      <FeaturedItem title="Stans gérer Mensuellement" number="5000+" rate="-1.4" isNegative={false} />
      <FeaturedItem title="utilisateur actifs" number="98%" rate="+2.4" isNegative={false} />
    </div>
  );
};

export default Featured;
