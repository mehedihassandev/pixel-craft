import React from "react";
import { Mail, Globe, Github, PenTool, Linkedin } from "lucide-react";
import { CONTACT_INFO } from "@/constants/contact";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand and Copyright */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Pixel Craft</h3>
                        <p className="text-sm text-muted-foreground">
                            Think of an idea, we will make it real. Everything
                            is generated on the fly, no images are stored or
                            cached.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Pixel Craft. All rights reserved.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact</h3>
                        <div className="flex flex-col space-y-2">
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                <span>{CONTACT_INFO.email}</span>
                            </a>
                            <a
                                href={CONTACT_INFO.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Globe className="h-4 w-4" />
                                <span>{CONTACT_INFO.websiteDisplay}</span>
                            </a>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Follow</h3>
                        <div className="flex space-x-4">
                            {CONTACT_INFO.social.map((social) => {
                                const iconMap = {
                                    Github: Github,
                                    PenTool: PenTool,
                                    Linkedin: Linkedin,
                                };

                                const IconComponent =
                                    iconMap[
                                        social.icon as keyof typeof iconMap
                                    ];

                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label={social.name}
                                    >
                                        <IconComponent className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom separator */}
                <div className="mt-8 pt-6 border-t text-center">
                    <p className="text-sm text-muted-foreground">
                        Made with ❤️ by{" "}
                        <a
                            href={CONTACT_INFO.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                        >
                            {CONTACT_INFO.name}
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
