import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      const { data } = await api.post("/auth/register", values);
      login(data.token, data.user);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 border rounded-lg text-black bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      >
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <input
          placeholder="Name"
          {...register("name")}
          className="border p-2 w-full mb-2"
        />
        <p className="text-red-500 mb-4">{errors.name?.message}</p>
        <input
          placeholder="Email"
          {...register("email")}
          className="border p-2 w-full mb-2"
        />
        <p className="text-red-500 mb-4">{errors.email?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 w-full mb-2"
        />
        <p className="text-red-500 mb-4">{errors.password?.message}</p>
        <button className="w-full border p-2">Register</button>
        <Link
          to="/login"
          className="text-blue-500 hover:underline mt-4 block text-center"
        >
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
