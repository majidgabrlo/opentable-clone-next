import { useFormik } from "formik"
import AuthFieldContainer from "./AuthFieldContainer"
import validator from 'validator';
import ReactLoading from 'react-loading'
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../context/AuthContext";

export type FormValuesTypes = {
    email: string;
    password: string;
}

const validate = (values: FormValuesTypes) => {
    const errors = {} as FormValuesTypes;
    if (!validator.isEmail(values.email)) {
        errors.email = 'Email is invalid';
    }
    if (!validator.isLength(values.password, { min: 1 })) {
        errors.password = 'Password is invalid';
    }
    return errors;
};

function AuthSignIn({ handleClose }: { handleClose: () => void }) {
    const { signIn } = useAuth()
    const { error, loading } = useUser()

    const formData = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate,
        onSubmit: async ({ email, password }) => {
            await signIn(email, password,handleClose)
        },
    });

    return (
        <AuthFieldContainer headerTitle="Create an account" headerDescription="Create your OpenTable account">
            <div className="my-2 mt-4">
                {error && <div className="text-red-600 font-bold">{error}</div>}
                {loading ?
                    <ReactLoading className='mx-auto' type="spinningBubbles" color='navy' height={30} width={40} />
                    :
                    <form onSubmit={formData.handleSubmit}>
                        <div className="my-2 space-y-1 text-sm">
                            <div>
                                <div>Email</div>
                                <input type="text" name="email" onBlur={formData.handleBlur} onChange={formData.handleChange} className="w-full border rounded p-2 py-3" value={formData.values.email} />
                                {formData.touched.email && <div className="text-red-400">{formData.errors.email}</div>}
                            </div>
                            <div>
                                <div>Password</div>
                                <input type="password" name="password" onBlur={formData.handleBlur} onChange={formData.handleChange} className="w-full border rounded p-2 py-3" value={formData.values.password} />
                                {formData.touched.password && <div className="text-red-400">{formData.errors.password}</div>}
                            </div>
                        </div>
                        <button type="submit" className='uppercase bg-blue-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'>Sign Up</button>
                    </form>
                }
            </div>
        </AuthFieldContainer >

    )
}

export default AuthSignIn