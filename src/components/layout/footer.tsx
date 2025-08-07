import React from 'react';
import Link from 'next/link';
import { Mail, Globe, Github, PenTool, Linkedin, BookOpen, HelpCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import { EXTERNAL_URLS } from '@/constants';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Copyright */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Pixel Craft</h3>
            <p className="text-sm text-muted-foreground">
              An open-source image processing application powered by AI. Transform, optimize, and
              enhance your images with cutting-edge technology.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={EXTERNAL_URLS.GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Open Source</span>
              </a>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">MIT License</span>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              © {currentYear} Pixel Craft. All rights reserved.
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/blog"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>Blog & Tutorials</span>
              </Link>
              <Link
                href="/faq"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </Link>
              <a
                href={EXTERNAL_URLS.GITHUB_README}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Documentation</span>
              </a>
            </div>
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
              {CONTACT_INFO.social.map(social => {
                const iconMap = {
                  Github: Github,
                  PenTool: PenTool,
                  Linkedin: Linkedin,
                };

                const IconComponent = iconMap[social.icon as keyof typeof iconMap];

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
            Made with ❤️ by the open source community •{' '}
            <a
              href={EXTERNAL_URLS.GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Contribute on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
