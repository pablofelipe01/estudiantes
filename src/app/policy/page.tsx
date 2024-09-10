// File: app/terms/privacy-policy/page.tsx

import React from 'react';
import Link from 'next/link';
import BackButton from '../../../components/BackButton';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      <div className="max-w-3xl mx-auto bg-white shadow-md bg-opacity-60 rounded-lg p-8">
      <BackButton />
      <br />
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Privacy Policy</h1>
        <p className="mb-4">Last updated: September 2024</p>
        <p className="mb-4">
          This Privacy Policy describes how Class Notes AI (we, us, or our) collects, uses, and protects your information when you use our voice recording transcription service.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
        <p className="mb-4">
          We collect only the information necessary to provide our service:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Authentication information through Clerk</li>
          <li>Your email address for sending transcription results</li>
          <li>Voice recordings that you submit for transcription</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use your information solely for the purpose of providing our transcription service. We do not use cookies or collect user data for any other purpose.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Data Protection</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at consulta@toksol.io.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at consulta@toksol.io.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;