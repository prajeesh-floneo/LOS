import { NextResponse } from "next/server";
import { getAllApplications } from "@/lib/applicationStorage";

/**
 * GET endpoint to retrieve all loan applications
 * This is used by the admin dashboard
 */
export async function GET() {
  try {
    const applications = getAllApplications();

    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

