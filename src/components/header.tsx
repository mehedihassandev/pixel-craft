import { ImageIcon } from "lucide-react";

export default function Header() {
    return (
        <header className="p-4 border-b bg-card sticky top-0 z-20 shadow-sm">
            <div className="container mx-auto flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                    <ImageIcon className="text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Pixel Craft
                </h1>
            </div>
        </header>
    );
}
