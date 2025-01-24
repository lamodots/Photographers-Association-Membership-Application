// import React from "react";
// import { dateFormater } from "../../util/DateFormater";

// function AnnouncementList({
//   description,
//   title,
//   time,
//   venue,
//   photoImage,
//   createdBy,
// }: {
//   description?: string;
//   title: string;
//   photoImage?: string;
//   venue?: string;
//   time?: string;
//   createdBy?: {
//     firstname: string;
//     lastname: string;
//   };
// }) {
//   console.log(createdBy, title);
//   const textToShow = 172;
//   return (
//     <div className="w-full py-3 px-3 bg-white rounded-lg">
//       {photoImage && (
//         <img
//           src={`../../../uploads/${photoImage}`}
//           alt={title}
//           className="rounded-lg"
//         />
//       )}
//       <h3 className="font-semibold text-base w-full capitalize">{title}</h3>
//       <small>{dateFormater(time)}</small>
//       <p>{venue}</p>
//       {description && (
//         <p className="text-sm mt-2 w-full">
//           {description.length > textToShow
//             ? `${description.slice(0, textToShow)} ...`
//             : description}
//         </p>
//       )}
//       <p className="text-xs text-gray-400 mt-3 capitalize">
//         Created By: {createdBy?.firstname + " " + createdBy?.lastname}
//       </p>
//     </div>
//   );
// }

// export default AnnouncementList;

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
  const textToShow = 172;

  return (
    <div className="w-full h-[350px] bg-white rounded-lg flex flex-col p-3">
      {photoImage && (
        <img
          src={`../../../uploads/${photoImage}`}
          alt={title}
          className="h-48 w-full object-cover rounded-lg mb-2"
        />
      )}
      <h3 className="font-semibold text-base w-full capitalize mb-1">
        {title}
      </h3>
      <small className="text-gray-500">{dateFormater(time)}</small>
      <p className="text-gray-600 text-sm mb-2">{venue}</p>
      {description && (
        <p className="text-sm text-gray-700 flex-grow overflow-hidden">
          {description.length > textToShow
            ? `${description.slice(0, textToShow)} ...`
            : description}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-auto capitalize">
        Created By: {createdBy?.firstname + " " + createdBy?.lastname}
      </p>
    </div>
  );
}

export default AnnouncementList;
