export default function ErrorMessage({ title, message }) {
  return (
    <div className="z-10 flex w-full max-w-md flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-red-500 md:text-4xl">
        {title}
      </h1>
      <p className="mb-8 text-lg text-gray-300">{message}</p>
    </div>
  );
}
