import { NextRequest, NextResponse } from "next/server";
import { getAllApplications } from "@/lib/applicationStorage";

export async function GET(request: NextRequest) {
  try {
    // Fetch all applications from storage
    const applications = getAllApplications();

    // Structure each application as two clean tables
    const formattedApplications = applications.map((app) => ({
      applicationId: app.applicationId,
      submittedAt: app.submittedAt,

      // Table 1: Applicant Details
      applicantDetails: {
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
      },

      // Table 2: Collateral (Eligibility & Loan Quotes)
      collateral: {
        eligibilityStatus: app.eligibility.isEligible
          ? "ELIGIBLE"
          : "NOT ELIGIBLE",
        ineligibilityReason: app.ineligibilityReason || null,
        eligibleLoanTypes: app.eligibility.eligibleLoanTypes,
        loanQuotes: app.quotes.map((quote) => ({
          loanType: quote.loanType,
          loanAmount: quote.eligibleAmount,
          monthlyPayment: quote.monthlyPayment,
          interestRate: quote.interestRate,
          tenureYears: quote.tenureYears,
        })),
      },
    }));

    return NextResponse.json(
      {
        success: true,
        count: formattedApplications.length,
        applications: formattedApplications,
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
    console.error("Error exporting applications:", error);
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
