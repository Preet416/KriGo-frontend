"use client";

import React, { Suspense } from "react";
import PaymentPageClient from "./PaymentPageClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading payment form…</p>}>
      <PaymentPageClient />
    </Suspense>
  );
}
