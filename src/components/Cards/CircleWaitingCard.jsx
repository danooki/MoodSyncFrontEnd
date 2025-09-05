import React from "react";
import GenericCard from "../UI/GenericCard";
import { CircleIcon } from "../UI";
import Button from "../UI/Button";

const CircleWaitingCard = ({ onChangeMind, user }) => {
  return (
    <GenericCard
      icon={<CircleIcon />}
      title="Waiting for an Invitation"
      description="You'll see the invitation here."
      variant="info"
    >
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Your friend can invite you by entering your display name:{" "}
          </p>
          <h1>
            <strong>{user?.displayName}</strong>
          </h1>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How it works:</p>
            <ul className="space-y-1 text-blue-700">
              <li>Your friend creates a circle and invites you</li>
              <li>You'll receive a notification here</li>
              <li>Accept the invitation to join their circle</li>
            </ul>
          </div>
        </div>

        <Button onClick={onChangeMind} variant="info" fullWidth>
          Change my mind - I want to create a circle instead
        </Button>
      </div>
    </GenericCard>
  );
};

export default CircleWaitingCard;
