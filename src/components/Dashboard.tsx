import React, { useState } from 'react';
import { Activity, AlertTriangle, BarChart2 } from 'lucide-react';
import ScanConfiguration from './ScanConfiguration';
import VulnerabilityReport from './VulnerabilityReport';
import { ScanResult, ScanConfig, Vulnerability } from '../types';

const Dashboard: React.FC = () => {
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [activeScan, setActiveScan] = useState<ScanConfig | null>(null);

  const handleStartScan = (config: ScanConfig) => {
    setActiveScan(config);
    // Simulating an AI-driven scan process
    setTimeout(() => {
      const vulnerabilities: Vulnerability[] = [
        {
          id: '1',
          name: 'SQL Injection',
          description: 'Potential SQL injection vulnerability detected in login form',
          severity: 'High',
          category: 'SQL Injection',
          remediation: 'Use prepared statements or ORM libraries to handle user inputs safely',
          affectedUrl: `${config.targetUrl}/login.php`,
          affectedElement: 'Input field "username"',
          httpMethod: 'POST',
        },
        {
          id: '2',
          name: 'Cross-Site Scripting (XSS)',
          description: 'Reflected XSS vulnerability found in search functionality',
          severity: 'Medium',
          category: 'XSS',
          remediation: 'Implement proper input validation and output encoding',
          affectedUrl: `${config.targetUrl}/search.php`,
          affectedElement: 'Search input field',
          httpMethod: 'GET',
        },
        {
          id: '3',
          name: 'Sensitive Data Exposure',
          description: 'Unencrypted transmission of user credentials',
          severity: 'Critical',
          category: 'Sensitive Data Exposure',
          remediation: 'Implement HTTPS and ensure sensitive data is encrypted during transit',
          affectedUrl: `${config.targetUrl}/login.php`,
          affectedElement: 'Login form',
          httpMethod: 'POST',
        },
      ].filter(v => config.vulnerabilities.includes(v.category) && !config.skipVulnerabilities.includes(v.category));

      const newScanResult: ScanResult = {
        id: Date.now().toString(),
        targetUrl: config.targetUrl,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60000).toISOString(),
        vulnerabilities,
        totalVulnerabilities: vulnerabilities.length,
        criticalCount: vulnerabilities.filter(v => v.severity === 'Critical').length,
        highCount: vulnerabilities.filter(v => v.severity === 'High').length,
        mediumCount: vulnerabilities.filter(v => v.severity === 'Medium').length,
        lowCount: vulnerabilities.filter(v => v.severity === 'Low').length,
      };
      setScanResults([newScanResult, ...scanResults]);
      setActiveScan(null);

      // Simulating notification
      if (config.notifyOnDetection && config.notificationEmail) {
        console.log(`Notification sent to ${config.notificationEmail}`);
        // In a real application, you would implement actual email notification here
      }
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI-Driven Penetration Testing Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Activity className="text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Active Scans</h2>
          </div>
          <p className="text-3xl font-bold">{activeScan ? 1 : 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" />
            <h2 className="text-xl font-semibold">Total Vulnerabilities</h2>
          </div>
          <p className="text-3xl font-bold">
            {scanResults.reduce(
              (total, scan) => total + scan.totalVulnerabilities,
              0
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BarChart2 className="text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">Completed Scans</h2>
          </div>
          <p className="text-3xl font-bold">{scanResults.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold">Critical Vulnerabilities</h2>
          </div>
          <p className="text-3xl font-bold">
            {scanResults.reduce(
              (total, scan) => total + scan.criticalCount,
              0
            )}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ScanConfiguration onStartScan={handleStartScan} />
        <VulnerabilityReport scanResults={scanResults} />
      </div>
    </div>
  );
};

export default Dashboard;