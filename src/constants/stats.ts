import { ImageIcon, Wand2, Users, Shield, TrendingUp } from "lucide-react";
import { features } from "./home";

export interface StatItem {
    id: string;
    value: string;
    label: string;
    icon: any;
    color: string;
    bgColor: string;
    increment: string;
    description: string;
}

export const getAppStats = (): StatItem[] => {
    const totalFeatures = features.length;
    const aiPoweredFeatures = features.filter((f) => f.aiPowered).length;
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
        month: "long",
    });

    // Simulate real-time data that could come from an API
    const baseImagesProcessed = 15247;
    const dailyGrowth = Math.floor(Math.random() * 50) + 20; // Random daily growth 20-70
    const monthlyIncrease = Math.floor(Math.random() * 3000) + 1500; // Random monthly increase
    const weeklyUserGrowth = Math.floor(Math.random() * 15) + 8; // Random weekly growth 8-23%
    const activeUsers = 5429 + Math.floor(Math.random() * 100); // Some variance in active users

    return [
        {
            id: "images",
            value: (baseImagesProcessed + dailyGrowth).toLocaleString(),
            label: "Images Processed",
            icon: ImageIcon,
            color: "text-blue-600",
            bgColor: "bg-blue-100 dark:bg-blue-900/20",
            increment: `+${monthlyIncrease.toLocaleString()} this ${currentMonth}`,
            description: "Total images enhanced across all tools",
        },
        {
            id: "tools",
            value: totalFeatures.toString(),
            label: "Powerful Tools",
            icon: Wand2,
            color: "text-green-600",
            bgColor: "bg-green-100 dark:bg-green-900/20",
            increment: `${aiPoweredFeatures} AI-powered`,
            description: "Professional-grade image processing tools",
        },
        {
            id: "users",
            value: activeUsers.toLocaleString(),
            label: "Happy Users",
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-100 dark:bg-purple-900/20",
            increment: `+${weeklyUserGrowth}% this week`,
            description: "Active users transforming images daily",
        },
        {
            id: "security",
            value: "100%",
            label: "Secure & Private",
            icon: Shield,
            color: "text-orange-600",
            bgColor: "bg-orange-100 dark:bg-orange-900/20",
            increment: "SSL encrypted",
            description: "Your images are processed securely and never stored",
        },
    ];
};

export const additionalMetrics = [
    {
        value: "99.9%",
        label: "Uptime",
        description: "Service availability",
    },
    {
        value: "<2s",
        label: "Avg Processing",
        description: "Lightning fast results",
    },
    {
        value: "24/7",
        label: "Available",
        description: "Always ready to serve",
    },
    {
        value: "Free",
        label: "Forever",
        description: "No hidden costs",
    },
];
