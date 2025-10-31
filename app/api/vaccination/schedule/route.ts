import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const age = Number.parseInt(searchParams.get("age") || "0")
    const location = searchParams.get("location") || ""

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const schedules = {
      infant: [
        { vaccine: "BCG", dueDate: "At birth", status: "completed", nextDose: null },
        { vaccine: "Hepatitis B", dueDate: "At birth", status: "completed", nextDose: "6 weeks" },
        { vaccine: "DPT", dueDate: "6 weeks", status: "due", nextDose: "10 weeks" },
        { vaccine: "Polio", dueDate: "6 weeks", status: "due", nextDose: "10 weeks" },
      ],
      child: [
        { vaccine: "MMR", dueDate: "12 months", status: "completed", nextDose: "15 months" },
        { vaccine: "DPT Booster", dueDate: "18 months", status: "overdue", nextDose: null },
        { vaccine: "Polio Booster", dueDate: "18 months", status: "due", nextDose: null },
      ],
      adult: [
        { vaccine: "COVID-19", dueDate: "Annual", status: "due", nextDose: "6 months" },
        { vaccine: "Influenza", dueDate: "Annual", status: "completed", nextDose: "Next year" },
        { vaccine: "Tetanus", dueDate: "Every 10 years", status: "completed", nextDose: "2032" },
      ],
    }

    let relevantSchedule = schedules.adult
    if (age < 2) relevantSchedule = schedules.infant
    else if (age < 18) relevantSchedule = schedules.child

    return NextResponse.json({
      schedule: relevantSchedule,
      location: location || "Your Area",
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Vaccination schedule API error:", error)
    return NextResponse.json({ error: "Failed to fetch vaccination schedule" }, { status: 500 })
  }
}
