import React from "react";
import { dateFormater } from "../../util/DateFormater";

function AnnouncementList({
  description,
  title,
  time,
  venue,
  photoImage,
  createdBy,
}: {
  description?: string;
  title: string;
  photoImage?: string;
  venue?: string;
  time?: string;
  createdBy?: {
    firstname: string;
    lastname: string;
  };
}) {
  console.log(createdBy, title);
  const textToShow = 172;
  return (
    <div className="w-full py-3 px-3 bg-white rounded-lg">
      {photoImage && (
        <img
          src={`../../../uploads/${photoImage}`}
          alt={title}
          className="rounded-lg"
        />
      )}
      <h3 className="font-semibold text-base w-full capitalize">{title}</h3>
      <small>{dateFormater(time)}</small>
      <p>{venue}</p>
      {description && (
        <p className="text-sm mt-2 w-full">
          {description.length > textToShow
            ? `${description.slice(0, textToShow)} ...`
            : description}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-3 capitalize">
        Created By: {createdBy?.firstname + " " + createdBy?.lastname}
      </p>
    </div>
  );
}

export default AnnouncementList;
