import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, timestamp } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let response = "I understand your concern. How can I help you further?"
    let suggestions: string[] = []

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("symptom") || lowerMessage.includes("sick") || lowerMessage.includes("pain")) {
      response = "I can help you check your symptoms. Would you like me to guide you through our symptom checker?"
      suggestions = ["Check symptoms", "Find nearby clinic", "Emergency contacts"]
    } else if (lowerMessage.includes("vaccine") || lowerMessage.includes("vaccination")) {
      response = "I can provide information about vaccination schedules and reminders. What would you like to know?"
      suggestions = ["Vaccination schedule", "Set reminder", "Vaccine info"]
    } else if (lowerMessage.includes("outbreak") || lowerMessage.includes("alert")) {
      response = "I can show you current health alerts and outbreak information in your area."
      suggestions = ["Current alerts", "Prevention tips", "Subscribe to alerts"]
    } else if (lowerMessage.includes("feedback") || lowerMessage.includes("review")) {
      response = "Thank you for wanting to provide feedback! Your input helps us improve our services."
      suggestions = ["Rate service", "Report issue", "Suggest improvement"]
    }

    return NextResponse.json({
      response,
      messageId: `msg_${Date.now()}`,
      suggestions,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get("conversationId")

  return NextResponse.json([
    {
      message: "Hello! I'm your health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
      messageId: "msg_1",
    },
  ])
}
