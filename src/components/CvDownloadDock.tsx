type CvLanguage = "vi" | "en";

const dockStyles = `
  .cv-download-dock {
    position: fixed;
    right: 18px;
    bottom: 18px;
    z-index: 9999;
    max-width: min(320px, calc(100vw - 28px));
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cv-download-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0 16px;
    border-radius: 999px;
    border: 1px solid rgba(16, 30, 44, 0.14);
    background: rgba(18, 38, 58, 0.96);
    color: #ffffff;
    font: 700 14px/1.1 Arial, Helvetica, sans-serif;
    letter-spacing: 0.02em;
    text-decoration: none;
    box-shadow: 0 16px 36px rgba(12, 24, 37, 0.18);
    backdrop-filter: blur(10px);
  }

  .cv-download-note {
    margin: 0;
    padding: 10px 12px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.94);
    color: #203245;
    font: 400 12px/1.45 Arial, Helvetica, sans-serif;
    box-shadow: 0 12px 28px rgba(12, 24, 37, 0.12);
  }

  @media (max-width: 640px) {
    .cv-download-dock {
      right: 12px;
      left: 12px;
      bottom: 12px;
      max-width: none;
    }

    .cv-download-link {
      width: 100%;
    }
  }

  @media print {
    .cv-download-dock {
      display: none !important;
    }
  }
`;

const pdfByLanguage: Record<CvLanguage, string> = {
  vi: "/downloads/nguyen-chi-thanh-cv-vi-ats.pdf",
  en: "/downloads/nguyen-chi-thanh-cv-en-ats.pdf",
};

const fileNameByLanguage: Record<CvLanguage, string> = {
  vi: "nguyen-chi-thanh-cv-vi-ats.pdf",
  en: "nguyen-chi-thanh-cv-en-ats.pdf",
};

const copyByLanguage: Record<
  CvLanguage,
  { label: string; note: string }
> = {
  vi: {
    label: "Tai PDF ATS",
    note: "File PDF co dinh da verify ATS. Khong can dung Ctrl+P.",
  },
  en: {
    label: "Download ATS PDF",
    note: "Pre-generated ATS-verified PDF. No manual print setup needed.",
  },
};

interface CvDownloadDockProps {
  language: CvLanguage;
}

export function CvDownloadDock({ language }: CvDownloadDockProps) {
  if (new URLSearchParams(window.location.search).get("print") === "1") {
    return null;
  }

  const copy = copyByLanguage[language];

  return (
    <>
      <style>{dockStyles}</style>
      <div className="cv-download-dock">
        <a
          className="cv-download-link"
          href={pdfByLanguage[language]}
          download={fileNameByLanguage[language]}
        >
          {copy.label}
        </a>
        <p className="cv-download-note">{copy.note}</p>
      </div>
    </>
  );
}
