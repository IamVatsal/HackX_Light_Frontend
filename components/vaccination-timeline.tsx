"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle, XCircle, MessageSquare, Bell } from "lucide-react"

interface VaccinationTimelineProps {
  onBack: () => void
  language: string
}

interface Vaccine {
  id: string
  name: string
  ageGroup: string
  dueDate: Date
  status: "completed" | "due" | "overdue"
  description: string
  nextDose?: Date
}

export default function VaccinationTimeline({ onBack, language }: VaccinationTimelineProps) {
  const [selectedAge, setSelectedAge] = useState<"infant" | "child" | "adult">("infant")

  const content = {
    english: {
      title: "Vaccination Schedule",
      subtitle: "Track your vaccination timeline",
      ageGroups: {
        infant: "Infant (0-2 years)",
        child: "Child (2-18 years)",
        adult: "Adult (18+ years)",
      },
      status: {
        completed: "Completed",
        due: "Due Soon",
        overdue: "Overdue",
      },
      setReminder: "Set WhatsApp Reminder",
      reminderSet: "Reminder Set",
      nextDose: "Next Dose",
      dueDate: "Due Date",
      description: "Description",
    },
    hindi: {
      title: "टीकाकरण अनुसूची",
      subtitle: "अपनी टीकाकरण समयसीमा को ट्रैक करें",
      ageGroups: {
        infant: "शिशु (0-2 वर्ष)",
        child: "बच्चा (2-18 वर्ष)",
        adult: "वयस्क (18+ वर्ष)",
      },
      status: {
        completed: "पूर्ण",
        due: "जल्द देय",
        overdue: "अतिदेय",
      },
      setReminder: "WhatsApp अनुस्मारक सेट करें",
      reminderSet: "अनुस्मारक सेट",
      nextDose: "अगली खुराक",
      dueDate: "देय तिथि",
      description: "विवरण",
    },
    odia: {
      title: "ଟିକାକରଣ ସୂଚୀ",
      subtitle: "ଆପଣଙ୍କର ଟିକାକରଣ ସମୟସୀମା ଟ୍ରାକ୍ କରନ୍ତୁ",
      ageGroups: {
        infant: "ଶିଶୁ (0-2 ବର୍ଷ)",
        child: "ପିଲା (2-18 ବର୍ଷ)",
        adult: "ବୟସ୍କ (18+ ବର୍ଷ)",
      },
      status: {
        completed: "ସମ୍ପୂର୍ଣ୍ଣ",
        due: "ଶୀଘ୍ର ଦେୟ",
        overdue: "ଅତିଦେୟ",
      },
      setReminder: "WhatsApp ସ୍ମାରକ ସେଟ୍ କରନ୍ତୁ",
      reminderSet: "ସ୍ମାରକ ସେଟ୍",
      nextDose: "ପରବର୍ତ୍ତୀ ଡୋଜ୍",
      dueDate: "ଦେୟ ତାରିଖ",
      description: "ବର୍ଣ୍ଣନା",
    },
  }

  const currentContent = content[language as keyof typeof content] || content.english

  const vaccineData: Record<string, Vaccine[]> = {
    infant: [
      {
        id: "1",
        name: "BCG",
        ageGroup: "At birth",
        dueDate: new Date("2024-01-15"),
        status: "completed",
        description: "Protects against tuberculosis",
      },
      {
        id: "2",
        name: "Hepatitis B",
        ageGroup: "At birth",
        dueDate: new Date("2024-01-15"),
        status: "completed",
        description: "Protects against Hepatitis B virus",
      },
      {
        id: "3",
        name: "DPT (1st dose)",
        ageGroup: "6 weeks",
        dueDate: new Date("2024-03-01"),
        status: "due",
        description: "Protects against Diphtheria, Pertussis, and Tetanus",
        nextDose: new Date("2024-04-01"),
      },
      {
        id: "4",
        name: "Polio (1st dose)",
        ageGroup: "6 weeks",
        dueDate: new Date("2024-03-01"),
        status: "due",
        description: "Protects against Poliomyelitis",
      },
      {
        id: "5",
        name: "MMR",
        ageGroup: "9 months",
        dueDate: new Date("2024-02-15"),
        status: "overdue",
        description: "Protects against Measles, Mumps, and Rubella",
      },
    ],
    child: [
      {
        id: "6",
        name: "DPT Booster",
        ageGroup: "5-6 years",
        dueDate: new Date("2024-04-15"),
        status: "due",
        description: "Booster dose for continued protection",
      },
      {
        id: "7",
        name: "Typhoid",
        ageGroup: "2 years",
        dueDate: new Date("2024-01-20"),
        status: "completed",
        description: "Protects against typhoid fever",
      },
      {
        id: "8",
        name: "HPV",
        ageGroup: "9-14 years",
        dueDate: new Date("2024-05-01"),
        status: "due",
        description: "Protects against Human Papillomavirus",
      },
    ],
    adult: [
      {
        id: "9",
        name: "COVID-19",
        ageGroup: "18+ years",
        dueDate: new Date("2024-03-15"),
        status: "due",
        description: "Protects against COVID-19",
        nextDose: new Date("2024-09-15"),
      },
      {
        id: "10",
        name: "Influenza",
        ageGroup: "Annual",
        dueDate: new Date("2024-02-01"),
        status: "overdue",
        description: "Annual flu vaccination",
      },
      {
        id: "11",
        name: "Tetanus",
        ageGroup: "Every 10 years",
        dueDate: new Date("2024-12-01"),
        status: "completed",
        description: "Tetanus booster shot",
      },
    ],
  }

  const [reminders, setReminders] = useState<Set<string>>(new Set())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200"
      case "due":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "overdue":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "due":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "overdue":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const setWhatsAppReminder = (vaccineId: string) => {
    setReminders((prev) => new Set([...prev, vaccineId]))
    // In a real app, this would integrate with WhatsApp Business API
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const currentVaccines = vaccineData[selectedAge]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold">{currentContent.title}</h2>
            <p className="text-sm text-muted-foreground">{currentContent.subtitle}</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Age Group Selector */}
        <Card className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {(["infant", "child", "adult"] as const).map((age) => (
              <Button
                key={age}
                variant={selectedAge === age ? "default" : "outline"}
                className="text-xs h-auto p-3"
                onClick={() => setSelectedAge(age)}
              >
                {currentContent.ageGroups[age]}
              </Button>
            ))}
          </div>
        </Card>

        {/* Vaccination Timeline */}
        <div className="space-y-4">
          {currentVaccines.map((vaccine, index) => (
            <Card key={vaccine.id} className="p-4">
              <div className="flex items-start gap-4">
                {/* Status Indicator */}
                <div className="flex flex-col items-center">
                  {getStatusIcon(vaccine.status)}
                  {index < currentVaccines.length - 1 && <div className="w-px h-16 bg-border mt-2" />}
                </div>

                {/* Vaccine Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{vaccine.name}</h3>
                      <p className="text-sm text-muted-foreground">{vaccine.ageGroup}</p>
                    </div>
                    <Badge className={getStatusColor(vaccine.status)}>
                      {currentContent.status[vaccine.status as keyof typeof currentContent.status]}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{vaccine.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{currentContent.dueDate}:</span>
                      <span className="font-medium">{formatDate(vaccine.dueDate)}</span>
                    </div>

                    {vaccine.nextDose && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{currentContent.nextDose}:</span>
                        <span className="font-medium">{formatDate(vaccine.nextDose)}</span>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Reminder Button */}
                  {vaccine.status !== "completed" && (
                    <Button
                      variant={reminders.has(vaccine.id) ? "secondary" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={() => setWhatsAppReminder(vaccine.id)}
                      disabled={reminders.has(vaccine.id)}
                    >
                      {reminders.has(vaccine.id) ? (
                        <>
                          <Bell className="w-4 h-4 mr-2" />
                          {currentContent.reminderSet}
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {currentContent.setReminder}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Vaccination Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {currentVaccines.filter((v) => v.status === "completed").length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {currentVaccines.filter((v) => v.status === "due").length}
              </div>
              <div className="text-xs text-muted-foreground">Due Soon</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {currentVaccines.filter((v) => v.status === "overdue").length}
              </div>
              <div className="text-xs text-muted-foreground">Overdue</div>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Important Notice</p>
              <p>
                Always consult with your healthcare provider before getting vaccinated. This schedule is based on
                general guidelines and may vary based on individual health conditions.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
