import { NextRequest, NextResponse } from "next/server";
import { getAllApplications } from "@/lib/applicationStorage";

/**
 * GET /api/applications/applicants
 * Returns ONLY the Applicant Details table for all applications
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all applications from storage
    const applications = getAllApplications();

    // Extract only applicant details (Table 1)
    const applicantDetailsTable = applications.map((app) => ({
      applicationId: app.applicationId,
      submittedAt: app.submittedAt,
      fullName: app.userDetails.fullName,
      age: app.userDetails.age,
      dateOfBirth: app.userDetails.dateOfBirth,
      gender: app.userDetails.gender,
      maritalStatus: app.userDetails.maritalStatus,
      phoneNumber: app.userDetails.phoneNumber,
      email: app.userDetails.email,
      employmentType: app.userDetails.employmentType,
      annualIncome: app.userDetails.annualIncome,
      requestedLoanType: app.userDetails.requestedLoanType || null,
      expectedLoanAmount: app.userDetails.expectedLoanAmount || null,
      preferredTenure: app.userDetails.preferredTenure || null,
    }));

    return NextResponse.json(
      {
        success: true,
        tableName: "Applicant Details",
        count: applicantDetailsTable.length,
        data: applicantDetailsTable,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow external apps to access
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching applicant details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
