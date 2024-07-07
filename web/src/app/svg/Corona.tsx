import { FC } from "react";

interface Props {
  color: string;
  size: string;
}

const CoronaIcon: FC<Props> = ({ color, size }) => {
  return (
    <svg
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6V3M11 3H13"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 18L12 21M13 21L11 21"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.2425 7.75738L18.3638 5.63606M17.6567 4.92896L19.071 6.34317"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.75748 16.2426L5.63616 18.3639M6.34326 19.071L4.92905 17.6568"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 12L21 12M21 11L21 13"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 12L3 12M3 13L3 11"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.2429 16.2426L18.3642 18.364M19.0713 17.6569L17.6571 19.0711"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.75763 7.75735L5.63631 5.63603M4.9292 6.34314L6.34341 4.92893"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="6"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="11" cy="11" r="2" fill="#000000" />
      <circle cx="14" cy="14" r="1" fill="#000000" />
    </svg>
  );
};

export default CoronaIcon;
