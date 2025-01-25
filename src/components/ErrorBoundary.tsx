import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-auroville-primary hover:bg-auroville-primary/90"
            >
              Go back home
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {error.status} Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {error.statusText || 'Something went wrong'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-auroville-primary hover:bg-auroville-primary/90"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Something went wrong. Please try again later.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-auroville-primary hover:bg-auroville-primary/90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
