import Register from "@/components/specific/Register/Register";


const RegisterView = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 py-4 px-6 border-b text-center">
            <h1 className="text-title">Sign up</h1>
          </div>
          <Register />
        </div>
      </div>
    );
  };
  
  export default RegisterView;