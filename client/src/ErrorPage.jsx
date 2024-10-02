import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-full h-screen flex flex-wrap gap-5 content-center">
      <h1 className="w-full text-center text-6xl h-fit">Oops!</h1>
      <p className="w-full text-center text-3xl h-fit">Sorry, an unexpected error has occurred.</p>
      <p className="w-full text-center text-3xl h-fit">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}