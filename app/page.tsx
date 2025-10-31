"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Shield, Heart, Users } from "lucide-react"
import ChatInterface from "@/components/chat-interface"
import SymptomChecker from "@/components/symptom-checker"
import VaccinationTimeline from "@/components/vaccination-timeline"
import OutbreakAlerts from "@/components/outbreak-alerts"
import FeedbackSystem from "@/components/feedback-system"

export default function LandingPage() {
  const [language, setLanguage] = useState("english")
  const [currentScreen, setCurrentScreen] = useState("landing")

  const languages = {
    english: {
      title: "Aarogya Sahayak",
      tagline: "Your trusted companion for health information and services",
      startChat: "Start Chat",
      features: [
        { icon: MessageCircle, title: "AI Health Assistant", desc: "Get instant health guidance" },
        { icon: Shield, title: "Symptom Checker", desc: "Check your symptoms safely" },
        { icon: Heart, title: "Vaccination Reminders", desc: "Stay up to date with vaccines" },
        { icon: Users, title: "Outbreak Alerts", desc: "Get timely health alerts" },
      ],
    },
    hindi: {
      title: "आरोग्य सहायक",
      tagline: "स्वास्थ्य जानकारी और सेवाओं के लिए आपका विश्वसनीय साथी",
      startChat: "चैट शुरू करें",
      features: [
        { icon: MessageCircle, title: "AI स्वास्थ्य सहायक", desc: "तुरंत स्वास्थ्य मार्गदर्शन प्राप्त करें" },
        { icon: Shield, title: "लक्षण जांचकर्ता", desc: "अपने लक्षणों की सुरक्षित जांच करें" },
        { icon: Heart, title: "टीकाकरण अनुस्मारक", desc: "टीकों के साथ अद्यतन रहें" },
        { icon: Users, title: "प्रकोप अलर्ट", desc: "समय पर स्वास्थ्य अलर्ट प्राप्त करें" },
      ],
    },
    odia: {
      title: "ସରକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ",
      tagline: "ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଏବଂ ସେବା ପାଇଁ ଆପଣଙ୍କର ବିଶ୍ୱସ୍ତ ସାଥୀ",
      startChat: "ଚାଟ୍ ଆରମ୍ଭ କରନ୍ତୁ",
      features: [
        { icon: MessageCircle, title: "AI ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ", desc: "ତୁରନ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ମାର୍ଗଦର୍ଶନ ପାଆନ୍ତୁ" },
        { icon: Shield, title: "ଲକ୍ଷଣ ଯାଞ୍ଚକାରୀ", desc: "ଆପଣଙ୍କର ଲକ୍ଷଣଗୁଡ଼ିକୁ ସୁରକ୍ଷିତ ଭାବରେ ଯାଞ୍ଚ କରନ୍ତୁ" },
        { icon: Heart, title: "ଟିକାକରଣ ସ୍ମାରକ", desc: "ଟିକା ସହିତ ଅଦ୍ୟତନ ରୁହନ୍ତୁ" },
        { icon: Users, title: "ପ୍ରକୋପ ଆଲର୍ଟ", desc: "ସମୟାନୁବର୍ତ୍ତୀ ସ୍ୱାସ୍ଥ୍ୟ ଆଲର୍ଟ ପାଆନ୍ତୁ" },
      ],
    },
  }

  const currentLang = languages[language as keyof typeof languages]

  if (currentScreen === "chat") {
    return (
      <ChatInterface onBack={() => setCurrentScreen("landing")} onNavigate={setCurrentScreen} language={language} />
    )
  }

  if (currentScreen === "symptoms") {
    return <SymptomChecker onBack={() => setCurrentScreen("landing")} language={language} />
  }

  if (currentScreen === "vaccination") {
    return <VaccinationTimeline onBack={() => setCurrentScreen("landing")} language={language} />
  }

  if (currentScreen === "outbreak") {
    return <OutbreakAlerts onBack={() => setCurrentScreen("landing")} language={language} />
  }

  if (currentScreen === "feedback") {
    return <FeedbackSystem onBack={() => setCurrentScreen("landing")} language={language} />
  }

  if (currentScreen !== "landing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground mb-4">This feature is being developed.</p>
          <Button onClick={() => setCurrentScreen("landing")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full govt-gradient flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Government of India</h1>
              <p className="text-sm text-muted-foreground">Ministry of Health & Family Welfare</p>
            </div>
          </div>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिंदी</SelectItem>
              <SelectItem value="odia">ଓଡ଼ିଆ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="w-24 h-24 rounded-full govt-gradient mx-auto mb-8 flex items-center justify-center">
            <Heart className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">{currentLang.title}</h1>

          <p className="text-xl text-muted-foreground text-balance mb-12 max-w-2xl mx-auto">{currentLang.tagline}</p>

          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-2xl bg-primary hover:bg-primary/90"
            onClick={() => setCurrentScreen("chat")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {currentLang.startChat}
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {currentLang.features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>For Medical Health</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>Made For People</span>
            </div>
          </div>
        </div>

        {/* Feedback Link */}
        <div className="mt-12 text-center">
          <Button variant="outline" onClick={() => setCurrentScreen("feedback")}>
            Share Your Feedback
          </Button>
        </div>
      </main>
    </div>
  )
}
