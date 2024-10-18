import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { ScanConfig } from '../types';

interface ScanConfigurationProps {
  onStartScan: (config: ScanConfig) => void;
}

const ScanConfiguration: React.FC<ScanConfigurationProps> = ({ onStartScan }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [depth, setDepth] = useState(4);
  const [vulnerabilities, setVulnerabilities] = useState<string[]>([]);
  const [skipVulnerabilities, setSkipVulnerabilities] = useState<string[]>([]);
  const [realTimeAdjustment, setRealTimeAdjustment] = useState(true);
  const [learningMode, setLearningMode] = useState(true);
  const [reportFormat, setReportFormat] = useState<'PDF' | 'HTML'>('PDF');
  const [notificationEmail, setNotificationEmail] = useState('');
  const [notifyOnDetection, setNotifyOnDetection] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartScan({
      targetUrl,
      depth,
      vulnerabilities,
      skipVulnerabilities,
      realTimeAdjustment,
      learningMode,
      reportFormat,
      notificationEmail,
      notifyOnDetection
    });
  };

  const handleVulnerabilityChange = (category: string, isSkip: boolean) => {
    const setter = isSkip ? setSkipVulnerabilities : setVulnerabilities;
    setter(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const vulnerabilityCategories = [
    'SQL Injection', 'XSS', 'CSRF', 'Broken Authentication', 
    'Sensitive Data Exposure', 'XXE', 'Broken Access Control', 
    'Security Misconfiguration', 'Insecure Deserialization', 
    'Using Components with Known Vulnerabilities',
    'Insufficient Logging & Monitoring'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">AI-Driven Scan Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700">
            Target URL
          </label>
          <input
            type="url"
            id="targetUrl"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="depth" className="block text-sm font-medium text-gray-700">
            Scan Depth
          </label>
          <input
            type="number"
            id="depth"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            min="1"
            max="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Vulnerabilities to Scan
          </span>
          {vulnerabilityCategories.map((category) => (
            <label key={category} className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                value={category}
                checked={vulnerabilities.includes(category)}
                onChange={() => handleVulnerabilityChange(category, false)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Vulnerabilities to Skip
          </span>
          {vulnerabilityCategories.map((category) => (
            <label key={`skip-${category}`} className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                value={category}
                checked={skipVulnerabilities.includes(category)}
                onChange={() => handleVulnerabilityChange(category, true)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={realTimeAdjustment}
              onChange={(e) => setRealTimeAdjustment(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Enable Real-Time Adjustment</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={learningMode}
              onChange={(e) => setLearningMode(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Enable Learning Mode</span>
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="reportFormat" className="block text-sm font-medium text-gray-700">
            Report Format
          </label>
          <select
            id="reportFormat"
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value as 'PDF' | 'HTML')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="PDF">PDF</option>
            <option value="HTML">HTML</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="notificationEmail" className="block text-sm font-medium text-gray-700">
            Notification Email
          </label>
          <input
            type="email"
            id="notificationEmail"
            value={notificationEmail}
            onChange={(e) => setNotificationEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={notifyOnDetection}
              onChange={(e) => setNotifyOnDetection(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Notify on Bug Detection</span>
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Play className="mr-2 h-4 w-4" />
          Start AI-Driven Scan
        </button>
      </form>
    </div>
  );
};

export default ScanConfiguration;