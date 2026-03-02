import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

export default function Login() {
      const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            if(values.email=="admin@altux.com" && values.password=="Test@123"){
                alert();
                navigate('/Home')
            }
        }
    })

    return (
        <div className="flex flex-col lg:flex-row min-h-screen lg:p-50 md:p-20 p-5">
            {/* Left Side - Image Background */}
            <div className="w-full lg:w-1/2 bg-cover bg-center relative hidden lg:block" style={{
                backgroundImage: 'url(https://images.pexels.com/photos/9574323/pexels-photo-9574323.jpeg)',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 bg-black/40">
                    <h1 className="text-4xl lg:text-5xl font-bold absolute top-10 lg:top-20 text-white left-1/2 -translate-x-1/2 animate-fade-in">ALtux</h1>
                    <h2 className="text-xl lg:text-2xl text-white font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in px-4 text-center">
                        Welcome to Our Platform
                    </h2>
                    <h5 className="text-xs lg:text-sm text-white absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-fade-in px-4 text-center">
                        Discover amazing features and seamless integration
                    </h5>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-8 lg:py-0">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
                        Login
                    </h1>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                {...formik.getFieldProps('email')}
                                className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${formik.touched.email && formik.errors.email
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    }`}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                {...formik.getFieldProps('password')}
                                className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${formik.touched.password && formik.errors.password
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    }`}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6 text-xs sm:text-sm text-gray-600">
                        <p>Don't have an account? <a href="/register" className="text-blue-600 hover:underline font-semibold">Sign up</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}