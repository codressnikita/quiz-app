"use client";

import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

export default function CertificateView({ name }) {
  const certificateUrl = `https://example.com/certificate?name=${encodeURIComponent(
    name
  )}`;

  return (
    <div className="z-10 flex w-full max-w-md flex-col items-center justify-center p-4 text-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="mb-8"
      />
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        Scan to Download Your Certificate
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Congratulations, {name}! Use your phone&apos;s camera to scan the QR
        code below and download your personalized certificate.
      </p>
      <div className="rounded-lg bg-white p-4">
        <QRCodeSVG value={certificateUrl} size={256} />
      </div>
    </div>
  );
}
