import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Loader2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { token, backendUrl } = useAuth();

    const sessionId = searchParams.get("session_id");
    const courseId = searchParams.get("course_id");
    const reference = searchParams.get("reference") || sessionId;

    const [verifying, setVerifying] = useState(true);
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'

    useEffect(() => {
        const verifyPayment = async () => {
            if (!sessionId || !courseId) {
                // If it's old Razorpay flow (reference only)
                if (searchParams.get("reference")) {
                    setVerifying(false);
                    setStatus('success');
                    return;
                }
                setStatus('error');
                setVerifying(false);
                return;
            }

            try {
                const { data } = await axios.post(`${backendUrl}/api/payment/verification/${courseId}`, {
                    sessionId,
                    courseId
                }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (data.success) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error("Verification Error:", error);
                setStatus('error');
                toast.error(error.response?.data?.message || "Verification failed");
            } finally {
                setVerifying(false);
            }
        };

        if (token) {
            verifyPayment();
        }
    }, [sessionId, courseId, token, backendUrl, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0f0f2e 0%, #1a1044 25%, #2d1b69 50%, #1e3a5f 80%, #0f2a4a 100%)" }}>

            {/* Decorative Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center"
            >
                {status === 'verifying' ? (
                    <>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-6 border border-blue-500/30">
                            <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Verifying Payment...</h2>
                        <p className="text-blue-100/60 mb-8">Please hold on while we confirm your enrollment.</p>
                    </>
                ) : status === 'success' ? (
                    <>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 border border-green-500/30">
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                        <p className="text-blue-100/60 mb-8">Thank you for your purchase. Your course is now unlocked!</p>
                    </>
                ) : (
                    <>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6 border border-red-500/30">
                            <XCircle className="w-10 h-10 text-red-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Verification Failed</h2>
                        <p className="text-blue-100/60 mb-8">We couldn't verify your payment. Please contact support if this is an error.</p>
                    </>
                )}

                <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10">
                    <p className="text-sm text-blue-200/60 mb-1">Reference ID</p>
                    <p className="text-white font-mono text-sm break-all">{reference || "Pending..."}</p>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/dashboard"
                        className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        Go to Dashboard
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                        to="/"
                        className="block w-full py-3.5 text-white/60 hover:text-white transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </motion.div>

            {/* Logo Link */}
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="font-bold tracking-tight">EduPlatform</span>

            </Link>
        </div>
    );
};

export default PaymentSuccess;
