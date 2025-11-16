import { NextRequest, NextResponse } from "next/server";
import { getApplication } from "@/lib/applicationStorage";

export async function GET(
  request: NextRequest,
  { params }: { params: { applicationId: string } }
) {
  try {
    const { applicationId } = params;

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
        fullName: application.result.userDetails.fullName,
        age: application.result.userDetails.age,
        dateOfBirth: application.result.userDetails.dateOfBirth,
        gender: application.result.userDetails.gender,
        maritalStatus: application.result.userDetails.maritalStatus,
        phoneNumber: application.result.userDetails.phoneNumber,
        email: application.result.userDetails.email,
        employmentType: application.result.userDetails.employmentType,
        annualIncome: application.result.userDetails.annualIncome,
        requestedLoanType: application.result.userDetails.requestedLoanType || null,
        expectedLoanAmount: application.result.userDetails.expectedLoanAmount || null,
        preferredTenure: application.result.userDetails.preferredTenure || null,
      },

      // Table 2: Collateral (Eligibility & Loan Quotes)
      collateral: {
        eligibilityStatus: application.result.eligibility.isEligible
          ? "ELIGIBLE"
          : "NOT ELIGIBLE",
        ineligibilityReason: application.result.ineligibilityReason || null,
        eligibleLoanTypes: application.result.eligibility.eligibleLoanTypes,
        loanQuotes: application.result.quotes.map((quote) => ({
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

