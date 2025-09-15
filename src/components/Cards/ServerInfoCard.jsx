import React from "react";
import GenericCard from "./GenericCard";
import { InfoIcon } from "../UI/Icons";

// Small informational card about server performance for free hosting
const ServerInfoCard = () => {
  const infoIcon = (
    <InfoIcon className="w-6 h-6" color="text-blue-600" bgColor="bg-blue-100" />
  );

  return (
    <GenericCard
      icon={infoIcon}
      title="Free Server Notice"
      description="This is a small project running on free servers.
      
       Sometimes login and registration might take a moment longer than usual.
       
       But once you're in, the servers are warmed up and running smoothly!"
      className="bg-blue-50 border-blue-200 p-4"
      titleClassName="text-blue-300"
      descriptionClassName="text-blue-400 text-justify whitespace-pre-line"
    />
  );
};

export default ServerInfoCard;
