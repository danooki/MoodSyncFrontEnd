import React from "react";
import GenericCard from "../UI/GenericCard";
import { CircleIcon } from "../UI";
import Button from "../UI/Button";

const CircleChoiceCard = ({ onWaitingForInvite, onCreateCircle }) => {
  return (
    <GenericCard
      icon={<CircleIcon />}
      title="Join or Create a Circle"
      description="Choose how you'd like to start your mood-syncing journey"
      variant="info"
    >
      <div className="space-y-4">
        <div className="text-center text-gray-600 text-sm mb-6">
          A circle is a group of friends who sync their moods together. You can
          either wait for a friend to invite you, or create your own circle and
          invite others.
        </div>

        <div className="space-y-3">
          <Button onClick={onWaitingForInvite} variant="info" fullWidth icon="">
            I'm waiting for an invitation to join a Circle
          </Button>

          <Button onClick={onCreateCircle} variant="primary" fullWidth icon="">
            I'm not waiting, I want to create my own Circle
          </Button>
        </div>
      </div>
    </GenericCard>
  );
};

export default CircleChoiceCard;
