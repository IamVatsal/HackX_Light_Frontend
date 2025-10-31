"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertTriangle, MapPin, Calendar, Bell, BellRing, Shield, Phone } from "lucide-react"

interface OutbreakAlertsProps {
  onBack: () => void
  language: string
}

interface Alert {
  id: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  location: string
  date: Date
  description: string
  preventionTips: string[]
  affectedAreas: string[]
  contactInfo?: string
}

export default function OutbreakAlerts({ onBack, language }: OutbreakAlertsProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  const content = {
    english: {
      title: "Outbreak Alerts",
      subtitle: "Stay informed about health emergencies",
      subscribe: "Subscribe to Alerts",
      subscribed: "Subscribed",
      unsubscribe: "Unsubscribe",
      currentAlerts: "Current Alerts",
      preventionTips: "Prevention Tips",
      affectedAreas: "Affected Areas",
      emergencyContact: "Emergency Contact",
      backToAlerts: "Back to Alerts",
      severity: {
        critical: "Critical",
        high: "High",
        medium: "Medium",
        low: "Low",
      },
    },
    hindi: {
      title: "प्रकोप अलर्ट",
      subtitle: "स्वास्थ्य आपातकाल के बारे में सूचित रहें",
      subscribe: "अलर्ट की सदस्यता लें",
      subscribed: "सदस्यता ली गई",
      unsubscribe: "सदस्यता रद्द करें",
      currentAlerts: "वर्तमान अलर्ट",
      preventionTips: "रोकथाम के सुझाव",
      affectedAreas: "प्रभावित क्षेत्र",
      emergencyContact: "आपातकालीन संपर्क",
      backToAlerts: "अलर्ट पर वापस जाएं",
      severity: {
        critical: "गंभीर",
        high: "उच्च",
        medium: "मध्यम",
        low: "कम",
      },
    },
    odia: {
      title: "ପ୍ରକୋପ ଆଲର୍ଟ",
      subtitle: "ସ୍ୱାସ୍ଥ୍ୟ ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି ବିଷୟରେ ସୂଚିତ ରୁହନ୍ତୁ",
      subscribe: "ଆଲର୍ଟ ସବସ୍କ୍ରାଇବ କରନ୍ତୁ",
      subscribed: "ସବସ୍କ୍ରାଇବ ହୋଇଛି",
      unsubscribe: "ସବସ୍କ୍ରିପସନ ବାତିଲ କରନ୍ତୁ",
      currentAlerts: "ବର୍ତ୍ତମାନର ଆଲର୍ଟ",
      preventionTips: "ପ୍ରତିରୋଧ ପରାମର୍ଶ",
      affectedAreas: "ପ୍ରଭାବିତ ଅଞ୍ଚଳ",
      emergencyContact: "ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ",
      backToAlerts: "ଆଲର୍ଟକୁ ଫେରନ୍ତୁ",
      severity: {
        critical: "ଗୁରୁତର",
        high: "ଉଚ୍ଚ",
        medium: "ମଧ୍ୟମ",
        low: "କମ୍",
      },
    },
  }

  const currentContent = content[language as keyof typeof content] || content.english

  const alerts: Alert[] = [
    {
      id: "1",
      title: "Dengue Outbreak - Monsoon Alert",
      severity: "critical",
      location: "Delhi NCR",
      date: new Date("2024-03-15"),
      description:
        "Significant increase in dengue cases reported across Delhi NCR region. Immediate preventive measures recommended.",
      preventionTips: [
        "Remove stagnant water from containers",
        "Use mosquito nets and repellents",
        "Wear long-sleeved clothing",
        "Seek immediate medical attention for fever",
        "Keep surroundings clean and dry",
      ],
      affectedAreas: ["Central Delhi", "South Delhi", "Gurgaon", "Noida", "Faridabad"],
      contactInfo: "1075 (Delhi Health Helpline)",
    },
    {
      id: "2",
      title: "Seasonal Influenza Surge",
      severity: "high",
      location: "Mumbai Metropolitan",
      date: new Date("2024-03-10"),
      description: "Increased cases of seasonal flu reported. Vulnerable populations advised to take precautions.",
      preventionTips: [
        "Get annual flu vaccination",
        "Wash hands frequently",
        "Avoid crowded places if possible",
        "Cover mouth when coughing or sneezing",
        "Stay home if feeling unwell",
      ],
      affectedAreas: ["Mumbai City", "Thane", "Navi Mumbai", "Kalyan-Dombivli"],
      contactInfo: "104 (Maharashtra Health Helpline)",
    },
    {
      id: "3",
      title: "Water Contamination Alert",
      severity: "medium",
      location: "Bhubaneswar",
      date: new Date("2024-03-08"),
      description: "Water quality issues detected in certain areas. Boil water before consumption.",
      preventionTips: [
        "Boil water for at least 10 minutes before drinking",
        "Use water purification tablets",
        "Avoid street food and raw vegetables",
        "Maintain proper hygiene",
        "Report any stomach-related symptoms immediately",
      ],
      affectedAreas: ["Old Town", "Khandagiri", "Patia", "Chandrasekharpur"],
      contactInfo: "108 (Odisha Emergency Services)",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600 text-white"
      case "high":
        return "bg-orange-600 text-white"
      case "medium":
        return "bg-yellow-600 text-white"
      case "low":
        return "bg-blue-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getSeverityBorderColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-600 bg-red-50"
      case "high":
        return "border-orange-600 bg-orange-50"
      case "medium":
        return "border-yellow-600 bg-yellow-50"
      case "low":
        return "border-blue-600 bg-blue-50"
      default:
        return "border-gray-600 bg-gray-50"
    }
  }

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  if (selectedAlert) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedAlert(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="font-semibold">Alert Details</h2>
              <p className="text-sm text-muted-foreground">{selectedAlert.location}</p>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-6">
          {/* Alert Banner */}
          <Card className={`p-4 border-l-4 ${getSeverityBorderColor(selectedAlert.severity)}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle
                className={`w-6 h-6 flex-shrink-0 mt-1 ${
                  selectedAlert.severity === "critical"
                    ? "text-red-600"
                    : selectedAlert.severity === "high"
                      ? "text-orange-600"
                      : selectedAlert.severity === "medium"
                        ? "text-yellow-600"
                        : "text-blue-600"
                }`}
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{selectedAlert.title}</h3>
                  <Badge className={getSeverityColor(selectedAlert.severity)}>
                    {currentContent.severity[selectedAlert.severity as keyof typeof currentContent.severity]}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedAlert.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedAlert.date)}</span>
                  </div>
                </div>
                <p className="text-sm">{selectedAlert.description}</p>
              </div>
            </div>
          </Card>

          {/* Prevention Tips */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {currentContent.preventionTips}
            </h3>
            <ul className="space-y-2">
              {selectedAlert.preventionTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Affected Areas */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {currentContent.affectedAreas}
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedAlert.affectedAreas.map((area, index) => (
                <Badge key={index} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Emergency Contact */}
          {selectedAlert.contactInfo && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                {currentContent.emergencyContact}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">{selectedAlert.contactInfo}</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </Card>
          )}

          <Button variant="outline" className="w-full bg-transparent" onClick={() => setSelectedAlert(null)}>
            {currentContent.backToAlerts}
          </Button>
        </div>
      </div>
    )
  }

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
        {/* Subscription Card */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isSubscribed ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                {isSubscribed ? (
                  <BellRing className="w-5 h-5 text-green-600" />
                ) : (
                  <Bell className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{isSubscribed ? currentContent.subscribed : "Get Notified"}</h3>
                <p className="text-sm text-muted-foreground">
                  {isSubscribed
                    ? "You will receive outbreak alerts"
                    : "Receive instant alerts about health emergencies"}
                </p>
              </div>
            </div>
            <Button variant={isSubscribed ? "outline" : "default"} onClick={toggleSubscription}>
              {isSubscribed ? currentContent.unsubscribe : currentContent.subscribe}
            </Button>
          </div>
        </Card>

        {/* Current Alerts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{currentContent.currentAlerts}</h3>

          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`p-4 border-l-4 cursor-pointer hover:bg-accent/50 transition-colors ${getSeverityBorderColor(alert.severity)}`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className={`w-5 h-5 flex-shrink-0 mt-1 ${
                    alert.severity === "critical"
                      ? "text-red-600"
                      : alert.severity === "high"
                        ? "text-orange-600"
                        : alert.severity === "medium"
                          ? "text-yellow-600"
                          : "text-blue-600"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {currentContent.severity[alert.severity as keyof typeof currentContent.severity]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(alert.date)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{alert.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Safety Guidelines */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">General Safety Guidelines</p>
              <ul className="space-y-1 text-xs">
                <li>• Stay informed through official health channels</li>
                <li>• Follow preventive measures recommended by health authorities</li>
                <li>• Seek immediate medical attention if symptoms develop</li>
                <li>• Report suspected cases to local health departments</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
