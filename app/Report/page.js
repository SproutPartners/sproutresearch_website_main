import Footer from '@/Components/FooterA11y';
import Header from '@/Components/Header';
import { cloneDefaultGrievanceReport } from '@/lib/grievanceReportDefaults';
import Image from 'next/image';

function ColumnTable({ columns, mobile = false, minWidth = '1000px' }) {
  const valuePaddingClass = mobile ? 'px-3 text-xs' : 'px-4 text-base';
  const headerTextClass = mobile ? 'text-sm' : '';
  const rowHeightClass = 'h-16';

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
      <div
        className="grid gap-0 items-stretch"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          minWidth: mobile ? minWidth : undefined,
        }}
      >
        {columns.map((column, columnIndex) => {
          const isFirst = columnIndex === 0;
          const isLast = columnIndex === columns.length - 1;

          return (
            <div key={column.header} className={`flex flex-col ${isFirst ? 'bg-blue-200 rounded-tl-xl' : ''}`}>
              <div
                className={`font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 ${mobile ? 'px-3' : 'px-4'} ${isLast ? 'rounded-tr-xl' : ''}`}
              >
                <span className={headerTextClass}>{column.header}</span>
              </div>
              <div className="flex-1 pt-4">
                {column.values.map((value, rowIndex) => (
                  <div
                    key={`${column.header}-${rowIndex}`}
                    className={`text-center py-3 text-gray-700 leading-relaxed ${valuePaddingClass} ${rowHeightClass} flex items-center justify-center ${column.valueClass || ''}`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  const report = cloneDefaultGrievanceReport();

  const summaryColumns = [
    { header: 'Sr No', values: report.summaryRows.map((row) => row.srNo), valueClass: 'font-medium' },
    { header: 'Received from', values: report.summaryRows.map((row) => row.source) },
    { header: 'Pending at the end of last month', values: report.summaryRows.map((row) => row.pendingLastMonth) },
    { header: 'Received', values: report.summaryRows.map((row) => row.received) },
    { header: 'Resolved', values: report.summaryRows.map((row) => row.resolved) },
    { header: 'Total Pending', values: report.summaryRows.map((row) => row.totalPending) },
    { header: 'Pending complaints > 3 months', values: report.summaryRows.map((row) => row.pendingOver3Months) },
    { header: 'Average Resolution time^ (in days)', values: report.summaryRows.map((row) => row.avgResolutionDays) },
  ];

  const monthlyColumns = [
    { header: 'Sr No', values: report.monthlyTrend.map((row) => row.srNo), valueClass: 'font-medium' },
    { header: 'Month', values: report.monthlyTrend.map((row) => row.month) },
    { header: 'Carried forward from previous month', values: report.monthlyTrend.map((row) => row.carriedForward) },
    { header: 'Received', values: report.monthlyTrend.map((row) => row.received) },
    { header: 'Resolved', values: report.monthlyTrend.map((row) => row.resolved) },
    { header: 'Pending', values: report.monthlyTrend.map((row) => row.pending) },
  ];

  const annualColumns = [
    { header: 'Sr No', values: report.annualTrend.map((row) => row.srNo), valueClass: 'font-medium' },
    { header: 'Year', values: report.annualTrend.map((row) => row.year) },
    { header: 'Carried forward from previous year', values: report.annualTrend.map((row) => row.carriedForward) },
    { header: 'Received', values: report.annualTrend.map((row) => row.received) },
    { header: 'Resolved', values: report.annualTrend.map((row) => row.resolved) },
    { header: 'Pending', values: report.annualTrend.map((row) => row.pending) },
  ];

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] xl:h-[60vh] overflow-hidden">
          <Image
            src="/images/pic5.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center z-0"
            priority
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-800 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 z-10">
            <div className="flex flex-col justify-center items-center mb-6 sm:mb-8 md:mb-7 lg:mb-7">
              <div className="text-2xl sm:text-2xl md:text-3xl lg:text-6xl font-sans mb-2 lg:mb-4 lg:whitespace-nowrap">
                <h1 className="leading-none">Investor Grievance Report</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 px-4 sm:px-8 lg:px-12 mt-16">
          <h2 className="text-xl md:text-5xl font-bold text-left text-gray-800 mb-8">
            Data for the month ending <br />
            {report.monthEnding}
          </h2>

          <div className="hidden md:block">
            <ColumnTable columns={summaryColumns} />
            <div className="animate-fade-in mt-10">
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  Number of complaints received during month against the RA due to impersonation by some other entity:{' '}
                  {report.impersonationComplaints}
                </li>
                <li>* Inclusive of complaints of previous months resolved in the current month.</li>
                <li># Inclusive of complaints pending as on the last day of the month.</li>
                <li>
                  ^ Average Resolution time is the sum total of time taken to resolve each complaint, in days, in the current month divided by total number of complaints resolved in the current month.
                </li>
              </ul>
            </div>
          </div>

          <div className="md:hidden">
            <ColumnTable columns={summaryColumns} mobile minWidth="1000px" />
          </div>
        </div>

        <div className="space-y-8 px-4 sm:px-8 lg:px-12 mt-8 lg:mt-10">
          <h2 className="text-xl md:text-5xl font-bold text-left text-gray-800 mb-8">
            Trend of monthly disposal of
            <br /> complaints
          </h2>

          <div className="hidden md:block">
            <ColumnTable columns={monthlyColumns} />
          </div>

          <div className="md:hidden">
            <ColumnTable columns={monthlyColumns} mobile minWidth="800px" />
          </div>
        </div>

        <div className="space-y-8 px-4 sm:px-8 lg:px-12 mt-5 mb-8 md:mb-20">
          <h2 className="text-xl md:text-5xl font-bold text-left text-gray-800 mb-8 ">
            Trend of annual disposal of
            <br /> complaints
          </h2>

          <div className="hidden md:block">
            <ColumnTable columns={annualColumns} />
          </div>

          <div className="md:hidden">
            <ColumnTable columns={annualColumns} mobile minWidth="1000px" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
