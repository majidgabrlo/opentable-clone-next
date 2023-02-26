import { useFormik } from "formik"
import AuthFieldContainer from "./AuthFieldContainer"
import validator from 'validator';
import ReactLoading from 'react-loading'
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../context/AuthContext";

export type FormValuesTypes = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    city: string;
    password: string;
}

const validate = (values: FormValuesTypes) => {
    const errors = {} as FormValuesTypes;
    if (!validator.isLength(values.first_name, { min: 1, max: 20 })) {
        errors.first_name = 'First Name is invalid';
    }
    if (!validator.isLength(values.last_name, { min: 1, max: 20 })) {
        errors.last_name = 'Last Name is invalid';
    }
    if (!validator.isEmail(values.email)) {
        errors.email = 'Email is invalid';
    }
    if (!validator.isMobilePhone(values.phone)) {
        errors.phone = 'Phone is invalid';
    }
    if (!validator.isLength(values.city, { min: 1 })) {
        errors.city = 'City is invalid';
    }
    if (!validator.isLength(values.password, { min: 1 })) {
        errors.password = 'Password is invalid';
    }

    return errors;
};

function AuthSignUp({ handleClose }: { handleClose: () => void }) {
    const { signUp } = useAuth()
    const { error, loading,data } = useUser()

    const formData = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            city: "",
            password: ""
        },
        validate,
        onSubmit: async (values) => {
            await signUp({ ...values },handleClose)
        },
    });    

    console.log(data);
    

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
                                <div>First Name</div>
                                <input type="text" name="first_name" onBlur={formData.handleBlur} onChange={formData.handleChange} className="w-full border rounded p-2 py-3" value={formData.values.first_name} />
                                {formData.touched.first_name && <div className="text-red-400">{formData.errors.first_name}</div>}
                            </div>
                            <div>
                                <div>Last Name</div>
                                <input type="text" name="last_name" onBlur={formData.handleBlur} onChange={formData.handleChange} className="w-full border rounded p-2 py-3" value={formData.values.last_name} />
                                {formData.touched.last_name && <div className="text-red-400">{formData.errors.last_name}</div>}
                            </div>
                            <div>
                                <div>Email</div>
                                <input type="text" name="email" onBlur={formData.handleBlur} onChange={formData.handleChange} className="w-full border rounded p-2 py-3" value={formData.values.email} />
                                {formData.touched.email && <div className="text-red-400">{formData.errors.email}</div>}
                            </div>
                            <div>
                                <div>Phone</div>
                                <input type="text" name="phone" onBlur={formData.handleBlur} onChange={formData.handleChange} className="w-full border rounded p-2 py-3" value={formData.values.phone} />
                                {formData.touched.phone && <div className="text-red-400">{formData.errors.phone}</div>}
                            </div>
                            <div>
                                <div>City</div>
                                <input type="text" name="city" onBlur={formData.handleBlur} onChange={formData.handleChange} className="w-full border rounded p-2 py-3" value={formData.values.city} />
                                {formData.touched.city && <div className="text-red-400">{formData.errors.city}</div>}
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

export default AuthSignUp