import React from "react";
import Tabs from "../../components/Tabs";
import { UserTab } from "./User";
import { AddressTab } from "./Address";

export const UserDetails = () => {
  return (
    <div className="user-details">
      <Tabs>
        <div label="User Details">
          <UserTab />
        </div>
        <div label="Address Details">
          <AddressTab />
        </div>
      </Tabs>
    </div>
  );
};
