import { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SelfieComponent() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function startCamera() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                setError('Could not access webcam.');
            }
        }
        startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setPhoto(dataUrl);
            const file = dataUrlToFile(dataUrl, 'selfie.png');
            // Now upload this file using Chainlit's file upload mechanism
        }
    };

    const dataUrlToFile = (dataUrl, filename) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    return (
        <Card className="p-4 w-[360px] rounded-2xl shadow-lg bg-white flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Take a Selfie</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {!photo ? (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-64 bg-black rounded mb-2 object-cover"
                    />
                    <Button onClick={takePhoto} className="mt-2">Take Photo</Button>
                </>
            ) : (
                <>
                    <img src={photo} alt="Selfie" className="w-full h-64 object-cover rounded mb-2" />
                    <Button onClick={() => setPhoto(null)} variant="outline">Retake</Button>
                </>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Card>
    );
}
