import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../lib/axios';
import bg from '/bg-img.png';
import { useUserStore } from '../stores/useUserStore';

// Paystack sends the customer back here: /payment/callback?reference=...
const PaymentCallbackPage = () => {
    const [params] = useSearchParams();
    const reference = params.get('reference') || params.get('trxref');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(reference ? null : 'No payment reference found.');
    const { checkAuth } = useUserStore();

    useEffect(() => {
        if (!reference) return;
        let cancelled = false;
        axios.get(`/payments/paystack/verify/${encodeURIComponent(reference)}`)
            .then(res => {
                if (cancelled) return;
                setResult(res.data);
                // Refresh the user so "My Plan" shows a newly activated plan
                if (res.data.planActivated) checkAuth();
            })
            .catch(err => {
                if (!cancelled) setError(err?.response?.data?.message || 'Could not verify payment.');
            });
        return () => { cancelled = true; };
    }, [reference, checkAuth]);

    let content;
    if (error) {
        content = (
            <>
                <h1 className="font-display text-3xl uppercase tracking-wider">Something went wrong</h1>
                <p className="text-stone-300">{error}</p>
                <p className="text-stone-400 text-sm">If you were charged, contact us with your reference: {reference}</p>
            </>
        );
    } else if (!result) {
        content = <p className="text-stone-300">Confirming your payment...</p>;
    } else if (result.status === 'paid') {
        content = (
            <>
                <h1 className="font-display text-3xl uppercase tracking-wider">Payment Successful</h1>
                <p className="text-stone-300">Thank you! We've received ₦{result.totalAmount.toLocaleString()}.</p>
                {result.type === 'menu' && result.items?.length > 0 && (
                    <ul className="text-stone-300 text-left inline-block">
                        {result.items.map(i => <li key={i.name}>{i.quantity}x {i.name}</li>)}
                    </ul>
                )}
                {result.type === 'meal-plan' && (
                    <p className="text-stone-300">
                        {result.mealPlan?.planTitle} — {result.mealPlan?.option}.{' '}
                        {result.planActivated
                            ? 'Your plan is now active on your account.'
                            : 'We will contact you to get your plan started.'}
                    </p>
                )}
                <p className="text-stone-500 text-xs">Reference: {result.reference}</p>
            </>
        );
    } else {
        content = (
            <>
                <h1 className="font-display text-3xl uppercase tracking-wider">Payment Not Completed</h1>
                <p className="text-stone-300">
                    {result.status === 'failed'
                        ? 'Your payment failed or was cancelled. You have not been charged.'
                        : 'We have not received confirmation yet. If you completed payment, refresh this page in a moment.'}
                </p>
                <p className="text-stone-500 text-xs">Reference: {result.reference}</p>
            </>
        );
    }

    return (
        <div className="relative w-full min-h-screen bg-black text-stone-200">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
            <div className="absolute inset-0 bg-black/90 z-10" />
            <main className="relative z-20 max-w-lg mx-auto px-4 pt-32 pb-16 text-center space-y-4 font-sans">
                {content}
                <div className="pt-6 flex flex-col gap-3">
                    {result?.planActivated && (
                        <Link to="/my-plan" className="font-semibold text-black bg-stone-200 px-8 py-3 rounded-lg hover:bg-white">View My Plan</Link>
                    )}
                    <Link to="/" className="text-stone-300 border border-stone-500 px-8 py-3 rounded-lg hover:bg-stone-800">Back to Home</Link>
                </div>
            </main>
        </div>
    );
};

export default PaymentCallbackPage;
