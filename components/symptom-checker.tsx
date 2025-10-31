"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Clock, AlertCircle, CheckCircle, Info } from "lucide-react"

interface SymptomCheckerProps {
  onBack: () => void
  language: string
}

interface Symptom {
  id: string
  name: string
  selected: boolean
}

interface Diagnosis {
  condition: string
  severity: "low" | "medium" | "high"
  description: string
  recommendations: string[]
}

export default function SymptomChecker({ onBack, language }: SymptomCheckerProps) {
  const [step, setStep] = useState<"symptoms" | "results">("symptoms")
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: "fever", name: "Fever", selected: false },
    { id: "cough", name: "Cough", selected: false },
    { id: "headache", name: "Headache", selected: false },
    { id: "fatigue", name: "Fatigue", selected: false },
    { id: "sore_throat", name: "Sore Throat", selected: false },
    { id: "body_pain", name: "Body Pain", selected: false },
    { id: "nausea", name: "Nausea", selected: false },
    { id: "shortness_breath", name: "Shortness of Breath", selected: false },
  ])

  const content = {
    english: {
      title: "Symptom Checker",
      subtitle: "Select your symptoms to get health guidance",
      selectSymptoms: "Select your symptoms:",
      checkSymptoms: "Check Symptoms",
      results: "Your Results",
      possibleCauses: "Possible Causes",
      recommendations: "Recommendations",
      nearestCenter: "Nearest Health Center",
      disclaimer: "This is not a medical diagnosis. Please consult a healthcare professional.",
      backToSymptoms: "Check Other Symptoms",
    },
    hindi: {
      title: "लक्षण जांचकर्ता",
      subtitle: "स्वास्थ्य मार्गदर्शन के लिए अपने लक्षण चुनें",
      selectSymptoms: "अपने लक्षण चुनें:",
      checkSymptoms: "लक्षण जांचें",
      results: "आपके परिणाम",
      possibleCauses: "संभावित कारण",
      recommendations: "सिफारिशें",
      nearestCenter: "निकटतम स्वास्थ्य केंद्र",
      disclaimer: "यह चिकित्सा निदान नहीं है। कृपया स्वास्थ्य पेशेवर से सलाह लें।",
      backToSymptoms: "अन्य लक्षण जांचें",
    },
    odia: {
      title: "ଲକ୍ଷଣ ଯାଞ୍ଚକାରୀ",
      subtitle: "ସ୍ୱାସ୍ଥ୍ୟ ମାର୍ଗଦର୍ଶନ ପାଇଁ ଆପଣଙ୍କର ଲକ୍ଷଣ ବାଛନ୍ତୁ",
      selectSymptoms: "ଆପଣଙ୍କର ଲକ୍ଷଣ ବାଛନ୍ତୁ:",
      checkSymptoms: "ଲକ୍ଷଣ ଯାଞ୍ଚ କରନ୍ତୁ",
      results: "ଆପଣଙ୍କର ଫଳାଫଳ",
      possibleCauses: "ସମ୍ଭାବ୍ୟ କାରଣ",
      recommendations: "ସୁପାରିଶ",
      nearestCenter: "ନିକଟତମ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର",
      disclaimer: "ଏହା ଚିକିତ୍ସା ନିର୍ଣ୍ଣୟ ନୁହେଁ। ଦୟାକରି ସ୍ୱାସ୍ଥ୍ୟ ପେଶାଦାରଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।",
      backToSymptoms: "ଅନ୍ୟ ଲକ୍ଷଣ ଯାଞ୍ଚ କରନ୍ତୁ",
    },
  }

  const currentContent = content[language as keyof typeof content] || content.english

  const toggleSymptom = (id: string) => {
    setSymptoms((prev) =>
      prev.map((symptom) => (symptom.id === id ? { ...symptom, selected: !symptom.selected } : symptom)),
    )
  }

  const getSelectedSymptoms = () => symptoms.filter((s) => s.selected)

  const generateDiagnosis = (): Diagnosis[] => {
    const selectedSymptoms = getSelectedSymptoms()
    const hasRespiratory = selectedSymptoms.some((s) => ["cough", "sore_throat", "shortness_breath"].includes(s.id))
    const hasFever = selectedSymptoms.some((s) => s.id === "fever")
    const hasGeneralSymptoms = selectedSymptoms.some((s) => ["headache", "fatigue", "body_pain"].includes(s.id))

    const diagnoses: Diagnosis[] = []

    if (hasFever && hasRespiratory) {
      diagnoses.push({
        condition: "Respiratory Infection",
        severity: "medium",
        description: "Common cold, flu, or other respiratory infection",
        recommendations: [
          "Rest and stay hydrated",
          "Monitor temperature",
          "Consult doctor if symptoms worsen",
          "Isolate to prevent spread",
        ],
      })
    }

    if (hasGeneralSymptoms && hasFever) {
      diagnoses.push({
        condition: "Viral Infection",
        severity: "low",
        description: "General viral infection with systemic symptoms",
        recommendations: [
          "Get adequate rest",
          "Drink plenty of fluids",
          "Take paracetamol for fever",
          "Seek medical care if no improvement in 3-5 days",
        ],
      })
    }

    if (selectedSymptoms.some((s) => s.id === "shortness_breath")) {
      diagnoses.push({
        condition: "Respiratory Distress",
        severity: "high",
        description: "Difficulty breathing requires immediate attention",
        recommendations: [
          "Seek immediate medical attention",
          "Call emergency services if severe",
          "Sit upright and try to stay calm",
          "Do not delay medical care",
        ],
      })
    }

    if (diagnoses.length === 0) {
      diagnoses.push({
        condition: "General Health Concern",
        severity: "low",
        description: "Mild symptoms that may resolve on their own",
        recommendations: [
          "Monitor symptoms",
          "Rest and maintain good hygiene",
          "Consult healthcare provider if symptoms persist",
          "Stay hydrated and eat nutritious food",
        ],
      })
    }

    return diagnoses
  }

  const checkSymptoms = () => {
    if (getSelectedSymptoms().length > 0) {
      setStep("results")
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="w-4 h-4" />
      case "medium":
        return <Info className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  if (step === "results") {
    const diagnoses = generateDiagnosis()

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setStep("symptoms")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="font-semibold">{currentContent.results}</h2>
              <p className="text-sm text-muted-foreground">Based on your symptoms</p>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-6">
          {/* Selected Symptoms */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Selected Symptoms:</h3>
            <div className="flex flex-wrap gap-2">
              {getSelectedSymptoms().map((symptom) => (
                <Badge key={symptom.id} variant="secondary">
                  {symptom.name}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Possible Causes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{currentContent.possibleCauses}</h3>
            {diagnoses.map((diagnosis, index) => (
              <Card key={index} className={`p-4 border-l-4 ${getSeverityColor(diagnosis.severity)}`}>
                <div className="flex items-start gap-3">
                  {getSeverityIcon(diagnosis.severity)}
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{diagnosis.condition}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{diagnosis.description}</p>

                    <div>
                      <h5 className="font-medium mb-2">{currentContent.recommendations}:</h5>
                      <ul className="text-sm space-y-1">
                        {diagnosis.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Nearest Health Center */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {currentContent.nearestCenter}
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Primary Health Center - Sector 12</h4>
                <p className="text-sm text-muted-foreground">123 Health Street, Medical District</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>24/7 Emergency</span>
                </div>
              </div>
              <Button className="w-full mt-3">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </Card>

          {/* Disclaimer */}
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">{currentContent.disclaimer}</p>
            </div>
          </Card>

          <Button variant="outline" className="w-full bg-transparent" onClick={() => setStep("symptoms")}>
            {currentContent.backToSymptoms}
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
        {/* Instructions */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">{currentContent.selectSymptoms}</h3>
          <p className="text-sm text-muted-foreground">
            Tap on the symptoms you're experiencing. You can select multiple symptoms.
          </p>
        </Card>

        {/* Symptom Chips */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {symptoms.map((symptom) => (
              <Button
                key={symptom.id}
                variant={symptom.selected ? "default" : "outline"}
                className={`h-auto p-4 text-left justify-start ${
                  symptom.selected ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => toggleSymptom(symptom.id)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      symptom.selected ? "bg-primary-foreground border-primary-foreground" : "border-current"
                    }`}
                  >
                    {symptom.selected && <CheckCircle className="w-3 h-3 text-primary" />}
                  </div>
                  <span className="text-sm">{symptom.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Count */}
        {getSelectedSymptoms().length > 0 && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <p className="text-sm">
              <span className="font-medium">{getSelectedSymptoms().length}</span> symptoms selected
            </p>
          </Card>
        )}

        {/* Check Button */}
        <Button className="w-full" size="lg" onClick={checkSymptoms} disabled={getSelectedSymptoms().length === 0}>
          {currentContent.checkSymptoms}
        </Button>
      </div>
    </div>
  )
}
