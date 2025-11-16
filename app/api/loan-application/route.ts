import { NextRequest, NextResponse } from "next/server";
import {
  calculateAge,
  checkEligibility,
  generateLoanQuote,
} from "@/lib/loanCalculator";
import { LoanApplicationInput, LoanApplicationResult } from "@/types/loan";
import {
  generateApplicationId,
  storeApplication,
} from "@/lib/applicationStorage";

export async function POST(request: NextRequest) {
  try {
    const body: LoanApplicationInput = await request.json();

    // Validate required fields
    if (
      !body.firstName ||
      !body.lastName ||
      !body.dateOfBirth ||
      !body.email ||
      !body.phoneNumber
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate age and full name
    const age = calculateAge(body.dateOfBirth);
    const fullName = `${body.firstName} ${body.lastName}`;

    // Check eligibility
    const eligibility = checkEligibility(
      age,
      body.employmentType,
      body.annualIncome,
      fullName
    );

    // Prepare result
    const result: LoanApplicationResult = {
      userDetails: {
        fullName,
        firstName: body.firstName,
        lastName: body.lastName,
        dateOfBirth: body.dateOfBirth,
        age,
        gender: body.gender,
        maritalStatus: body.maritalStatus,
        phoneNumber: body.phoneNumber,
        email: body.email,
        employmentType: body.employmentType,
        annualIncome: body.annualIncome,
        requestedLoanType: body.requestedLoanType,
        expectedLoanAmount: body.expectedLoanAmount,
        preferredTenure: body.preferredTenure,
      },
      eligibility,
      quotes: [],
    };

    // Generate quotes for eligible loan types
    if (eligibility.isEligible) {
      result.quotes = eligibility.eligibleLoanTypes.map((loanType) =>
        generateLoanQuote(loanType, age, body.annualIncome, fullName)
      );
    } else {
      result.ineligibilityReason = eligibility.ineligibilityReason;
    }

    // Generate unique application ID
    const applicationId = generateApplicationId();

    // Store the application with full results
    storeApplication(applicationId, result);

    // Send data to webhook if configured
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        // Structure data as two clean tables for external apps
        const webhookPayload = {
          applicationId,
          submittedAt: new Date().toISOString(),

          // Table 1: Applicant Details
          applicantDetails: {
            fullName: result.userDetails.fullName,
            age: result.userDetails.age,
            dateOfBirth: result.userDetails.dateOfBirth,
            gender: result.userDetails.gender,
            maritalStatus: result.userDetails.maritalStatus,
            phoneNumber: result.userDetails.phoneNumber,
            email: result.userDetails.email,
            employmentType: result.userDetails.employmentType,
            annualIncome: result.userDetails.annualIncome,
            requestedLoanType: result.userDetails.requestedLoanType || null,
            expectedLoanAmount: result.userDetails.expectedLoanAmount || null,
            preferredTenure: result.userDetails.preferredTenure || null,
          },

          // Table 2: Collateral (Eligibility & Loan Quotes)
          collateral: {
            eligibilityStatus: result.eligibility.isEligible
              ? "ELIGIBLE"
              : "NOT ELIGIBLE",
            ineligibilityReason: result.ineligibilityReason || null,
            eligibleLoanTypes: result.eligibility.eligibleLoanTypes,
            loanQuotes: result.quotes.map((quote) => ({
              loanType: quote.loanType,
              loanAmount: quote.eligibleAmount,
              monthlyPayment: quote.monthlyPayment,
              interestRate: quote.interestRate,
              tenureYears: quote.tenureYears,
            })),
          },
        };

        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookPayload),
        });
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
        // Continue even if webhook fails
      }
    }

    // Return only confirmation data to the user (NOT the full results)
    return NextResponse.json({
      success: true,
      applicationId,
      message: "Your loan application has been submitted successfully",
      applicantName: fullName,
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error processing loan application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
