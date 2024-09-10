// File: app/terms/page.tsx

import React from 'react';
import Link from 'next/link';
import BackButton from '../../../components/BackButton';


const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
      <BackButton />
      <br />
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Terms and Conditions</h1>
        <p className="mb-4">Last updated: September 2024</p>
        <p className="mb-4">
          Please read these Terms and Conditions carefully before using the Class Notes AI service operated by Toksol.io.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not use our service.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Description of Service</h2>
        <p className="mb-4">
          Class Notes AI provides a voice recording transcription service. Users can purchase credits and spend them on transcribing voice recordings.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Accounts</h2>
        <p className="mb-4">
          You must create an account to use our service. You are responsible for maintaining the confidentiality of your account and password.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Credits</h2>
        <p className="mb-4">
          Our service operates on a credit system. Credits must be purchased to use the transcription service. Unused credits are non-refundable.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. User Content</h2>
        <p className="mb-4">
          You retain all rights to your voice recordings. By using our service, you grant us the right to process your recordings for the purpose of transcription.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Limitation of Liability</h2>
        <p className="mb-4">
          We are not liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our service.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. We will notify users of any significant changes.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by the laws of Colombia and USA, without regard to its conflict of law provisions.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at consulta@toksol.io.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;