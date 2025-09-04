import React from "react";

export const CircleIcon = ({
  className = "w-20 h-20",
  color = "text-green-600",
  bgColor = "bg-green-100",
}) => (
  <div
    className={`${className} ${bgColor} rounded-full flex items-center justify-center mx-auto`}
  >
    <svg
      className="w-10 h-10 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  </div>
);

export const PlusIcon = ({
  className = "w-20 h-20",
  color = "text-blue-600",
  bgColor = "bg-blue-100",
}) => (
  <div
    className={`${className} ${bgColor} rounded-full flex items-center justify-center mx-auto`}
  >
    <svg
      className="w-10 h-10 text-blue-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </div>
);

export const SuccessIcon = ({
  className = "w-20 h-20",
  color = "text-green-600",
  bgColor = "bg-green-100",
}) => (
  <div
    className={`${className} ${bgColor} rounded-full flex items-center justify-center mx-auto`}
  >
    <svg
      className="w-10 h-10 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);

export const InfoIcon = ({
  className = "w-20 h-20",
  color = "text-blue-600",
  bgColor = "bg-blue-100",
}) => (
  <div
    className={`${className} ${bgColor} rounded-full flex items-center justify-center mx-auto`}
  >
    <svg
      className="w-10 h-10 text-blue-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);

export const WarningIcon = ({
  className = "w-20 h-20",
  color = "text-yellow-600",
  bgColor = "bg-yellow-100",
}) => (
  <div
    className={`${className} ${bgColor} rounded-full flex items-center justify-center mx-auto`}
  >
    <svg
      className="w-10 h-10 text-yellow-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  </div>
);

export const ErrorIcon = ({
  className = "w-20 h-20",
  color = "text-red-600",
  bgColor = "bg-red-100",
}) => (
  <div
    className={`${className} ${bgColor} rounded-full flex items-center justify-center mx-auto`}
  >
    <svg
      className="w-10 h-10 text-red-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
);
