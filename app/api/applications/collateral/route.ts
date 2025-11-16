import { NextRequest, NextResponse } from "next/server";
import { getAllApplications } from "@/lib/applicationStorage";

/**
 * GET /api/applications/collateral
 * Returns ONLY the Collateral table (eligibility & loan quotes) for all applications
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all applications from storage
    const applications = getAllApplications();

    // Extract only collateral data (Table 2)
    const collateralTable = applications.map((app) => ({
      applicationId: app.applicationId,
      submittedAt: app.submittedAt,
      applicantName: app.userDetails.fullName, // For reference
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
    }));

    return NextResponse.json(
      {
        success: true,
        tableName: "Collateral",
        count: collateralTable.length,
        data: collateralTable,
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
    console.error("Error fetching collateral data:", error);
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
