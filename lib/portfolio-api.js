const DEFAULT_API_BASE_URL = "http://localhost:4000";

export function getPortfolioApiBaseUrl() {
  return process.env.PORTFOLIO_API_BASE_URL || DEFAULT_API_BASE_URL;
}

export async function fetchPortfolioContent() {
  try {
    const response = await fetch(`${getPortfolioApiBaseUrl()}/api/content`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch {
    return [];
  }
}