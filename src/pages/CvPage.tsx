import { useEffect } from "react";
import classicCvTemplateVi from "../../template/cv.html?raw";
import classicCvTemplateEn from "../../template/cv-en.html?raw";
import { CvDownloadDock } from "../components/CvDownloadDock";
import { parseTemplateHtml } from "../lib/templateHtml";

type CvLanguage = "vi" | "en";

interface CvPageProps {
  language: CvLanguage;
}

const classicCvTemplates = {
  vi: parseTemplateHtml(classicCvTemplateVi),
  en: parseTemplateHtml(classicCvTemplateEn),
} as const;

export function CvPage({ language }: CvPageProps) {
  const template = classicCvTemplates[language];

  useEffect(() => {
    document.title = template.title;
  }, [template.title]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") === "1") {
      const timeoutId = window.setTimeout(() => {
        window.print();
      }, 250);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <>
      <style>{template.styles}</style>
      <CvDownloadDock language={language} />
      <div dangerouslySetInnerHTML={{ __html: template.body }} />
    </>
  );
}
