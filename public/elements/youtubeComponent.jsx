import { useState } from 'react';

export default function YouTubeComponent() {
    const [isLoaded, setIsLoaded] = useState(false);

    // Extract video ID from URL
    const videoId = "LlAcz07qrug";
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="youtube-container">
            <div className="youtube-header">
                <h2 className="youtube-title">YouTube Video</h2>
            </div>
            <div className="youtube-wrapper">
                {!isLoaded && (
                    <div className="youtube-loading">
                        <div className="youtube-loading-spinner"></div>
                        <p>Loading video...</p>
                    </div>
                )}
                <iframe
                    className="youtube-iframe"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => setIsLoaded(true)}
                ></iframe>
            </div>
            <div className="youtube-info">
                <p className="youtube-description">
                    This video is embedded from YouTube.
                    Click <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">here</a> to watch on YouTube.
                </p>
            </div>
        </div>
    );
}
