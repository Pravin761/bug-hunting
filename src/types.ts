import React from 'react';

export interface Vulnerability {
  id: string;
  name: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  category: string;
  remediation: string;
  affectedUrl: string;
  affectedElement: string;
  httpMethod: string;
}

export interface ScanResult {
  id: string;
  targetUrl: string;
  startTime: string;
  endTime: string;
  vulnerabilities: Vulnerability[];
  totalVulnerabilities: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
}

export interface ScanConfig {
  targetUrl: string;
  depth: number;
  vulnerabilities: string[];
  skipVulnerabilities: string[];
  realTimeAdjustment: boolean;
  learningMode: boolean;
  reportFormat: 'PDF' | 'HTML';
  notificationEmail: string;
  notifyOnDetection: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Tester' | 'Viewer';
}