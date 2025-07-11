export default function Loader({ text }) {
  return (
    <div className="z-10 flex w-full max-w-md flex-col items-center justify-center p-4 text-center">
      <div
        className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-primary border-t-transparent"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        {text}
      </h1>
      <p className="mb-8 text-lg text-gray-300">Please wait a moment.</p>
    </div>
  );
}
