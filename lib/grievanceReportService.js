import { adminDb } from '@/lib/firebaseAdmin';
import { cloneDefaultGrievanceReport } from '@/lib/grievanceReportDefaults';

const COLLECTION_NAME = 'grievanceReports';
const DOCUMENT_ID = 'current';
const READ_TIMEOUT_MS = 1500;
const WRITE_TIMEOUT_MS = 3000;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeRow(row, fallback, keys) {
  const next = { ...fallback };
  for (const key of keys) {
    next[key] = row?.[key] != null ? String(row[key]) : fallback[key];
  }
  return next;
}

const ROW_TEMPLATES = {
  summary: {
    srNo: '',
    source: '',
    pendingLastMonth: '0',
    received: '0',
    resolved: '0',
    totalPending: '0',
    pendingOver3Months: '0',
    avgResolutionDays: '0',
  },
  monthly: { srNo: '', month: '', carriedForward: '0', received: '0', resolved: '0', pending: '0' },
  annual: { srNo: '', year: '', carriedForward: '0', received: '0', resolved: '0', pending: '0' },
};

// Unlike normalizeRow (which pins the row count to the fallback's fixed length),
// this preserves however many rows were actually saved — needed so admin-added
// months/years aren't dropped back down to the hardcoded default count.
function normalizeRows(rows, templateKey, fallbackRows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return fallbackRows;
  }
  const template = ROW_TEMPLATES[templateKey];
  return rows.map((row) => normalizeRow(row, template, Object.keys(template)));
}

function withTimeout(promise, timeoutMs, action) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${action} timed out after ${timeoutMs}ms`)), timeoutMs);
    }),
  ]);
}

export function normalizeGrievanceReportData(data) {
  const fallback = cloneDefaultGrievanceReport();
  const normalized = {
    monthEnding: data?.monthEnding ? String(data.monthEnding) : fallback.monthEnding,
    impersonationComplaints:
      data?.impersonationComplaints != null
        ? String(data.impersonationComplaints)
        : fallback.impersonationComplaints,
    summaryRows: normalizeRows(data?.summaryRows, 'summary', fallback.summaryRows),
    monthlyTrend: normalizeRows(data?.monthlyTrend, 'monthly', fallback.monthlyTrend),
    annualTrend: normalizeRows(data?.annualTrend, 'annual', fallback.annualTrend),
  };

  return normalized;
}

export async function getCurrentGrievanceReport() {
  const fallback = cloneDefaultGrievanceReport();

  if (!adminDb) {
    return fallback;
  }

  try {
    const snapshot = await withTimeout(
      adminDb.collection(COLLECTION_NAME).doc(DOCUMENT_ID).get(),
      READ_TIMEOUT_MS,
      'Loading grievance report data'
    );
    if (!snapshot.exists) {
      return fallback;
    }

    return normalizeGrievanceReportData(snapshot.data());
  } catch (error) {
    console.error('Failed to load grievance report data:', error);
    return fallback;
  }
}

export async function saveCurrentGrievanceReport(payload) {
  if (!adminDb) {
    throw new Error('Firebase admin configuration is unavailable.');
  }

  const normalized = normalizeGrievanceReportData(payload);

  await withTimeout(
    adminDb.collection(COLLECTION_NAME).doc(DOCUMENT_ID).set(
      {
        ...clone(normalized),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    ),
    WRITE_TIMEOUT_MS,
    'Saving grievance report data'
  );

  return normalized;
}
