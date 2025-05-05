import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80"
];

export default function GalleryComponent() {
    return (
        <Card style={{ width: 636, minWidth: 636, maxWidth: 636 }}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-center w-full">
                    Image Gallery
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 grid-rows-2 gap-3">
                    {images.map((url, idx) => (
                        <div
                            key={idx}
                            className="overflow-hidden rounded-lg shadow w-[200px] h-[200px] flex items-center justify-center bg-gray-100"
                        >
                            <img
                                src={url}
                                alt={`Gallery ${idx + 1}`}
                                className="object-cover w-[200px] h-[200px]"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
