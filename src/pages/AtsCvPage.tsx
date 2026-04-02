import { useEffect } from "react";
import atsCvTemplateVi from "../../template/cv-ats.html?raw";
import atsCvTemplateEn from "../../template/cv-ats-en.html?raw";
import { CvDownloadDock } from "../components/CvDownloadDock";
import { parseTemplateHtml } from "../lib/templateHtml";

type CvLanguage = "vi" | "en";

interface AtsCvPageProps {
  language: CvLanguage;
}

const atsCvTemplates = {
  vi: parseTemplateHtml(atsCvTemplateVi),
  en: parseTemplateHtml(atsCvTemplateEn),
} as const;

export function AtsCvPage({ language }: AtsCvPageProps) {
  const template = atsCvTemplates[language];

  useEffect(() => {
    document.title = template.title;

    if (new URLSearchParams(window.location.search).get("print") !== "1") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      window.print();
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [template.title]);

  return (
    <>
      <style>{template.styles}</style>
      <CvDownloadDock language={language} />
      <div dangerouslySetInnerHTML={{ __html: template.body }} />
    </>
  );
}
