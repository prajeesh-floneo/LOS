"use client";

import { useState, useEffect } from "react";
import { LoanApplicationResult } from "@/types/loan";

interface ApplicationWithMetadata extends LoanApplicationResult {
  applicationId: string;
  submittedAt: Date;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<ApplicationWithMetadata[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] =
    useState<ApplicationWithMetadata | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/applications");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-gray-900 rounded-t-2xl shadow-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Loan Application Dashboard
              </h1>
              <p className="text-gray-300">
                Banker/Administrator View - All Submitted Applications
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-gray-300">Total Applications</p>
              <p className="text-3xl font-bold">{applications.length}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                Loading applications...
              </span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800">{error}</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No applications yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Applications will appear here once users submit them.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.applicationId}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedApp(app)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {app.userDetails.fullName}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            app.eligibility.isEligible
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.eligibility.isEligible
                            ? "ELIGIBLE"
                            : "NOT ELIGIBLE"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Application ID</p>
                          <p className="font-mono font-semibold text-gray-900">
                            {app.applicationId}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Age</p>
                          <p className="font-semibold text-gray-900">
                            {app.userDetails.age} years
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Employment</p>
                          <p className="font-semibold text-gray-900 capitalize">
                            {app.userDetails.employmentType}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Annual Income</p>
                          <p className="font-semibold text-gray-900">
                            ${app.userDetails.annualIncome.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for viewing full application details */}
      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}

// Application Detail Modal Component
function ApplicationDetailModal({
  application,
  onClose,
}: {
  application: ApplicationWithMetadata;
  onClose: () => void;
}) {
  const app = application;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">Application Details</h2>
            <p className="text-blue-100 text-sm">
              Reference: {app.applicationId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard label="Full Name" value={app.userDetails.fullName} />
              <InfoCard label="Age" value={`${app.userDetails.age} years`} />
              <InfoCard
                label="Date of Birth"
                value={new Date(
                  app.userDetails.dateOfBirth
                ).toLocaleDateString()}
              />
              <InfoCard
                label="Gender"
                value={app.userDetails.gender.replace("-", " ")}
                capitalize
              />
              <InfoCard
                label="Marital Status"
                value={app.userDetails.maritalStatus}
                capitalize
              />
              <InfoCard label="Phone" value={app.userDetails.phoneNumber} />
              <InfoCard
                label="Email"
                value={app.userDetails.email}
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Professional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard
                label="Employment Type"
                value={app.userDetails.employmentType}
                capitalize
              />
              <InfoCard
                label="Annual Income"
                value={`$${app.userDetails.annualIncome.toLocaleString()}`}
              />
              {app.userDetails.requestedLoanType && (
                <InfoCard
                  label="Requested Loan Type"
                  value={`${app.userDetails.requestedLoanType} Loan`}
                  capitalize
                />
              )}
              {app.userDetails.expectedLoanAmount && (
                <InfoCard
                  label="Expected Amount"
                  value={`$${app.userDetails.expectedLoanAmount.toLocaleString()}`}
                />
              )}
              {app.userDetails.preferredTenure && (
                <InfoCard
                  label="Preferred Tenure"
                  value={`${app.userDetails.preferredTenure} Years`}
                />
              )}
            </div>
          </div>

          {/* Eligibility Status */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Eligibility Assessment
            </h3>
            <div
              className={`p-6 rounded-xl border-2 ${
                app.eligibility.isEligible
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              <div className="flex items-center mb-4">
                <span
                  className={`text-2xl font-bold ${
                    app.eligibility.isEligible
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {app.eligibility.isEligible ? "✓ ELIGIBLE" : "✗ NOT ELIGIBLE"}
                </span>
              </div>
              {app.eligibility.isEligible ? (
                <div>
                  <p className="text-gray-700 mb-2">Eligible for:</p>
                  <div className="flex flex-wrap gap-2">
                    {app.eligibility.eligibleLoanTypes.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold capitalize"
                      >
                        {type} Loan
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-red-700 font-medium">
                  {app.ineligibilityReason}
                </p>
              )}
            </div>
          </div>

          {/* Loan Quotes */}
          {app.quotes.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Loan Quotes ({app.quotes.length})
              </h3>
              <div className="space-y-4">
                {app.quotes.map((quote) => (
                  <div
                    key={quote.loanType}
                    className="border-2 border-indigo-200 rounded-xl p-6 bg-gradient-to-br from-white to-indigo-50"
                  >
                    <h4 className="text-lg font-bold text-indigo-900 mb-4 capitalize">
                      {quote.loanType} Loan
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Loan Amount
                        </p>
                        <p className="text-xl font-bold text-green-600">
                          ${quote.eligibleAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Monthly Payment
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          ${quote.monthlyPayment.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Interest Rate
                        </p>
                        <p className="text-xl font-bold text-purple-600">
                          {quote.interestRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tenure</p>
                        <p className="text-xl font-bold text-orange-600">
                          {quote.tenureYears} years
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying information cards
function InfoCard({
  label,
  value,
  capitalize = false,
  className = "",
}: {
  label: string;
  value: string;
  capitalize?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-50 p-4 rounded-lg border border-gray-200 ${className}`}
    >
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p
        className={`font-semibold text-gray-900 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
