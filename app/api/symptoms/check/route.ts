import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { symptoms, age, gender, location } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockConditions = [
      {
        condition: "Common Cold",
        probability: 75,
        severity: "low" as const,
        recommendations: [
          "Get plenty of rest",
          "Stay hydrated",
          "Use over-the-counter medications if needed",
          "Monitor symptoms for 3-5 days",
        ],
      },
      {
        condition: "Seasonal Flu",
        probability: 60,
        severity: "medium" as const,
        recommendations: [
          "Consult a healthcare provider",
          "Consider antiviral medication",
          "Isolate to prevent spread",
          "Monitor for severe symptoms",
        ],
      },
    ]

    if (symptoms.includes("fever") && symptoms.includes("cough")) {
      mockConditions.push({
        condition: "Respiratory Infection",
        probability: 65,
        severity: "medium" as const,
        recommendations: [
          "Seek medical attention",
          "Get tested if symptoms persist",
          "Avoid contact with others",
          "Monitor breathing difficulties",
        ],
      })
    }

    return NextResponse.json({
      possibleConditions: mockConditions,
      nearestHealthCenter: {
        name: "Government Primary Health Center",
        address: `Main Road, ${location || "Your Area"}`,
        phone: "+91-674-2345678",
        distance: "2.3 km",
      },
      disclaimer:
        "This is not a medical diagnosis. Please consult a healthcare professional for proper medical advice.",
    })
  } catch (error) {
    console.error("Symptom check API error:", error)
    return NextResponse.json({ error: "Failed to process symptom check" }, { status: 500 })
  }
}
