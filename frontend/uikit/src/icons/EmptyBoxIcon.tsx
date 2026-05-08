import React from "react";

interface EmptyBoxIconProps {
    color?: string;
}

const EmptyBoxIcon: React.FC<EmptyBoxIconProps> = ({ color }) => {
    return (
        <svg
            width={64}
            height={40}
            viewBox="0 0 64 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: color || "#d8dde3" }}>
            <path
                fill="#f5f5f5"
                d="M32 39.703c17.673 0 32-3.111 32-6.948s-14.327-6.948-32-6.948-32 3.11-32 6.948c0 3.837 14.327 6.948 32 6.948"
            />
            <path
                stroke="currentColor"
                d="M55 13.665 44.854 2.25C44.367 1.47 43.656 1 42.907 1H21.093c-.749 0-1.46.47-1.947 1.248L9 13.666v9.17h46z"
            />
            <path
                fill="#fafafa"
                stroke="currentColor"
                d="M41.613 16.814c0-1.594.994-2.909 2.227-2.91H55v18.003c0 2.107-1.32 3.834-2.95 3.834h-40.1c-1.63 0-2.95-1.728-2.95-3.834V13.904h11.16c1.233 0 2.227 1.313 2.227 2.907v.021c0 1.593 1.005 2.88 2.237 2.88h14.752c1.232 0 2.237-1.298 2.237-2.892z"
            />
        </svg>
    );
};

export default EmptyBoxIcon;
