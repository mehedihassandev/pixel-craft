import { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | PixelCraft',
  description:
    'Find answers to common questions about PixelCraft image processing tools. Learn about background removal, image compression, OCR, and more.',
  keywords: [
    'PixelCraft FAQ',
    'image processing questions',
    'background removal help',
    'image compression FAQ',
    'OCR questions',
    'image resize help',
    'photo editing FAQ',
  ],
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | PixelCraft',
    description: 'Find answers to common questions about PixelCraft image processing tools.',
    url: 'https://pixel-craft-sigma.vercel.app/faq',
  },
  alternates: {
    canonical: '/faq',
  },
};

const faqs = [
  {
    question: 'What image formats does PixelCraft support?',
    answer:
      'PixelCraft supports all major image formats including JPEG, PNG, WebP, GIF, BMP, and TIFF for most tools. For specific tools like PNG to SVG conversion, we focus on the most relevant formats for optimal results.',
  },
  {
    question: 'Is PixelCraft free to use?',
    answer:
      'Yes, PixelCraft is completely free to use for all basic image processing operations. We process images locally in your browser, ensuring privacy and no usage limits.',
  },
  {
    question: 'How does the AI background removal work?',
    answer:
      'Our AI background removal uses advanced machine learning models trained on millions of images. The AI analyzes your image to identify foreground subjects and automatically removes the background with high precision.',
  },
  {
    question: "What's the maximum file size I can upload?",
    answer:
      "The maximum file size depends on your browser's capabilities and available memory. Generally, we support images up to 50MB. For best performance, we recommend keeping files under 20MB.",
  },
  {
    question: 'Do you store my uploaded images?',
    answer:
      "No, we don't store any of your images on our servers. All image processing happens locally in your browser, ensuring complete privacy and security of your files.",
  },
  {
    question: 'Can I use PixelCraft for commercial purposes?',
    answer:
      'Yes, you can use PixelCraft for both personal and commercial projects. The processed images are yours to use however you like.',
  },
  {
    question: 'How accurate is the OCR text extraction?',
    answer:
      'Our OCR technology achieves over 95% accuracy on clear, well-lit text images. Accuracy may vary depending on image quality, text size, and language. We support 100+ languages including English, Spanish, French, German, Chinese, and more.',
  },
  {
    question: "What's the difference between lossless and lossy compression?",
    answer:
      'Lossless compression reduces file size without losing any image quality, perfect for images with text or sharp edges. Lossy compression achieves smaller file sizes by removing some image data, ideal for photographs where slight quality loss is acceptable.',
  },
  {
    question: 'Can I batch process multiple images?',
    answer:
      "Currently, batch processing is available for OCR text extraction. We're working on adding batch processing capabilities to other tools based on user feedback.",
  },
  {
    question: 'Does PixelCraft work on mobile devices?',
    answer:
      'Yes, PixelCraft is fully responsive and works on all devices including smartphones and tablets. However, for the best experience with large images, we recommend using a desktop or laptop.',
  },
  {
    question: 'How do I report a bug or request a feature?',
    answer:
      'You can report bugs or request features through our GitHub repository. We actively monitor and respond to community feedback to improve PixelCraft continuously.',
  },
  {
    question: 'What browsers are supported?',
    answer:
      'PixelCraft works on all modern browsers including Chrome (recommended), Firefox, Safari, and Edge. For the best performance, we recommend using the latest version of Chrome.',
  },
];

const toolFaqs = [
  {
    category: 'Background Removal',
    questions: [
      {
        question: "Why didn't the AI remove the background perfectly?",
        answer:
          'AI background removal works best with clear subject boundaries and good contrast. Try images with better lighting, avoid cluttered backgrounds, and ensure the main subject is clearly defined.',
      },
      {
        question: 'Can I remove backgrounds from multiple people in one image?',
        answer:
          'Yes, our AI can handle multiple subjects in a single image. However, results are best when subjects are clearly separated and have good contrast with the background.',
      },
    ],
  },
  {
    category: 'Image Compression',
    questions: [
      {
        question: 'How much can I compress an image without losing quality?',
        answer:
          'With lossless compression, you can typically reduce file size by 10-30% without any quality loss. With lossy compression, you can achieve 50-90% reduction with minimal visible quality loss.',
      },
      {
        question: 'Which format is best for web use?',
        answer:
          'WebP offers the best compression for web use, followed by JPEG for photos and PNG for images with transparency. We recommend WebP when browser support allows.',
      },
    ],
  },
];

export default function FAQPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about PixelCraft's image processing tools and features.
          </p>
        </div>

        {/* General FAQs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
            <CardDescription>
              Common questions about PixelCraft and how to use our tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Tool-specific FAQs */}
        {toolFaqs.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="mb-8">
            <CardHeader>
              <CardTitle>{category.category} Questions</CardTitle>
              <CardDescription>
                Specific questions about {category.category.toLowerCase()} features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}

        {/* Contact Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader className="text-center">
            <CardTitle>Still Have Questions?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? We're here to help!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Visit our GitHub repository to report issues, request features, or get community
              support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/mehedihassandev/pixel-craft"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Visit GitHub Repository
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
