import React from "react";
import SubscriptionCard from "../../../components/Admin-Components/SubScriptionCard/SubscriptionCard";
import { Link } from "react-router-dom";

function Subscription() {
  return (
    <main>
      <h1 className="text-2xl text-[#212529] font-bold">Active Subscription</h1>
      <div className="active grid gap-6 grid-cols-2 md:grid-cols-4 mt-8">
        <Link to="/secure/subscription/details/1">
          <SubscriptionCard
            subType="Normal Membership"
            amount={5000}
            numUsers={200}
          />
        </Link>
        <Link to="/secure/subscription/details/2">
          <SubscriptionCard
            subType="Normal Membership"
            amount={5000}
            numUsers={200}
          />
        </Link>
        <Link to="/secure/subscription/details/3">
          <SubscriptionCard
            subType="Normal Membership"
            amount={5000}
            numUsers={200}
          />
        </Link>
        <Link to="/secure/subscription/details/4">
          <SubscriptionCard
            subType="Normal Membership"
            amount={5000}
            numUsers={200}
          />
        </Link>
        <Link to="/secure/subscription/details/5">
          <SubscriptionCard
            subType="Normal Membership"
            amount={5000}
            numUsers={200}
          />
        </Link>
      </div>
    </main>
  );
}

export default Subscription;
