import {
    ImageIcon,
    Eraser,
    Zap,
    Sparkles,
    Maximize,
    Archive,
    Menu,
} from "lucide-react";
import Link from "next/link";
import { menus } from "@/navigation/menus";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const iconMap = {
    Eraser,
    Zap,
    Sparkles,
    Maximize,
    Archive,
    ImageIcon,
};

export default function Header() {
    return (
        <header className="border-b bg-card/95 backdrop-blur sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-lg">
                            <ImageIcon className="text-primary-foreground h-5 w-5" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                            Pixel Craft
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {menus.map((item) => {
                            const IconComponent =
                                iconMap[item.icon as keyof typeof iconMap];
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                                >
                                    <IconComponent className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <div className="flex flex-col space-y-4 mt-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-primary p-2 rounded-lg">
                                            <ImageIcon className="text-primary-foreground h-5 w-5" />
                                        </div>
                                        <h2 className="text-lg font-bold tracking-tight">
                                            Pixel Craft
                                        </h2>
                                    </div>
                                    <nav className="flex flex-col space-y-2">
                                        {menus.map((item) => {
                                            const IconComponent =
                                                iconMap[
                                                    item.icon as keyof typeof iconMap
                                                ];
                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                                                >
                                                    <IconComponent className="h-5 w-5" />
                                                    <span className="font-medium">
                                                        {item.label}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
