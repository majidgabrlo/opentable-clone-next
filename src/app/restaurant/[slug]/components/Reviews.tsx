"use client"
import { useUser } from "@/app/context/AuthContext";
import { Review } from "@prisma/client"
import axios from "axios";
import { useFormik } from "formik";
import validator from 'validator'
import ReviewCard from "./ReviewCard"


export type FormValuesTypes = {
    firstName: string;
    lastName: string;
    rating: string;
    comment: string;
}

const validate = (values: FormValuesTypes) => {
    const errors = {} as FormValuesTypes;
    if (!validator.isLength(values.firstName, { min: 1 })) {
        errors.firstName = 'First Name is invalid';
    }
    if (!validator.isLength(values.lastName, { min: 1 })) {
        errors.lastName = 'Last Name is invalid';
    }
    if (+values.rating > 5 || +values.rating < 0) {
        errors.rating = 'Rating is invalid';
    }
    if (!validator.isLength(values.comment, { min: 1 })) {
        errors.comment = 'Comment is invalid';
    }
    return errors;
};


function Reviews({ reviews, slug }: { reviews: Review[], slug: string }) {
    const { data } = useUser()

    const { handleBlur, handleChange, errors, touched, values, resetForm, handleSubmit } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            rating: "0",
            comment: ""
        },
        validate,
        onSubmit: async ({ comment, firstName, lastName, rating }) => {
            if (!data?.email) return
            const reviewResponse = await axios.post(`/api/restaurant/${slug}/add-comment`, { text:comment, firstName, lastName, rating, email: data.email })
            console.log(reviewResponse);

            resetForm()
        },
    });

    
    return (
        <div>
            {data && <div className="mt-8">
                <div className="text-2xl font-bold">Add Your Comment</div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-5 text-sm mt-4">
                        <div>
                            <div>Your Name</div>
                            <input name="firstName" onBlur={handleBlur} value={values.firstName} onChange={handleChange} className="w-full border rounded p-2 py-3" />
                            {touched.firstName && <div className="text-red-400">{errors.firstName}</div>}
                        </div>
                        <div>
                            <div>Your Name</div>
                            <input name="lastName" onBlur={handleBlur} value={values.lastName} onChange={handleChange} className="w-full border rounded p-2 py-3" />
                            {touched.lastName && <div className="text-red-400">{errors.lastName}</div>}
                        </div>
                        <div>
                            <div>Your Comment</div>
                            <textarea name="comment" onBlur={handleBlur} value={values.comment} onChange={handleChange} className="w-full border rounded p-2 py-3" />
                            {touched.comment && <div className="text-red-400">{errors.comment}</div>}
                        </div>
                        <div>
                            <div>Rate</div>
                            <input type="number" max={5} min={0} name="rating" onBlur={handleBlur} value={values.rating} onChange={handleChange} className="border rounded p-2 py-3" />
                            {touched.rating && <div className="text-red-400">{errors.rating}</div>}
                        </div>
                        <button type="submit" className='uppercase bg-blue-600 px-6 text-white p-2 rounded text-lg mb-5 disabled:bg-gray-400'>Post</button>
                    </div>
                </form>
            </div>}
            {reviews.length ?
                <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                    What {reviews.length} {reviews.length > 1 ? 'people are' : "person is"} saying
                </h1> :
                <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                    Be the first person that comments about this restaurant
                </h1>}
            <div>
                {reviews.map(review =>
                    <ReviewCard key={review.id} review={review} />
                )}
            </div>
        </div>
    )
}

export default Reviews