import React, { useState } from 'react';

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await onSubmit(email);
        setIsLoading(false);
        setEmail('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
                
                <div className="relative transform overflow-hidden rounded-xl bg-gray-800/90 border border-blue-500/20 p-6 text-left shadow-xl transition-all w-full max-w-md">
                    <div className="absolute right-4 top-4">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-2">
                        <h3 className="text-lg font-semibold text-white mb-1">
                            Subscribe to AI Insights
                        </h3>
                        <p className="text-sm text-gray-300">
                            Join our newsletter to receive the latest AI analysis and market trends directly in your inbox.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterModal;
