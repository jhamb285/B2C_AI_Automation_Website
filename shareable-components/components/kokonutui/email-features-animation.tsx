"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    Mail, 
    Calendar, 
    Send,
    Users,
    Target,
    Sparkles,
    CheckCircle2 
} from "lucide-react";

interface EmailFeature {
    icon: React.ComponentType<any>;
    name: string;
    description: string;
    color: string;
    status: "setting-up" | "configuring" | "ready";
}

const emailFeatures: EmailFeature[] = [
    {
        icon: Users,
        name: "Contact Lists",
        description: "Building customer segments",
        color: "#3B82F6",
        status: "setting-up"
    },
    {
        icon: Mail,
        name: "Email Templates",
        description: "Creating responsive designs",
        color: "#F59E0B",
        status: "setting-up"
    },
    {
        icon: Calendar,
        name: "Scheduling Engine",
        description: "Setting up drip sequences",
        color: "#8B5CF6",
        status: "setting-up"
    },
    {
        icon: Target,
        name: "Campaign Tracking",
        description: "Enabling open rate monitoring",
        color: "#10B981",
        status: "setting-up"
    }
];

export default function EmailFeaturesAnimation() {
    const allCampaigns = [
        { id: 1, subject: "Summer HVAC Maintenance", recipient: "Residential Customers", status: "sent", time: "2 min ago" },
        { id: 2, subject: "New Service Area Launch", recipient: "Commercial Leads", status: "sending", time: "5 min ago" },
        { id: 3, subject: "Equipment Upgrade Offers", recipient: "Past Customers", status: "scheduled", time: "8 min ago" },
        { id: 4, subject: "Emergency Repair Services", recipient: "Emergency List", status: "sent", time: "12 min ago" },
        { id: 5, subject: "Seasonal Discounts", recipient: "VIP Customers", status: "sent", time: "15 min ago" },
        { id: 6, subject: "Service Reminder", recipient: "Maintenance Plan", status: "sending", time: "18 min ago" },
        { id: 7, subject: "Customer Satisfaction Survey", recipient: "Recent Customers", status: "scheduled", time: "22 min ago" },
        { id: 8, subject: "Winter Prep Checklist", recipient: "All Customers", status: "sent", time: "25 min ago" },
    ];

    const [visibleCampaigns, setVisibleCampaigns] = useState<typeof allCampaigns>([]);
    const [campaignIndex, setCampaignIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (campaignIndex < allCampaigns.length) {
                setVisibleCampaigns(prev => [allCampaigns[campaignIndex], ...prev].slice(0, 4));
                setCampaignIndex(prev => (prev + 1) % allCampaigns.length);
            }
        }, 1600);

        return () => clearInterval(interval);
    }, [campaignIndex]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "sent":
                return <CheckCircle2 className="w-3 h-3 text-green-500" />;
            case "sending":
                return (
                    <motion.div
                        className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                );
            case "scheduled":
                return (
                    <motion.div
                        className="w-3 h-3 bg-yellow-500 rounded-full"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                );
            default:
                return <div className="w-3 h-3 bg-muted rounded-full" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "sent": return "text-green-600";
            case "sending": return "text-blue-600";
            case "scheduled": return "text-yellow-600";
            default: return "text-muted-foreground";
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-3">
            <div className="flex-1 space-y-3 overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {visibleCampaigns.map((campaign) => (
                        <motion.div
                            key={campaign.id}
                            initial={{ opacity: 0, y: -50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-card border border-border rounded-lg p-3 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="font-medium text-xs text-foreground truncate pr-2">
                                    {campaign.subject}
                                </div>
                                <div className="text-xs text-muted-foreground shrink-0">
                                    {campaign.time}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="text-xs text-muted-foreground">
                                    {campaign.recipient}
                                </div>
                                
                                <div className="flex items-center gap-1">
                                    {getStatusIcon(campaign.status)}
                                    <span className={`text-xs font-medium capitalize ${getStatusColor(campaign.status)}`}>
                                        {campaign.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {visibleCampaigns.length === 0 && (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                            <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <div className="text-xs">Monitoring campaigns...</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}