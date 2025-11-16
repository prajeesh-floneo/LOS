import { LoanApplicationResult } from '@/types/loan';

// In-memory storage for loan applications
// In production, this would be replaced with a database
let applications: Map<string, LoanApplicationResult & { submittedAt: Date }> = new Map();

/**
 * Generate a unique application reference number
 */
export function generateApplicationId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `LN${timestamp}${random}`;
}

/**
 * Store a loan application
 */
export function storeApplication(
  applicationId: string,
  result: LoanApplicationResult
): void {
  applications.set(applicationId, {
    ...result,
    submittedAt: new Date(),
  });
}

/**
 * Get a specific application by ID
 */
export function getApplication(
  applicationId: string
): (LoanApplicationResult & { submittedAt: Date }) | undefined {
  return applications.get(applicationId);
}

/**
 * Get all applications
 */
export function getAllApplications(): Array<
  LoanApplicationResult & { submittedAt: Date; applicationId: string }
> {
  return Array.from(applications.entries()).map(([id, app]) => ({
    ...app,
    applicationId: id,
  }));
}

/**
 * Clear all applications (for testing purposes)
 */
export function clearAllApplications(): void {
  applications.clear();
}

