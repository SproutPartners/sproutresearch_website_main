'use client';

import { useEffect, useState } from 'react';
import { clientAuth } from '@/lib/adminauth';

const EMPTY_STATE = {
  monthEnding: '',
  impersonationComplaints: '0',
  summaryRows: [],
  monthlyTrend: [],
  annualTrend: [],
};

function updateArrayItem(items, index, key, value) {
  return items.map((item, currentIndex) => (currentIndex === index ? { ...item, [key]: value } : item));
}

function appendRow(items, template) {
  const nextSrNo = items.length + 1;
  return [...items, { ...template, srNo: String(nextSrNo) }];
}

function removeRow(items, index) {
  return items.filter((_, currentIndex) => currentIndex !== index).map((item, i) => ({ ...item, srNo: String(i + 1) }));
}

export default function GrievanceReportAdmin() {
  const [data, setData] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const sessionToken = clientAuth.getSession();
        const response = await fetch('/admin/api/grievance-report', {
          headers: {
            'Content-Type': 'application/json',
            'x-admin-session': sessionToken || '',
          },
        });
        const result = await response.json();

        if (!active) return;

        if (response.ok && result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Unable to load grievance report data.');
        }
      } catch (loadError) {
        if (active) {
          setError('Unable to load grievance report data.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const sessionToken = clientAuth.getSession();
      const response = await fetch('/admin/api/grievance-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionToken,
          data,
        }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setData(result.data);
        setMessage('Grievance report data saved successfully.');
      } else {
        setError(result.error || 'Unable to save grievance report data.');
      }
    } catch (saveError) {
      setError('Unable to save grievance report data.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-sm text-gray-600">Loading grievance report data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Investor Grievance Report</h2>
        <p className="mb-4 text-sm text-gray-600">
          Update the month ending label and report tables here. The public <code>/Report</code> page will use this
          saved data.
        </p>

        {message ? (
          <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">{message}</div>
        ) : null}
        {error ? (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Month Ending</label>
            <input
              type="text"
              value={data.monthEnding}
              onChange={(event) => setData((current) => ({ ...current, monthEnding: event.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2"
              placeholder="e.g. June 2026"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Impersonation Complaints</label>
            <input
              type="text"
              value={data.impersonationComplaints}
              onChange={(event) =>
                setData((current) => ({ ...current, impersonationComplaints: event.target.value }))
              }
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Current Month Summary Table</h3>
        <div className="space-y-4">
          {data.summaryRows.map((row, index) => (
            <div key={row.srNo || index} className="rounded border border-gray-200 p-4">
              <div className="mb-3 text-sm font-semibold text-gray-900">
                Row {row.srNo}: {row.source}
              </div>
              <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
                {[
                  ['pendingLastMonth', 'Pending last month'],
                  ['received', 'Received'],
                  ['resolved', 'Resolved'],
                  ['totalPending', 'Total pending'],
                  ['pendingOver3Months', 'Pending > 3 months'],
                  ['avgResolutionDays', 'Avg. resolution days'],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
                    <input
                      type="text"
                      value={row[key]}
                      onChange={(event) =>
                        setData((current) => ({
                          ...current,
                          summaryRows: updateArrayItem(current.summaryRows, index, key, event.target.value),
                        }))
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Monthly Disposal Trend</h3>
        <div className="space-y-3">
          {data.monthlyTrend.map((row, index) => (
            <div key={row.srNo || index} className="flex items-start gap-2">
              <div className="grid flex-1 gap-3 rounded border border-gray-200 p-3 md:grid-cols-5">
                {[
                  ['month', 'Month'],
                  ['carriedForward', 'Carried forward'],
                  ['received', 'Received'],
                  ['resolved', 'Resolved'],
                  ['pending', 'Pending'],
                ].map(([key, label]) => (
                  <input
                    key={key}
                    type="text"
                    aria-label={`${label} for ${row.month || `row ${index + 1}`}`}
                    value={row[key]}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        monthlyTrend: updateArrayItem(current.monthlyTrend, index, key, event.target.value),
                      }))
                    }
                    className="rounded border border-gray-300 px-3 py-2"
                    placeholder={label}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setData((current) => ({
                    ...current,
                    monthlyTrend: removeRow(current.monthlyTrend, index),
                  }))
                }
                className="rounded border border-red-300 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                aria-label={`Remove ${row.month || `row ${index + 1}`}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setData((current) => ({
              ...current,
              monthlyTrend: appendRow(current.monthlyTrend, {
                month: '',
                carriedForward: '0',
                received: '0',
                resolved: '0',
                pending: '0',
              }),
            }))
          }
          className="mt-4 rounded border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
        >
          + Add Month
        </button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Annual Disposal Trend</h3>
        <div className="space-y-3">
          {data.annualTrend.map((row, index) => (
            <div key={row.srNo || index} className="flex items-start gap-2">
              <div className="grid flex-1 gap-3 rounded border border-gray-200 p-3 md:grid-cols-5">
                {[
                  ['year', 'Year'],
                  ['carriedForward', 'Carried forward'],
                  ['received', 'Received'],
                  ['resolved', 'Resolved'],
                  ['pending', 'Pending'],
                ].map(([key, label]) => (
                  <input
                    key={key}
                    type="text"
                    aria-label={`${label} for ${row.year || `row ${index + 1}`}`}
                    value={row[key]}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        annualTrend: updateArrayItem(current.annualTrend, index, key, event.target.value),
                      }))
                    }
                    className="rounded border border-gray-300 px-3 py-2"
                    placeholder={label}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setData((current) => ({
                    ...current,
                    annualTrend: removeRow(current.annualTrend, index),
                  }))
                }
                className="rounded border border-red-300 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                aria-label={`Remove ${row.year || `row ${index + 1}`}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setData((current) => ({
              ...current,
              annualTrend: appendRow(current.annualTrend, {
                year: '',
                carriedForward: '0',
                received: '0',
                resolved: '0',
                pending: '0',
              }),
            }))
          }
          className="mt-4 rounded border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
        >
          + Add Year
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {saving ? 'Saving...' : 'Save Grievance Report'}
        </button>
      </div>
    </form>
  );
}
