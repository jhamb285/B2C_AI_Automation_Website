"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    Calendar,
    Clock,
    User,
    Star,
    ChevronLeft,
    ChevronRight,
    Check,
    MessageSquare,
    Video,
    Phone,
    Zap
} from "lucide-react";

const experts = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "AI Implementation Expert",
        rating: 4.9,
        reviews: 127,
        avatar: "🧑‍💻",
        specialties: ["HVAC", "Plumbing"],
        nextAvailable: "Today 2:00 PM"
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        role: "Automation Specialist", 
        rating: 4.8,
        reviews: 89,
        avatar: "👨‍🔧",
        specialties: ["Construction", "Roofing"],
        nextAvailable: "Tomorrow 10:00 AM"
    },
    {
        id: 3,
        name: "Emily Johnson",
        role: "Business Integration Lead",
        rating: 5.0,
        reviews: 156,
        avatar: "👩‍💼",
        specialties: ["All Industries", "CRM"],
        nextAvailable: "Today 4:30 PM"
    }
];

const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const consultationTypes = [
    { 
        type: "Discovery Call", 
        duration: "30 min", 
        icon: MessageSquare, 
        color: "text-blue-500",
        description: "Understand your needs"
    },
    { 
        type: "Demo & Setup", 
        duration: "45 min", 
        icon: Video, 
        color: "text-green-500",
        description: "Live demonstration"
    },
    { 
        type: "Technical Review", 
        duration: "60 min", 
        icon: Zap, 
        color: "text-purple-500",
        description: "Deep dive implementation"
    }
];

export default function CalendarScheduling() {
    const [selectedExpert, setSelectedExpert] = useState(experts[0]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedType, setSelectedType] = useState(consultationTypes[0]);
    const [currentStep, setCurrentStep] = useState(0); // 0: expert, 1: type, 2: time
    const [isBooked, setIsBooked] = useState(false);

    // Generate calendar days
    const generateCalendarDays = () => {
        const today = new Date();
        const days = [];
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const [calendarDays] = useState(generateCalendarDays());

    const handleBooking = () => {
        setIsBooked(true);
        setTimeout(() => {
            setIsBooked(false);
            setCurrentStep(0);
            setSelectedTime("");
        }, 3000);
    };

    if (isBooked) {
        return (
            <div className="w-full h-full flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut"
                        }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <Check className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Booking Confirmed!</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                        {selectedType.type} with {selectedExpert.name}
                    </p>
                    <p className="text-xs text-primary font-medium">
                        {selectedDate.toLocaleDateString()} at {selectedTime}
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-4 space-y-3 flex flex-col">
            {/* Header */}
            <div className="text-center">
                <motion.div
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                    animate={{
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Calendar className="w-4 h-4" />
                    Book Free Consultation
                </motion.div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 justify-center mb-4">
                {[0, 1, 2].map((step) => (
                    <motion.div
                        key={step}
                        className={`w-2 h-2 rounded-full ${
                            step <= currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`}
                        animate={{
                            scale: step === currentStep ? [1, 1.3, 1] : 1
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: step === currentStep ? Infinity : 0,
                            repeatDelay: 1
                        }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* Step 0: Expert Selection */}
                {currentStep === 0 && (
                    <motion.div
                        key="experts"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2"
                    >
                        <h4 className="text-xs font-semibold text-foreground mb-2">Choose Your Expert</h4>
                        {experts.map((expert, index) => (
                            <motion.div
                                key={expert.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => {
                                    setSelectedExpert(expert);
                                    setCurrentStep(1);
                                }}
                                className={`p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                                    selectedExpert.id === expert.id 
                                        ? 'border-primary bg-primary/10' 
                                        : 'border-border/50 hover:border-primary/50'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="text-lg">{expert.avatar}</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-foreground">{expert.name}</p>
                                        <p className="text-[10px] text-muted-foreground">{expert.role}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-2 h-2 text-yellow-500 fill-current" />
                                            <span className="text-[9px] text-muted-foreground">
                                                {expert.rating} ({expert.reviews})
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-green-500 font-medium">Available</p>
                                        <p className="text-[8px] text-muted-foreground">{expert.nextAvailable}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Step 1: Consultation Type */}
                {currentStep === 1 && (
                    <motion.div
                        key="types"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <button 
                                onClick={() => setCurrentStep(0)}
                                className="p-1 hover:bg-muted rounded"
                            >
                                <ChevronLeft className="w-3 h-3" />
                            </button>
                            <h4 className="text-xs font-semibold text-foreground">Choose Consultation Type</h4>
                        </div>
                        
                        {consultationTypes.map((type, index) => (
                            <motion.div
                                key={type.type}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => {
                                    setSelectedType(type);
                                    setCurrentStep(2);
                                }}
                                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                    selectedType.type === type.type 
                                        ? 'border-primary bg-primary/10' 
                                        : 'border-border/50 hover:border-primary/50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <type.icon className={`w-4 h-4 ${type.color}`} />
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-foreground">{type.type}</p>
                                        <p className="text-[10px] text-muted-foreground">{type.description}</p>
                                    </div>
                                    <span className="text-[10px] text-primary font-medium">{type.duration}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Step 2: Date & Time Selection */}
                {currentStep === 2 && (
                    <motion.div
                        key="datetime"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <button 
                                onClick={() => setCurrentStep(1)}
                                className="p-1 hover:bg-muted rounded"
                            >
                                <ChevronLeft className="w-3 h-3" />
                            </button>
                            <h4 className="text-xs font-semibold text-foreground">Select Date & Time</h4>
                        </div>

                        {/* Mini Calendar */}
                        <div className="grid grid-cols-7 gap-1 mb-3">
                            {calendarDays.slice(0, 7).map((date, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedDate(date)}
                                    className={`p-1 text-[10px] rounded ${
                                        selectedDate.toDateString() === date.toDateString()
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                    }`}
                                >
                                    <div>{date.getDate()}</div>
                                    <div className="text-[8px] opacity-70">
                                        {date.toLocaleDateString('en', { weekday: 'short' })}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <div className="space-y-2">
                            <p className="text-[10px] font-medium text-foreground">Available Times</p>
                            <div className="grid grid-cols-3 gap-1">
                                {timeSlots.map((time, index) => (
                                    <motion.button
                                        key={time}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-2 text-[10px] rounded border transition-all duration-200 ${
                                            selectedTime === time
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border/50 hover:border-primary/50'
                                        }`}
                                    >
                                        {time}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Book Button */}
                        {selectedTime && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={handleBooking}
                                className="w-full p-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                            >
                                Book {selectedType.type}
                                <Clock className="w-3 h-3 ml-2 inline" />
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}