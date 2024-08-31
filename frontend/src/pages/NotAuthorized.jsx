import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate("/");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to view this page.
        </p>
        <p className="text-sm text-gray-500">
          If you believe this is an error, please contact support.
        </p>
        <a
          onClick={() => navigate("/login")}
          className="mt-4 inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotAuthorized;
