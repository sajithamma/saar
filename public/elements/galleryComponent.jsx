import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80"
];

export default function GalleryComponent() {
    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <div className="gallery-title">
                    Image Gallery
                </div>
            </div>
            <div className="gallery-grid">
                {images.map((url, idx) => (
                    <div key={idx} className="gallery-item">
                        <img
                            src={url}
                            alt={`Gallery ${idx + 1}`}
                            className="gallery-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
