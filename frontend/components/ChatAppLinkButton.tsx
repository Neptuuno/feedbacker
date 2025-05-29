"use client";

import React, { MouseEvent, useCallback } from 'react';

/**
 * Props for the ChatAppLinkButton component.
 */
export interface ChatAppLinkButtonProps {
    /**
     * The base URL of your chat application's login/authorization endpoint.
     * Example: 'https://yourchatapp.com/login'
     */
    chatAppBaseUrl: string;
    /**
     * The full URL in the original application where the user should be redirected
     * after successful authorization in the chat app.
     * Example: 'https://originalapp.com/chat-callback'
     */
    redirectUri: string;
    /**
     * A unique identifier (slug) for the original application.
     * Your chat app uses this to identify the requesting application.
     * Example: 'my-ecommerce-app'
     */
    appSlug: string;
    /**
     * The text content to display on the button.
     * @default 'Connect to Chat'
     */
    buttonText?: string;
    /**
     * Optional CSS class name for the button.
     * Developers can use this to apply custom styles from their own CSS.
     */
    className?: string;
    /**
     * Optional style object for the button.
     * Developers can use this for inline CSS styles.
     */
    style?: React.CSSProperties;
    /**
     * Optional callback function that is executed when the button is clicked,
     * before the redirect to the chat app occurs.
     */
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * A React button component to initiate the linking process with your Chat Application.
 * When clicked, it redirects the user to your chat app's login/authorization page.
 * After successful authorization, your chat app will redirect back to the `redirectUri`
 * provided, including the `chat_app_user_id` and a `state` parameter for security.
 */
const ChatAppLinkButton: React.FC<ChatAppLinkButtonProps> = ({
                                                                 chatAppBaseUrl,
                                                                 redirectUri,
                                                                 appSlug,
                                                                 buttonText = 'Connect to Chat',
                                                                 className,
                                                                 style,
                                                                 onClick,
                                                             }) => {
    // Use useCallback to memoize the click handler, preventing unnecessary re-renders
    // if the component's parent re-renders.
    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        const params = new URLSearchParams();
        params.append('redirect_uri', redirectUri);
        params.append('app', appSlug);

        const fullRedirectUrl = `${chatAppBaseUrl}?${params.toString()}`;
        if (typeof window !== 'undefined') {
            window.location.href = fullRedirectUrl;
        } else {
            console.warn('Cannot perform client-side redirect during server-side rendering.');
        }
    }, [chatAppBaseUrl, redirectUri, appSlug, onClick]); // Dependencies for useCallback

    return (
        <button
            type="button" // Always specify type for buttons
            onClick={handleClick}
            className={className} // Allows custom CSS classes
            style={style}       // Allows inline CSS styles
        >
            {buttonText} {/* Displays the button text */}
        </button>
    );
};

export default ChatAppLinkButton;