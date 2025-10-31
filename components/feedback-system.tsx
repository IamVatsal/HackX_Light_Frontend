"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, CheckCircle } from "lucide-react"

interface FeedbackSystemProps {
  onBack: () => void
  language: string
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  selectedOption?: number
}

export default function FeedbackSystem({ onBack, language }: FeedbackSystemProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const content = {
    english: {
      title: "Feedback & Survey",
      subtitle: "Help us improve our services",
      ratingTitle: "How was your experience?",
      ratingSubtitle: "Rate your overall experience with our health assistant",
      feedbackTitle: "Additional Comments",
      feedbackPlaceholder: "Tell us more about your experience...",
      quizTitle: "Quick Survey",
      quizSubtitle: "Help us understand your needs better",
      submitButton: "Submit Feedback",
      thankYou: "Thank You!",
      thankYouMessage:
        "Your feedback has been submitted successfully. We appreciate your input to help us improve our services.",
      backToHome: "Back to Home",
      ratings: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
    },
    hindi: {
      title: "फीडबैक और सर्वेक्षण",
      subtitle: "हमारी सेवाओं को बेहतर बनाने में हमारी मदद करें",
      ratingTitle: "आपका अनुभव कैसा रहा?",
      ratingSubtitle: "हमारे स्वास्थ्य सहायक के साथ अपने समग्र अनुभव को रेट करें",
      feedbackTitle: "अतिरिक्त टिप्पणियां",
      feedbackPlaceholder: "अपने अनुभव के बारे में और बताएं...",
      quizTitle: "त्वरित सर्वेक्षण",
      quizSubtitle: "आपकी आवश्यकताओं को बेहतर समझने में हमारी मदद करें",
      submitButton: "फीडबैक सबमिट करें",
      thankYou: "धन्यवाद!",
      thankYouMessage: "आपका फीडबैक सफलतापूर्वक सबमिट हो गया है। हमारी सेवाओं को बेहतर बनाने में आपके योगदान की हम सराहना करते हैं।",
      backToHome: "होम पर वापस जाएं",
      ratings: ["बहुत खराब", "खराब", "औसत", "अच्छा", "उत्कृष्ट"],
    },
    odia: {
      title: "ମତାମତ ଏବଂ ସର୍ଭେ",
      subtitle: "ଆମର ସେବାକୁ ଉନ୍ନତ କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ",
      ratingTitle: "ଆପଣଙ୍କର ଅଭିଜ୍ଞତା କେମିତି ଥିଲା?",
      ratingSubtitle: "ଆମର ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ ସହିତ ଆପଣଙ୍କର ସାମଗ୍ରିକ ଅଭିଜ୍ଞତାକୁ ମୂଲ୍ୟାଙ୍କନ କରନ୍ତୁ",
      feedbackTitle: "ଅତିରିକ୍ତ ମନ୍ତବ୍ୟ",
      feedbackPlaceholder: "ଆପଣଙ୍କର ଅଭିଜ୍ଞତା ବିଷୟରେ ଅଧିକ କୁହନ୍ତୁ...",
      quizTitle: "ଦ୍ରୁତ ସର୍ଭେ",
      quizSubtitle: "ଆପଣଙ୍କର ଆବଶ୍ୟକତାକୁ ଭଲ ଭାବରେ ବୁଝିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ",
      submitButton: "ମତାମତ ଦାଖଲ କରନ୍ତୁ",
      thankYou: "ଧନ୍ୟବାଦ!",
      thankYouMessage: "ଆପଣଙ୍କର ମତାମତ ସଫଳତାର ସହିତ ଦାଖଲ ହୋଇଛି। ଆମର ସେବାକୁ ଉନ୍ନତ କରିବାରେ ଆପଣଙ୍କର ଯୋଗଦାନ ପାଇଁ ଆମେ କୃତଜ୍ଞ।",
      backToHome: "ହୋମକୁ ଫେରନ୍ତୁ",
      ratings: ["ବହୁତ ଖରାପ", "ଖରାପ", "ସାଧାରଣ", "ଭଲ", "ଉତ୍କୃଷ୍ଟ"],
    },
  }

  const currentContent = content[language as keyof typeof content] || content.english

  const quizQuestions: QuizQuestion[] = [
    {
      id: "1",
      question: "How often do you use health-related mobile apps?",
      options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
    },
    {
      id: "2",
      question: "Which feature did you find most useful?",
      options: ["Symptom Checker", "Vaccination Timeline", "Outbreak Alerts", "Chat Assistant", "All Features"],
    },
    {
      id: "3",
      question: "How likely are you to recommend this app to others?",
      options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"],
    },
    {
      id: "4",
      question: "What improvement would you like to see?",
      options: ["More Languages", "Better UI/UX", "More Features", "Faster Response", "Better Accuracy"],
    },
  ]

  const emojiRatings = ["😞", "😕", "😐", "😊", "😍"]

  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }))
  }

  const handleSubmit = () => {
    // In a real app, this would send data to a backend
    setIsSubmitted(true)
  }

  const canSubmit = selectedRating !== null

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="font-semibold">{currentContent.thankYou}</h2>
              <p className="text-sm text-muted-foreground">Feedback submitted</p>
            </div>
          </div>
        </header>

        <div className="p-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="p-8 text-center max-w-md w-full">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold mb-4">{currentContent.thankYou}</h2>
            <p className="text-muted-foreground mb-8 text-balance">{currentContent.thankYouMessage}</p>

            <Button onClick={onBack} className="w-full">
              {currentContent.backToHome}
            </Button>
          </Card>
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
        {/* Rating Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">{currentContent.ratingTitle}</h3>
          <p className="text-sm text-muted-foreground mb-6">{currentContent.ratingSubtitle}</p>

          <div className="flex justify-center gap-4 mb-4">
            {emojiRatings.map((emoji, index) => (
              <button
                key={index}
                className={`text-4xl p-3 rounded-full transition-all hover:scale-110 ${
                  selectedRating === index ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-accent"
                }`}
                onClick={() => setSelectedRating(index)}
              >
                {emoji}
              </button>
            ))}
          </div>

          {selectedRating !== null && (
            <p className="text-center text-sm font-medium text-primary">{currentContent.ratings[selectedRating]}</p>
          )}
        </Card>

        {/* Additional Comments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">{currentContent.feedbackTitle}</h3>
          <Textarea
            placeholder={currentContent.feedbackPlaceholder}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-24 resize-none"
          />
        </Card>

        {/* Quiz Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">{currentContent.quizTitle}</h3>
          <p className="text-sm text-muted-foreground mb-6">{currentContent.quizSubtitle}</p>

          <div className="space-y-6">
            {quizQuestions.map((question, questionIndex) => (
              <div key={question.id}>
                <h4 className="font-medium mb-3 text-sm">
                  {questionIndex + 1}. {question.question}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {question.options.map((option, optionIndex) => (
                    <Button
                      key={optionIndex}
                      variant={quizAnswers[question.id] === optionIndex ? "default" : "outline"}
                      className="justify-start h-auto p-3 text-left text-sm"
                      onClick={() => handleQuizAnswer(question.id, optionIndex)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            quizAnswers[question.id] === optionIndex
                              ? "bg-primary-foreground border-primary-foreground"
                              : "border-current"
                          }`}
                        >
                          {quizAnswers[question.id] === optionIndex && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Submit Button */}
        <Button className="w-full" size="lg" onClick={handleSubmit} disabled={!canSubmit}>
          <Send className="w-4 h-4 mr-2" />
          {currentContent.submitButton}
        </Button>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step === 1 && selectedRating !== null
                    ? "bg-primary"
                    : step === 2 && feedback.length > 0
                      ? "bg-primary"
                      : step === 3 && Object.keys(quizAnswers).length > 0
                        ? "bg-primary"
                        : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p>Your feedback helps us improve our services</p>
        </div>
      </div>
    </div>
  )
}
