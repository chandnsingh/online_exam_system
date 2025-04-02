import SignupForm from '../components/auth/SignupForm'

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <SignupForm />
      </div>
    </div>
  )
}

export default SignupPage