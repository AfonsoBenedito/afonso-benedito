import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';

const Loader = () => {
    const [searchParams] = useSearchParams();
    const target = searchParams.get('target');

    const timeoutParam = searchParams.get('timeout');
    const timeoutSeconds = timeoutParam ? parseInt(timeoutParam, 10) : 120;
    const timeoutMs = timeoutSeconds * 1000;

    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [showManualLink, setShowManualLink] = useState(false);

    useEffect(() => {
        if (!target) {
            setStatus('error');
            return;
        }

        let isActive = true;

        const checkService = async () => {
            if (!isActive) return;

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

                await fetch(target, {
                    mode: 'no-cors',
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);
                if (isActive) setStatus('ready');
            } catch (error) {
                if (isActive) {
                    setTimeout(checkService, 1000);
                }
            }
        };

        checkService();

        return () => {
            isActive = false;
        };
    }, [target, timeoutMs]);

    useEffect(() => {
        if (status === 'ready' && target) {
            window.location.href = target;
        }
    }, [status, target]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowManualLink(true);
        }, timeoutMs);

        return () => clearTimeout(timer);
    }, [timeoutMs]);

    const minutes = Math.ceil(timeoutSeconds / 60);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-8 max-w-md">

                <div className="relative w-24 h-24 mx-auto">
                    <motion.div
                        className="absolute inset-0 border-4 border-primary-200 rounded-full"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute inset-0 border-t-4 border-primary-600 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-2xl font-bold font-heading text-gray-900">
                        {status === 'loading' && 'Waking up the server...'}
                        {status === 'ready' && 'Ready! Redirecting...'}
                        {status === 'error' && 'Something went wrong'}
                    </h1>

                    <p className="text-gray-600">
                        {status === 'loading' && (
                            <>
                                This service runs on a cold-start architecture. <br />
                                It may take up to {minutes} minute{minutes !== 1 ? 's' : ''} to initialize.
                            </>
                        )}
                        {status === 'error' && (
                            <span className="text-red-500">
                                Please specify a valid target URL parameter.
                            </span>
                        )}
                    </p>
                </div>

                {target && showManualLink && (
                    <motion.a
                        href={target}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block mt-8 text-primary-600 hover:text-primary-700 underline text-sm"
                    >
                        taking too long? try clicking here
                    </motion.a>
                )}
            </div>
        </div>
    );
};

export default Loader;
