import React from 'react';
import { format } from 'date-fns';

export interface Tweet {
    _id: string;
    tweet_id: string;
    username: string;
    user_image: string;
    created_at: number;
    created_at_datetime: number;
    favorite_count: string;
    text: string | null;
    media: string | null;
}

interface TweetListProps {
    tweets: Tweet[];
}

const TweetList: React.FC<TweetListProps> = ({ tweets }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full overflow-y-auto px-4 custom-scrollbar">
            {tweets.map((tweet) => (
                <div
                    key={tweet._id}
                    className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/30 transform transition-all duration-200 hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-xl"
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 ring-2 ring-blue-500/20 rounded-full overflow-hidden">
                                    <img
                                        src={tweet.user_image}
                                        alt="User image"
                                        className="w-full h-full object-cover transform transition-transform duration-200 hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-white truncate hover:text-blue-400 transition-colors">
                                        @{tweet.username}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {format(new Date(tweet.created_at_datetime), 'MMM d, yyyy')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex-grow">
                            {tweet.text && (
                                <p className="text-sm text-gray-200 leading-relaxed line-clamp-4">
                                    {tweet.text}
                                </p>
                            )}
                            {tweet.media && (
                                <div className="mt-3 rounded-lg overflow-hidden ring-1 ring-white/10">
                                    <img
                                        src={tweet.media}
                                        alt="Tweet media"
                                        className="w-full h-auto object-cover transform transition-transform duration-200 hover:scale-105"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                            <div className="flex items-center space-x-1.5 text-gray-400 group">
                                <svg
                                    className="w-4 h-4 transition-colors group-hover:text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <span className="text-xs group-hover:text-red-500 transition-colors">{tweet.favorite_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = `
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.3);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.5);
}
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default TweetList;
