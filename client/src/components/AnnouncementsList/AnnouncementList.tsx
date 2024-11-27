import React from "react";

function AnnouncementList({
  announcement,
  title,
}: {
  announcement: string;
  title: string;
}) {
  const textToShow = 172;
  return (
    <div className="w-full py-3 px-3 bg-white rounded-lg">
      <h3 className="font-semibold text-base">{title}</h3>
      <p className="text-sm mt-2">
        {announcement.length > textToShow
          ? `${announcement.slice(0, textToShow)} ...`
          : announcement}
      </p>
    </div>
  );
}

export default AnnouncementList;
