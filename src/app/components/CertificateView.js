"use client";

import { useState, useEffect } from "react";
import { generateCertificateDataUrl } from "@/lib/certificate";

export default function CertificateView({ name = "Test Name" }) {
  const [certificateUrl, setCertificateUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const generate = async () => {
      try {
        const url = await generateCertificateDataUrl(name);
        if (isMounted) {
          setCertificateUrl(url);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.toString());
        }
      }
    };

    if (name) {
      generate();
    }

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (error) {
    return (
      <div className="z-10 flex w-full max-w-md flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-red-500 md:text-4xl">
          Error Generating Certificate
        </h1>
        <p className="mb-8 text-lg text-gray-300">{error}</p>
      </div>
    );
  }

  if (!certificateUrl) {
    return (
      <div className="z-10 flex w-full max-w-md flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Generating your certificate...
        </h1>
        <p className="mb-8 text-lg text-gray-300">Please wait a moment.</p>
      </div>
    );
  }

  return (
    <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        Your Certificate
      </h1>
      <img
        src={certificateUrl}
        alt="Certificate of Participation"
        className="rounded-lg border-2 border-brand-primary shadow-lg"
      />
    </div>
  );
}
