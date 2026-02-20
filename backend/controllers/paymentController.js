import Stripe from 'stripe';
import { Payment } from "../models/paymentModel.js";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import sendEmail from "../utils/sendEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId);

        if (!course) return res.status(404).json({ message: "Course not found" });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: course.name,
                        images: [course.image],
                    },
                    unit_amount: Math.round((course.price?.sale || course.price?.original || 0) * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/paymentsuccess?session_id={CHECKOUT_SESSION_ID}&course_id=${course._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/courses/${course.id || course._id}`,
            metadata: {
                userId: req.user._id.toString(),
                courseId: course._id.toString()
            }
        });

        res.status(200).json({
            success: true,
            url: session.url,
            id: session.id
        });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const paymentVerification = async (req, res) => {
    try {
        const { sessionId, courseId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Check if already processed
            const existingPayment = await Payment.findOne({ razorpay_order_id: sessionId }); // Using old field for session_id for simplicity, or I should update model

            if (existingPayment) {
                return res.status(200).json({ success: true, message: "Already verified" });
            }

            await Payment.create({
                razorpay_order_id: sessionId,
                razorpay_payment_id: session.payment_intent,
                razorpay_signature: "stripe_verified",
            });

            const user = await User.findById(req.user._id);
            const course = await Course.findById(courseId);

            await User.findByIdAndUpdate(req.user._id, {
                $addToSet: { enrolledCourses: courseId }
            });

            await sendEmail({
                email: user.email,
                subject: "Course Purchase Successful",
                message: `Payment Successful for **${course.name}**.\n\nYou have been successfully enrolled. Happy Learning!`,
            });

            res.status(200).json({
                success: true,
                message: "Payment Verified & Course Enrolled",
            });
        } else {
            res.status(400).json({ success: false, message: "Payment Not Completed" });
        }
    } catch (error) {
        console.error("Stripe Verification Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
