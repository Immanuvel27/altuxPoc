import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Validation Schema
const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phonenumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
})

export default function Register() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phonenumber: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form values:', values)
            // Handle signup here
        }
    })

    
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Side - Image Background */}
            <div className="w-full lg:w-1/2 bg-cover bg-center relative hidden lg:block" style={{
                backgroundImage: 'url(https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg)',
                backgroundPosition: 'center'
            }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40">
                    <h1 className="text-4xl lg:text-5xl font-bold absolute top-10 lg:top-20 text-white left-1/2 -translate-x-1/2 animate-fade-in">ALtux</h1>
                    <h2 className="text-lg lg:text-2xl text-white font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in px-4 text-center">
                        Join Our Community
                    </h2>
                    <h5 className="text-xs lg:text-sm text-white absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-fade-in px-4 text-center">
                        Create your account to get started
                    </h5>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-8 lg:py-0 overflow-auto">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
                        Sign Up
                    </h1>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                {...formik.getFieldProps('name')}
                                className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                    formik.touched.name && formik.errors.name
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>

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
                                className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                    formik.touched.email && formik.errors.email
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phonenumber"
                                placeholder="Enter 10 digit phone number"
                                {...formik.getFieldProps('phonenumber')}
                                className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                    formik.touched.phonenumber && formik.errors.phonenumber
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            />
                            {formik.touched.phonenumber && formik.errors.phonenumber && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.phonenumber}</p>
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
                                className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                    formik.touched.password && formik.errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                {...formik.getFieldProps('confirmPassword')}
                                className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="text-center mt-6 text-xs sm:text-sm text-gray-600">
                        <p>Already have an account? <a href="/login" className="text-blue-600 hover:underline font-semibold">Sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
