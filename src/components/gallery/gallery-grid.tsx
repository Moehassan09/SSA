import Image from "next/image";

// Mock Images
const images = [
    { id: 1, src: "/images/gallery-1.jpg", alt: "Group photo at Culture Night", span: "col-span-1 row-span-1" },
    { id: 2, src: "/images/gallery-2.jpg", alt: "Study session", span: "col-span-1 row-span-2" },
    { id: 3, src: "/images/gallery-3.jpg", alt: "BBQ Event", span: "col-span-2 row-span-1" },
    { id: 4, src: "/images/gallery-4.jpg", alt: "Guest Speaker", span: "col-span-1 row-span-1" },
    { id: 5, src: "/images/gallery-5.jpg", alt: "Game Night", span: "col-span-1 row-span-1" },
    { id: 6, src: "/images/gallery-6.jpg", alt: "Graduation Celebration", span: "col-span-2 row-span-2" },
];

export function GalleryGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {images.map((image) => (
                <div
                    key={image.id}
                    className={`relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 group ${image.span}`}
                >
                    {/* Placeholder since we don't have real images yet */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500">
                        <span className="text-sm font-medium">{image.alt}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
