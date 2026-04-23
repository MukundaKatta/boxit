"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const CATEGORIES = [
  "Meals",
  "Transport",
  "Office Supplies",
  "Software",
  "Groceries",
  "Utilities",
  "Other",
];

interface LineItem {
  description: string;
  amount: number;
  category: string;
}

const MOCKED_ITEMS: LineItem[] = [
  { description: "Coffee & Croissant", amount: 12.5, category: "Meals" },
  { description: "Organic Milk (2L)", amount: 4.99, category: "Groceries" },
  { description: "Printer Paper (500 sheets)", amount: 15.99, category: "Office Supplies" },
];

export default function TryPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [items, setItems] = useState<LineItem[]>(MOCKED_ITEMS.map((i) => ({ ...i })));
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setItems(MOCKED_ITEMS.map((i) => ({ ...i })));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function setCategory(index: number, category: string) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, category } : item)));
  }

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
          Boxit
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
            Receipt scanner
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Drop a receipt. See it sorted.
          </h1>
        </div>

        {/* Upload area */}
        <div
          className="relative rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 text-center transition hover:border-amber-400 hover:bg-amber-50 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Uploaded receipt"
              className="mx-auto max-h-64 rounded-xl object-contain"
            />
          ) : (
            <div className="py-6">
              <div className="text-4xl">🧾</div>
              <p className="mt-3 text-sm font-medium text-neutral-700">
                Click or drag a receipt image here
              </p>
              <p className="mt-1 text-xs text-neutral-400">PNG, JPG, WEBP — stored locally only</p>
            </div>
          )}
        </div>

        {/* Line items */}
        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-baseline justify-between px-5 pt-5 pb-4 border-b border-neutral-100">
            <p className="text-sm font-semibold text-neutral-700">Extracted line items</p>
            <p className="text-xs text-neutral-400">
              {imageUrl ? "Mocked — OCR coming soon" : "Upload a receipt to see extraction"}
            </p>
          </div>

          <div className="divide-y divide-neutral-100">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {item.description}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    ${item.amount.toFixed(2)}
                  </p>
                </div>
                <select
                  value={item.category}
                  onChange={(e) => setCategory(i, e.target.value)}
                  className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 shrink-0"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-200 bg-neutral-50">
            <p className="text-sm font-semibold text-neutral-700">Total</p>
            <p className="text-sm font-bold text-neutral-900">${total.toFixed(2)}</p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview — no OCR, no server.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the real thing.
        </p>
      </div>
    </div>
  );
}
