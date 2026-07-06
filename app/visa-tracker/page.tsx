"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"

const countries = [
  {
    name: "United States",
    flag: "🇺🇸",
    visaTypes: ["H-2A Agricultural", "H-2B Non-Agricultural", "EB-3 Skilled Worker"],
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    visaTypes: ["Temporary Foreign Worker", "Express Entry", "Provincial Nominee"],
  },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    visaTypes: ["Employment Visa", "Freelance Visa"],
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    visaTypes: ["Work Visa", "Iqama"],
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    visaTypes: ["Employment Pass", "S Pass", "Work Permit"],
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    visaTypes: ["Specified Skilled Worker", "Technical Intern Training"],
  },
]

const steps = [
  { id: 1, label: "Job Offer Received" },
  { id: 2, label: "Documents Submitted to Agency" },
  { id: 3, label: "POEA Processing" },
  { id: 4, label: "Medical Clearance" },
  { id: 5, label: "Visa Application Submitted" },
  { id: 6, label: "Visa Approved" },
  { id: 7, label: "Pre-Departure Orientation (PDOS)" },
  { id: 8, label: "Ready to Depart" },
]

const documents: Record<string, string[]> = {
  "United States": [
    "Valid Philippine Passport (6 months validity)",
    "NBI Clearance",
    "Birth Certificate (PSA)",
    "Medical Certificate from DOH-accredited clinic",
    "POEA-approved Employment Contract",
    "TESDA Certificate (if applicable)",
    "SSS / PhilHealth / Pag-IBIG records",
  ],
  "Canada": [
    "Valid Philippine Passport",
    "NBI Clearance",
    "Birth Certificate (PSA)",
    "Medical Exam from IRCC-designated physician",
    "LMIA-backed Employment Contract",
    "Educational credentials (translated)",
    "Bank statements",
  ],
  "United Arab Emirates": [
    "Valid Philippine Passport",
    "NBI Clearance",
    "Birth Certificate (PSA)",
    "Medical Certificate",
    "POEA-approved Employment Contract",
    "Trade Test Certificate (if applicable)",
  ],
  "Saudi Arabia": [
    "Valid Philippine Passport",
    "NBI Clearance",
    "Birth Certificate (PSA)",
    "Medical Certificate from Saudi-accredited clinic",
    "POEA-approved Employment Contract",
    "Barangay Clearance",
  ],
  "Singapore": [
    "Valid Philippine Passport",
    "NBI Clearance",
    "Birth Certificate (PSA)",
    "Educational certificates",
    "Employment Contract",
    "Medical Certificate",
  ],
  "Japan": [
    "Valid Philippine Passport",
    "NBI Clearance",
    "Birth Certificate (PSA)",
    "Skills evaluation certificate",
    "Japanese language proficiency certificate",
    "Employment Contract",
    "Medical Certificate",
  ],
}

export default function VisaTrackerPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-blue-700 px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">Visa & Application Tracker</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">Track your overseas job application, know what documents you need, and follow your visa process step by step.</p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Country selector */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select your destination country</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {countries.map((c) => (
              <button
                key={c.name}
                onClick={() => { setSelectedCountry(c.name); setCurrentStep(1) }}
                className={`rounded-xl p-3 text-center transition-all border ${selectedCountry === c.name ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-white hover:border-blue-300"}`}
              >
                <span className="text-2xl block mb-1">{c.flag}</span>
                <span className="text-xs text-gray-700 font-medium">{c.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedCountry && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Application tracker */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-5">Application Progress</h3>
              <div className="space-y-3">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${currentStep >= step.id ? "bg-blue-50" : "bg-gray-50"}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${currentStep > step.id ? "bg-green-500 text-white" : currentStep === step.id ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-500"}`}>
                      {currentStep > step.id ? "✓" : step.id}
                    </div>
                    <span className={`text-sm ${currentStep >= step.id ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                      {step.label}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">Click a step to mark your current progress</p>
            </div>

            {/* Document checklist */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Documents Needed</h3>
              <p className="text-xs text-gray-500 mb-5">For working in {selectedCountry}</p>
              <div className="space-y-3">
                {(documents[selectedCountry] ?? []).map((doc, i) => (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-0.5 rounded shrink-0" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-2">Need help with documents or visa?</p>
                <a href="/lawyers" className="block w-full bg-blue-700 text-white text-center text-sm font-semibold py-3 rounded-lg hover:bg-blue-800">
                  Find an Immigration Lawyer
                </a>
              </div>
            </div>

          </div>
        )}

        {!selectedCountry && (
          <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
            <p className="text-gray-400">Select a country above to see your document checklist and track your application.</p>
          </div>
        )}
      </div>
    </main>
  )
}