import { Link, useNavigate } from "react-router";
import { useRegister } from '../../api/authApi';
import { useUserContext } from '../../context/UserContext';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const schema = yup.object({
  firstName: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password field is required')
})

export default function Register() {
  const navigate = useNavigate()
  const { register: registerUser } = useRegister()
  const { userLoginHandler } = useUserContext()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const formAction = async (data) => {
    try {
      const authData = await registerUser(data.firstName, data.lastName, data.email, data.password)

      userLoginHandler(authData)

      toast.success('Registrated successfully!')

      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Registration failed! Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h2 className="mt-2 sm:mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Euro Adoption Tracker
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Create an admin account
          </p>
        </div>
        
        <form className="mt-6 sm:mt-8 space-y-6" onSubmit={handleSubmit(formAction)} noValidate>
          <div className="space-y-4 sm:space-y-5">
            {/* First Name Input */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition duration-150 ease-in-out"
                {...register('firstName')}
                aria-invalid={!!errors.firstName}
                placeholder="Jane"
              />
              {errors.firstName && <p className='mt-1.5 text-sm text-red-600 font-medium'>{errors.firstName.message}</p>}
            </div>

            {/* Last Name Input */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition duration-150 ease-in-out"
                {...register('lastName')}
                aria-invalid={!!errors.lastName}
                placeholder="Doe"
              />
              {errors.lastName && <p className='mt-1.5 text-sm text-red-600 font-medium'>{errors.lastName.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition duration-150 ease-in-out"
                {...register('email')}
                aria-invalid={!!errors.email}
                placeholder="admin@eurotracker.eu"
              />
              {errors.email && <p className='mt-1.5 text-sm text-red-600 font-medium'>{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition duration-150 ease-in-out"
                {...register('password')}
                aria-invalid={!!errors.password}
                placeholder="••••••••"
              />
              {errors.password && <p className='mt-1.5 text-sm text-red-600 font-medium'>{errors.password.message}</p>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition duration-150 ease-in-out"
                {...register('confirmPassword')}
                aria-invalid={!!errors.confirmPassword}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className='mt-1.5 text-sm text-red-600 font-medium'>{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </div>

          {/* Navigation Link */}
          <div className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Sign in
            </Link>
          </div>

          {/* Helper Text */}
          <div className="flex justify-center">
            <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-50 rounded-full border border-slate-100">
              <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400"></span>
                Administrator Request
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};