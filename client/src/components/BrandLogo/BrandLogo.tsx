import React from "react";
import useFetchAppData from "../../hooks/useFetchAppData";
function BrandLogo({ color }: { color?: string }) {
  const { appData } = useFetchAppData();
  return (
    <>
      {appData ? (
        <img
          src={`../../../uploads/${appData.applogo}`}
          alt={`${appData.appname}`}
          width={48}
          height={48}
        />
      ) : (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 8.42005L24 13.62L33 8.42005M15 39.5801V29.2001L6 24M42 24L33 29.2001V39.5801M6.54 13.92L24 24.0201L41.46 13.92M24 44.16V24M42 32V16C41.9993 15.2986 41.8141 14.6097 41.4631 14.0024C41.112 13.3951 40.6075 12.8908 40 12.54L26 4.54005C25.3919 4.18898 24.7021 4.00415 24 4.00415C23.2979 4.00415 22.6081 4.18898 22 4.54005L8 12.54C7.39253 12.8908 6.88796 13.3951 6.53692 14.0024C6.18589 14.6097 6.00072 15.2986 6 16V32C6.00072 32.7015 6.18589 33.3904 6.53692 33.9977C6.88796 34.605 7.39253 35.1093 8 35.46L22 43.46C22.6081 43.8111 23.2979 43.9959 24 43.9959C24.7021 43.9959 25.3919 43.8111 26 43.46L40 35.46C40.6075 35.1093 41.112 34.605 41.4631 33.9977C41.8141 33.3904 41.9993 32.7015 42 32Z"
            stroke={!color ? "#1A4F83" : color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
}

export default BrandLogo;
