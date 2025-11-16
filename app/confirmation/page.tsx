"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id");
  const applicantName = searchParams.get("name");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-4">
                <svg
                  className="w-16 h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Application Submitted Successfully!
            </h1>
            <p className="text-green-100 text-lg">
              Thank you for applying with us
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                What happens next?
              </h2>
              <p className="text-gray-600 mb-6">
                Dear <strong>{applicantName || "Applicant"}</strong>, your loan
                application has been received and is currently being reviewed by
                our team.
              </p>

              {/* Application Details */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-2"
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
                  <h3 className="text-lg font-bold text-gray-800">
                    Application Reference
                  </h3>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="text-sm text-gray-600 mb-1">
                    Reference Number
                  </p>
                  <p className="text-2xl font-bold text-blue-600 font-mono">
                    {applicationId || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Please save this reference number for future correspondence
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Next Steps:
                </h3>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-4">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Application Review
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Our team will review your application within 24-48 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Document Verification
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We may contact you for additional documents or information
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-100 rounded-full p-2 mr-4">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Final Decision
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You will receive an email with the final decision and next
                      steps
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 text-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

