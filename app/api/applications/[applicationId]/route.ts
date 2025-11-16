import { NextRequest, NextResponse } from "next/server";
import { getApplication } from "@/lib/applicationStorage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;

    // Fetch the application from storage
    const application = getApplication(applicationId);

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          error: "Application not found",
          message: `No application found with ID: ${applicationId}`,
        },
        { status: 404 }
      );
    }

    // Structure the data as two clean tables
    const response = {
      success: true,
      applicationId: applicationId,
      submittedAt: application.submittedAt,

      // Table 1: Applicant Details
      applicantDetails: {
        fullName: application.userDetails.fullName,
        age: application.userDetails.age,
        dateOfBirth: application.userDetails.dateOfBirth,
        gender: application.userDetails.gender,
        maritalStatus: application.userDetails.maritalStatus,
        phoneNumber: application.userDetails.phoneNumber,
        email: application.userDetails.email,
        employmentType: application.userDetails.employmentType,
        annualIncome: application.userDetails.annualIncome,
        requestedLoanType: application.userDetails.requestedLoanType || null,
        expectedLoanAmount: application.userDetails.expectedLoanAmount || null,
        preferredTenure: application.userDetails.preferredTenure || null,
      },

      // Table 2: Collateral (Eligibility & Loan Quotes)
      collateral: {
        eligibilityStatus: application.eligibility.isEligible
          ? "ELIGIBLE"
          : "NOT ELIGIBLE",
        ineligibilityReason: application.ineligibilityReason || null,
        eligibleLoanTypes: application.eligibility.eligibleLoanTypes,
        loanQuotes: application.quotes.map((quote) => ({
          loanType: quote.loanType,
          loanAmount: quote.eligibleAmount,
          monthlyPayment: quote.monthlyPayment,
          interestRate: quote.interestRate,
          tenureYears: quote.tenureYears,
        })),
      },
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow external apps to access
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error fetching application:", error);
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
