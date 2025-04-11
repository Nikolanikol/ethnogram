import { FC } from "react";
interface UserLinkPhoneProps {
  data: string;
}
const UserLinkPhone: FC<UserLinkPhoneProps> = ({ data }) => {
  return (
    <>
      <a
        href={`tel:${data}`}
        className="text-gray-600 block text-xs md:text-2xl text-left mb-3 cursor-pointer px-4 py-3 relative top-0 hover:-top-1.5 transition-all rounded-3xl duration-500 ease-in-out hover:shadow-2xs  hover:shadow-gray-600 flex"
      >
        <span className="inline-block mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </span>
        {data}
      </a>
    </>
  );
};

export default UserLinkPhone;
