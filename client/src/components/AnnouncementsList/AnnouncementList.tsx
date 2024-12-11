import React from "react";

function AnnouncementList({
  description,
  title,
  createdBy,
}: {
  description: string;
  title: string;
  createdBy?: {
    firstname: string;
    lastname: string;
  };
}) {
  console.log(createdBy, title);
  const textToShow = 172;
  return (
    <div className="w-full py-3 px-3 bg-white rounded-lg">
      <h3 className="font-semibold text-base w-full">{title}</h3>
      <p className="text-sm mt-2 w-full">
        {description.length > textToShow
          ? `${description.slice(0, textToShow)} ...`
          : description}
      </p>
      <p className="text-xs text-gray-400 mt-3 capitalize">
        Created By: {createdBy?.firstname + " " + createdBy?.lastname}
      </p>
    </div>
  );
}

export default AnnouncementList;
