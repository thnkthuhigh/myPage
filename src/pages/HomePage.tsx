import { type FormEvent, useEffect, useRef, useState } from "react";
import { PageBackground } from "../components/PageBackground";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import {
  extractStackFromMeta,
  getOrderedProjectCases,
  getUiText,
  indexTranslations,
  projectCardOrder,
  type Language,
} from "../data/templateData";
import {
  applyTranslationEntries,
  getInitialLanguage,
  initializeTheme,
  persistLanguage,
  setupActiveNav,
  setupHeaderScroll,
  setupHomeAnchorBehavior,
  setupMobileMenu,
  setupReveal,
  setupScrollProgress,
  setupSpotlightCards,
  syncChromeLanguage,
} from "../lib/siteEffects";
import { buildClassicCvHref, buildProjectHref } from "../lib/pageUrls";

const HOME_NAV_LINKS = [
  { href: "#about", label: "Giới thiệu" },
  { href: "#skills", label: "Kỹ năng" },
  { href: "#projects", label: "Dự án" },
  { href: "#experience", label: "Hành trình" },
  { href: "#cv-document", label: "CV" },
  { href: "#contact", label: "Liên hệ" },
] as const;

const HERO_CASE_RAIL_CONTENT = {
  vi: [
    {
      id: "ops-dashboard",
      title: "Language Center SaaS",
      summary: "Public demo · RBAC dashboard + realtime operations",
    },
    {
      id: "ai-doc-formatter",
      title: "AI Doc Formatter / Proze AI",
      summary: "Private core + public showcase · AI editor + export pipeline",
    },
  ],
  en: [
    {
      id: "ops-dashboard",
      title: "Language Center SaaS",
      summary: "Public demo · RBAC dashboard + realtime operations",
    },
    {
      id: "ai-doc-formatter",
      title: "AI Doc Formatter / Proze AI",
      summary: "Private core + public showcase · AI editor + export pipeline",
    },
  ],
} as const;

const FILTER_LABELS = {
  vi: {
    sectionLabel: "Dự án",
    sectionTitle: "Case studies dự án đã triển khai",
    sectionSubtitle:
      "Tập trung vào vấn đề, giải pháp và kết quả, không làm phô hiệu ứng.",
    projectsNote:
      "Mỗi dự án đều có phần <strong>case study</strong> riêng. Với repo private/NDA, bạn vẫn xem được bối cảnh, kiến trúc, quyết định kỹ thuật và kết quả triển khai.",
    all: "Tất cả",
    frontend: "Frontend",
    product: "Product",
    private: "Private / NDA",
  },
  en: {
    sectionLabel: "Projects",
    sectionTitle: "Project case studies",
    sectionSubtitle:
      "Focused on problem, solution, and impact. No unnecessary visual noise.",
    projectsNote:
      "Each project has a dedicated <strong>case study</strong>. For private/NDA repos, you can still review context, architecture, technical decisions, and outcomes.",
    all: "All",
    frontend: "Frontend",
    product: "Product",
    private: "Private / NDA",
  },
} as const;

const SOCIAL_LINKS = [
  {
    href: "https://github.com/thnkthuhigh",
    label: "GitHub",
    icon: (
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 .5 12.2a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.6.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9A11.5 11.5 0 0 0 12 .5Z"
      />
    ),
  },
  {
    href: "https://www.linkedin.com/in/thnkthuhigh/",
    label: "LinkedIn",
    icon: (
      <path
        fill="currentColor"
        d="M6.9 8.5a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8Zm-1.6 13V10.1h3.2v11.4H5.3Zm5.1 0V10.1h3.1v1.6h.1c.4-.8 1.5-1.9 3.2-1.9 3.4 0 4 2.2 4 5.2v6.5h-3.2v-5.8c0-1.4 0-3.2-2-3.2-2 0-2.2 1.5-2.2 3.1v5.9h-3.1Z"
      />
    ),
  },
  {
    href: "mailto:ngchithanh.dev@gmail.com",
    label: "Email",
    icon: (
      <path
        fill="currentColor"
        d="M3 5.8A2.8 2.8 0 0 1 5.8 3h12.4A2.8 2.8 0 0 1 21 5.8v12.4a2.8 2.8 0 0 1-2.8 2.8H5.8A2.8 2.8 0 0 1 3 18.2V5.8Zm2.3-.5 6.7 5.2 6.7-5.2H5.3Zm13.4 2.8-6.1 4.7a1 1 0 0 1-1.2 0L5.3 8v10.2c0 .3.2.5.5.5h12.4c.3 0 .5-.2.5-.5V8.1Z"
      />
    ),
  },
] as const;

function getRevealDelay(index: number): "80" | "160" | undefined {
  if (index % 3 === 1) {
    return "80";
  }

  if (index % 3 === 2) {
    return "160";
  }

  return undefined;
}

function ProjectsSection({ language }: { language: Language }) {
  const [filter, setFilter] = useState<
    "all" | "frontend" | "product" | "private"
  >("all");
  const labels = FILTER_LABELS[language];
  const ui = getUiText(language);
  const projects = getOrderedProjectCases(language);

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head" data-reveal="up">
          <p className="section-label">{labels.sectionLabel}</p>
          <h2 className="section-title">{labels.sectionTitle}</h2>
          <p className="section-subtitle">{labels.sectionSubtitle}</p>
        </div>

        <div className="project-filters" data-reveal="up">
          {(
            [
              ["all", labels.all],
              ["frontend", labels.frontend],
              ["product", labels.product],
              ["private", labels.private],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`filter-btn${filter === value ? " active" : ""}`}
              data-filter={value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <p
          className="projects-note"
          data-reveal="up"
          data-delay="80"
          dangerouslySetInnerHTML={{ __html: labels.projectsNote }}
        ></p>

        <div className="project-grid" id="project-grid">
          {projects.map((project, index) => {
            const preview = project.gallery.find(
              (item) => typeof item.image === "string" && item.image.length > 0,
            );
            const points =
              project.impact.length > 0
                ? project.impact.slice(0, 3)
                : project.technicalDecisions.slice(0, 3);
            const isHidden =
              filter !== "all" && !project.filters.includes(filter);
            const projectId = projectCardOrder[index];

            return (
              <article
                key={projectId}
                className={`project-card${isHidden ? " is-hidden" : ""}`}
                data-project-type={project.filters.join(" ")}
                data-project-id={projectId}
                data-reveal="up"
                data-delay={getRevealDelay(index)}
              >
                <div className="project-top">
                  <span className="project-badge">{project.cardBadge}</span>
                  <span className="project-year">{project.year}</span>
                </div>

                <div className="project-visual">
                  {preview?.image ? (
                    <img
                      src={preview.image}
                      alt={preview.alt || `${project.title} preview`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <span className="project-visual-tag">
                    {project.previewTag}
                  </span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.summary}</p>

                <ul className="project-points">
                  {points.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="project-stack">
                  {extractStackFromMeta(project, language)}
                </div>

                <div className="project-actions">
                  <a
                    href={buildProjectHref(projectId, language)}
                    className="project-link project-detail-btn"
                  >
                    {ui.detailButton}
                  </a>
                  {project.links.map((link) =>
                    link.href ? (
                      <a
                        key={`${projectId}-${link.label}`}
                        className="project-link"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span
                        key={`${projectId}-${link.label}`}
                        className="project-link is-disabled"
                        aria-disabled="true"
                      >
                        {link.label}
                      </span>
                    ),
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const [language, setLanguage] = useState<Language>(() =>
    getInitialLanguage(),
  );
  const formStatusRef = useRef<HTMLParagraphElement | null>(null);
  const ui = getUiText(language);
  const heroCases = HERO_CASE_RAIL_CONTENT[language];

  useEffect(() => {
    document.title =
      language === "en"
        ? "Nguyen Chi Thanh | Frontend Engineer Portfolio"
        : "Nguyễn Chí Thanh | Frontend Engineer Portfolio";
  }, [language]);

  useEffect(() => {
    persistLanguage(language);
    applyTranslationEntries(
      indexTranslations[language] ?? indexTranslations.vi,
    );
    syncChromeLanguage(language, ui);
  }, [language, ui]);

  useEffect(() => {
    initializeTheme();

    const cleanups = [
      setupMobileMenu({
        menuOpen: ui.menuOpen,
        menuClose: ui.menuClose,
      }),
      setupHomeAnchorBehavior(),
      setupHeaderScroll(),
      setupScrollProgress(),
      setupSpotlightCards(),
      setupReveal(),
      setupActiveNav(),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [language, ui.menuClose, ui.menuOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !subject || !message) {
      if (formStatusRef.current) {
        formStatusRef.current.textContent = ui.formMissing;
      }
      return;
    }

    const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const body = encodeURIComponent(
      [`Họ tên: ${name}`, `Email: ${email}`, "", "Nội dung:", message].join(
        "\n",
      ),
    );

    if (formStatusRef.current) {
      formStatusRef.current.textContent = ui.formOpening;
    }

    window.location.href = `mailto:ngchithanh.dev@gmail.com?subject=${mailtoSubject}&body=${body}`;
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Bỏ qua điều hướng
      </a>
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true">
        <span></span>
      </div>
      <PageBackground />
      <SiteHeader
        language={language}
        onLanguageChange={setLanguage}
        brandHref="#home"
        brandLabel={language === "en" ? "Back to top" : "Về đầu trang"}
        navLabel={language === "en" ? "Primary navigation" : "Điều hướng chính"}
        mobileNavLabel={
          language === "en" ? "Mobile navigation" : "Điều hướng di động"
        }
        navLinks={HOME_NAV_LINKS}
        mobileLinks={HOME_NAV_LINKS}
      />

      <main id="main-content">
        <section className="section hero" id="home">
          <div className="container hero-grid">
            <div className="hero-content" data-reveal="up">
              <p className="eyebrow">
                Sinh viên năm 4 CNTT · Software Engineer Intern
              </p>
              <h1>
                Portfolio thực tập Software Engineer:{" "}
                <span className="headline-accent">học và làm thật</span>, UI rõ
                ràng, code dễ đọc.
              </h1>
              <p className="hero-lead">
                Mình là <strong>Nguyễn Chí Thanh</strong>, sinh viên năm 4 ngành
                CNTT. Mình tập trung Frontend; đồng thời có kinh nghiệm làm việc
                với backend (API/realtime/queue) và DevOps ở mức hỗ trợ triển
                khai.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">
                  Xem dự án nổi bật
                </a>
                <a
                  className="btn btn-secondary"
                  href={buildClassicCvHref(language)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mở CV ngay
                </a>
                <a
                  className="btn btn-tertiary"
                  href={buildClassicCvHref(language, { print: true })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tải CV PDF
                </a>
              </div>

              <div className="hero-social-links">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {link.icon}
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="quick-contact">
                <a href="mailto:ngchithanh.dev@gmail.com">
                  ngchithanh.dev@gmail.com
                </a>
                <span>•</span>
                <a href="tel:0359498968">0359498968</a>
                <span>•</span>
                <span>Tìm cơ hội thực tập Software Engineer</span>
              </div>

              <div className="hero-proof-chips">
                <span>6 case study projects</span>
                <span>Frontend + delivery discipline</span>
                <span>Private repo friendly</span>
                <span>Open to learn &amp; improve</span>
              </div>
            </div>

            <aside className="hero-panel" data-reveal="up" data-delay="120">
              <div className="panel-title">Tóm tắt nhanh</div>
              <ul className="hero-kpi">
                <li>
                  <span className="kpi-value">Năm 4</span>
                  <span className="kpi-label">Sinh viên Khoa học máy tính</span>
                </li>
                <li>
                  <span className="kpi-value">6 case studies</span>
                  <span className="kpi-label">
                    8 public repos + 2 private cores
                  </span>
                </li>
                <li>
                  <span className="kpi-value">Stack chính</span>
                  <span className="kpi-label">
                    React, Next.js, TypeScript, API/Realtime integration
                  </span>
                </li>
              </ul>

              <div className="availability">
                <span className="status-dot"></span>
                <span className="availability-text">
                  Sẵn sàng học hỏi và nhận test task
                </span>
              </div>
              <p className="hero-verified-note">
                Số liệu public được đối chiếu từ GitHub Repositories tab.
              </p>

              <div className="hero-cv-card">
                <p className="hero-rail-title">CV nhanh</p>
                <p className="hero-cv-note">
                  CV tuyển dụng: mở online hoặc tải PDF ngay (1 click).
                </p>
                <div className="hero-cv-actions">
                  <a
                    href="cv-ats.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV ATS-safe
                  </a>
                  <a href="cv.html" target="_blank" rel="noopener noreferrer">
                    CV Vietnamese
                  </a>
                  <a
                    href="cv-en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV English
                  </a>
                  <a
                    href="cv-ats-en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV ATS English
                  </a>
                  <a
                    href={buildClassicCvHref(language, { print: true })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tải CV PDF (1 click)
                  </a>
                </div>
              </div>

              <div className="hero-case-rail">
                <p className="hero-rail-title">Case nổi bật</p>
                {heroCases.map((item) => (
                  <a
                    key={item.id}
                    className="hero-rail-item"
                    href={buildProjectHref(item.id, language)}
                  >
                    <strong>{item.title}</strong>
                    <span>{item.summary}</span>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container split-grid">
            <div data-reveal="left">
              <p className="section-label">Giới thiệu</p>
              <h2 className="section-title">
                Tóm tắt nhanh để bắt đầu trao đổi
              </h2>
            </div>
            <div className="about-content" data-reveal="right">
              <p>
                Mình là sinh viên năm 4, định hướng Software Engineer Intern
                (Frontend/Product). Portfolio này tổng hợp các dự án đã triển
                khai thực tế như healthcare-clinic-system, language-center-saas,
                proze-ai và personal-portfolio.
              </p>
              <p>
                Khi làm việc, mình ưu tiên làm rõ yêu cầu trước, dựng UI dễ
                dùng, rồi theo tới phần tích hợp API/realtime để tính năng vận
                hành ổn định.
              </p>
              <ul className="about-list">
                <li>
                  Đọc codebase nhanh, tách task rõ và bám timeline sprint.
                </li>
                <li>Ưu tiên component rõ ràng, responsive và dễ bảo trì.</li>
                <li>
                  Giữ nhịp release bằng lint/test/build và checklist review.
                </li>
              </ul>
            </div>
          </div>

          <div className="container">
            <div className="trust-items" data-reveal="up" data-delay="80">
              <div className="trust-item">
                <h3>Case study có bằng chứng</h3>
                <p>
                  Mỗi case đều gắn repo/docs và nêu rõ vai trò, quyết định kỹ
                  thuật, kết quả.
                </p>
              </div>
              <div className="trust-item">
                <h3>Frontend đi cùng integration</h3>
                <p>
                  Làm từ component/UI đến state, xử lý lỗi và luồng
                  API/realtime.
                </p>
              </div>
              <div className="trust-item">
                <h3>Giữ nhịp release ổn định</h3>
                <p>
                  Duy trì lint/test/build, review checklist và xử lý issue trước
                  khi merge.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <div className="section-head" data-reveal="up">
              <p className="section-label">Kỹ năng</p>
              <h2 className="section-title">
                Năng lực đã áp dụng trong dự án thực tế
              </h2>
            </div>

            <div className="skills-grid">
              <article className="skill-card" data-reveal="up">
                <h3>Frontend Implementation</h3>
                <ul>
                  <li>React, Next.js, TypeScript, Vite</li>
                  <li>TanStack Query, Zustand, React Hook Form</li>
                  <li>Component architecture, responsive UI, accessibility</li>
                </ul>
              </article>

              <article className="skill-card" data-reveal="up" data-delay="80">
                <h3>Backend &amp; API Collaboration</h3>
                <ul>
                  <li>
                    Node.js/Express, FastAPI, Spring Boot (mức triển khai
                    feature)
                  </li>
                  <li>
                    REST API contract, Swagger/OpenAPI, error flow handling
                  </li>
                  <li>
                    Realtime với Socket.IO/SSE, async queue với Redis/Celery
                  </li>
                </ul>
              </article>

              <article className="skill-card" data-reveal="up" data-delay="160">
                <h3>Data &amp; Architecture</h3>
                <ul>
                  <li>PostgreSQL, MongoDB, Redis theo từng bài toán</li>
                  <li>Monorepo/module boundaries, shared contracts</li>
                  <li>RBAC workflows, audit/troubleshooting docs</li>
                </ul>
              </article>

              <article className="skill-card" data-reveal="up" data-delay="240">
                <h3>Delivery &amp; Teamwork</h3>
                <ul>
                  <li>Docker/Docker Compose, Nginx, local-to-prod workflow</li>
                  <li>GitHub Actions CI/CD, quality gates (lint/test/build)</li>
                  <li>
                    Git flow, review checklist, phối hợp với QA/PM/Designer
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <ProjectsSection language={language} />

        <section className="section" id="experience">
          <div className="container">
            <div className="section-head" data-reveal="up">
              <p className="section-label">Hành trình</p>
              <h2 className="section-title">
                Các cột mốc học tập và thực chiến dự án
              </h2>
            </div>

            <div className="timeline">
              <article className="timeline-item" data-reveal="up">
                <div className="timeline-period">2026 - Hiện tại</div>
                <div className="timeline-main">
                  <h3>Sinh viên năm 4 · Xây portfolio hướng tuyển dụng</h3>
                  <p className="timeline-company">
                    Định hướng Frontend / Product Engineering
                  </p>
                  <p>
                    Tập trung hệ thống hóa 6 case study theo format dễ đọc:
                    problem, constraints, kiến trúc, kết quả và bài học kỹ
                    thuật.
                  </p>
                  <ul>
                    <li>
                      Chuẩn hóa template case-study cho cả public và private
                      repo.
                    </li>
                    <li>
                      Rèn khả năng trình bày quyết định kỹ thuật ngắn gọn, rõ
                      ràng.
                    </li>
                  </ul>
                </div>
              </article>

              <article
                className="timeline-item"
                data-reveal="up"
                data-delay="80"
              >
                <div className="timeline-period">2025 - 2026</div>
                <div className="timeline-main">
                  <h3>Đồ án và dự án nhóm tại trường</h3>
                  <p className="timeline-company">Team 3-6 thành viên</p>
                  <p>
                    Triển khai các dự án có độ phức tạp tăng dần: dashboard,
                    workflow nội bộ, landing page tuyển dụng, task workspace.
                  </p>
                  <ul>
                    <li>
                      Xây component tái sử dụng và quy ước code review trong
                      nhóm.
                    </li>
                    <li>
                      Tự kiểm thử responsive, accessibility và hiệu năng cơ bản.
                    </li>
                  </ul>
                </div>
              </article>

              <article
                className="timeline-item"
                data-reveal="up"
                data-delay="160"
              >
                <div className="timeline-period">2023 - 2025</div>
                <div className="timeline-main">
                  <h3>Nền tảng kỹ thuật</h3>
                  <p className="timeline-company">
                    Luyện thuật toán + web fundamentals
                  </p>
                  <p>
                    Rèn nền tảng HTML/CSS/JavaScript, sau đó chuyển sang React
                    và TypeScript để làm các bài toán sản phẩm thực tế hơn.
                  </p>
                  <ul>
                    <li>
                      Thói quen viết code có tổ chức, tách component rõ ràng.
                    </li>
                    <li>Luyện tư duy phân tích bài toán trước khi code.</li>
                  </ul>
                </div>
              </article>
            </div>

            <div
              className="section-head"
              data-reveal="up"
              style={{ marginTop: "var(--subsection-gap)" }}
            >
              <p className="section-label">Cách làm việc</p>
              <h2 className="section-title">
                Quy trình 4 bước khi nhận một feature
              </h2>
            </div>

            <div className="process-grid">
              <article className="process-card" data-reveal="up">
                <span>01</span>
                <h3>Hiểu đúng bài toán</h3>
                <p>Chốt rõ user flow, success metric, phạm vi và rủi ro.</p>
              </article>
              <article
                className="process-card"
                data-reveal="up"
                data-delay="80"
              >
                <span>02</span>
                <h3>Thiết kế kỹ thuật</h3>
                <p>Tách component, state, API contract trước khi code.</p>
              </article>
              <article
                className="process-card"
                data-reveal="up"
                data-delay="160"
              >
                <span>03</span>
                <h3>Triển khai &amp; review</h3>
                <p>Code sạch, test điểm rủi ro cao, review theo checklist.</p>
              </article>
              <article
                className="process-card"
                data-reveal="up"
                data-delay="240"
              >
                <span>04</span>
                <h3>Đo lường sau release</h3>
                <p>Đọc số liệu thật rồi tối ưu vòng tiếp theo.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section cv-document" id="cv-document">
          <div className="container">
            <div className="section-head" data-reveal="up">
              <p className="section-label">CV Đầy Đủ</p>
              <h2 className="section-title">
                CV gọn để nhà tuyển dụng xem nhanh
              </h2>
              <p className="section-subtitle">
                Đây là bản CV gói gọn thông tin cốt lõi cho vị trí thực tập
                Frontend. Bạn có thể mở online hoặc tải PDF trực tiếp.
              </p>
            </div>

            <article className="cv-inline-card" data-reveal="up">
              <div className="cv-inline-head">
                <div>
                  <h3>Nguyễn Chí Thanh · Software Engineer Intern</h3>
                  <p>
                    Cập nhật: 2026 · Ưu tiên vị trí Software Engineer Intern ·
                    Sẵn sàng nhận test task phù hợp.
                  </p>
                </div>
                <div className="cv-inline-actions">
                  <a
                    className="btn btn-primary"
                    href="cv-ats.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV ATS-safe
                  </a>
                  <a
                    className="btn btn-secondary"
                    href="cv.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV Vietnamese
                  </a>
                  <a
                    className="btn btn-secondary"
                    href="cv-en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV English
                  </a>
                  <a
                    className="btn btn-secondary"
                    href="cv-ats-en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV ATS English
                  </a>
                  <a
                    className="btn btn-secondary"
                    href={buildClassicCvHref(language, { print: true })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tải PDF (1 click)
                  </a>
                </div>
              </div>

              <div className="cv-inline-grid">
                <div>
                  <strong>Liên hệ</strong>
                  <p>Email: ngchithanh.dev@gmail.com</p>
                  <p>Phone: 0359498968</p>
                  <p>LinkedIn: linkedin.com/in/thnkthuhigh</p>
                </div>
                <div>
                  <strong>Stack chính</strong>
                  <p>React, Next.js, TypeScript, Node.js</p>
                  <p>UI architecture, backend integration, state management</p>
                  <p>Responsive, accessibility, CI/CD và deploy cơ bản</p>
                </div>
                <div>
                  <strong>Điểm mạnh</strong>
                  <p>6 case-study có public + private/NDA</p>
                  <p>Tư duy sản phẩm + cấu trúc code rõ</p>
                  <p>Có thể trao đổi thêm về project private khi cần</p>
                </div>
              </div>
            </article>

            <div
              className="snapshot-grid"
              style={{ marginTop: "var(--subsection-gap)" }}
            >
              <article className="snapshot-card" data-reveal="up">
                <h3>Stack</h3>
                <p>React, Next.js, TypeScript, Node.js, DevOps basics</p>
                <ul>
                  <li>
                    Frontend architecture rõ ràng, ưu tiên maintainability
                  </li>
                  <li>Vững API/backend flow và release quality cơ bản</li>
                </ul>
              </article>
              <article
                className="snapshot-card snapshot-card-wide"
                data-reveal="up"
                data-delay="80"
              >
                <h3>Projects</h3>
                <p>6 case studies from 8 public repos + 2 private cores</p>
                <ul>
                  <li>Language Center SaaS: production dashboard đa vai trò</li>
                  <li>
                    AI Doc Formatter / Proze AI: AI editor + multi-format export
                  </li>
                  <li>Healthcare Clinic: doctor queue + consultation flow</li>
                  <li>RealTime Auction: realtime bidding UI với Socket.IO</li>
                  <li>Cloud Clipboard: self-hosted utility cho text + image</li>
                  <li>
                    Private Workflow Suite: schema form + role-based access
                  </li>
                </ul>
              </article>
              <article
                className="snapshot-card"
                data-reveal="up"
                data-delay="120"
              >
                <h3>Engineering Strengths</h3>
                <p>Không chỉ tool list, tập trung năng lực triển khai</p>
                <ul>
                  <li>UI architecture &amp; component systems</li>
                  <li>State/data flow rõ ràng, giảm side-effects</li>
                  <li>Responsive + accessibility thực dụng</li>
                  <li>Performance awareness khi release</li>
                </ul>
              </article>
              <article
                className="snapshot-card"
                data-reveal="up"
                data-delay="160"
              >
                <h3>Education &amp; Availability</h3>
                <p>Sinh viên năm 4 · Khoa học máy tính</p>
                <ul>
                  <li>Định hướng: Software Engineer Intern</li>
                  <li>Đang tìm cơ hội thực tập Software Engineer</li>
                  <li>Sẵn sàng nhận test task phù hợp</li>
                  <li>Flexible schedule: part-time/full-time</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section recruiter-faq" id="faq">
          <div className="container">
            <div className="section-head" data-reveal="up">
              <p className="section-label">FAQ</p>
              <h2 className="section-title">
                Một số câu hỏi nhà tuyển dụng hay hỏi
              </h2>
            </div>

            <div className="faq-grid">
              <article className="faq-item" data-reveal="up">
                <h3>Có thể làm bài test kỹ thuật không?</h3>
                <p>
                  Có, mình sẵn sàng làm test task và trình bày cách làm rõ ràng.
                </p>
              </article>
              <article className="faq-item" data-reveal="up" data-delay="80">
                <h3>Có thể demo project private không?</h3>
                <p>
                  Có thể chia sẻ walkthrough trong phạm vi NDA khi được yêu cầu.
                </p>
              </article>
              <article className="faq-item" data-reveal="up" data-delay="160">
                <h3>Có thể làm part-time không?</h3>
                <p>
                  Có, linh hoạt lịch part-time/full-time theo giai đoạn học kỳ.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contact-grid">
            <div data-reveal="left">
              <p className="section-label">Liên hệ</p>
              <h2 className="section-title">
                Nếu phù hợp, mình rất mong được trao đổi
              </h2>
              <p className="contact-lead">
                Mình đang tìm cơ hội thực tập Software Engineer tại Engineering.
                Mình có thể gửi CV PDF, transcript và giới thiệu thêm về các dự
                án private qua email khi cần.
              </p>

              <div className="contact-quick-actions">
                <a
                  className="btn btn-primary"
                  href="mailto:ngchithanh.dev@gmail.com?subject=Opportunity%20Discussion%20-%20Nguyen%20Chi%20Thanh"
                >
                  Trao đổi qua email
                </a>
                <a
                  className="btn btn-secondary"
                  href="https://www.linkedin.com/in/thnkthuhigh/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kết nối LinkedIn
                </a>
              </div>

              <ul className="contact-list">
                <li>
                  <span>Email</span>
                  <a href="mailto:ngchithanh.dev@gmail.com">
                    ngchithanh.dev@gmail.com
                  </a>
                </li>
                <li>
                  <span>Điện thoại</span>
                  <a href="tel:0359498968">0359498968</a>
                </li>
                <li>
                  <span>LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/thnkthuhigh/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/thnkthuhigh
                  </a>
                </li>
                <li>
                  <span>GitHub</span>
                  <a
                    href="https://github.com/thnkthuhigh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/thnkthuhigh
                  </a>
                </li>
              </ul>
            </div>

            <form
              className="contact-form"
              id="contact-form"
              data-reveal="right"
              onSubmit={handleSubmit}
            >
              <h3>Gửi lời nhắn nhanh</h3>
              <p className="form-note">
                Form sẽ mở email client với nội dung đã điền, để đảm bảo bạn gửi
                đúng người ngay lập tức.
              </p>

              <div className="field">
                <label htmlFor="name">Họ tên</label>
                <input id="name" name="name" type="text" required />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>

              <div className="field">
                <label htmlFor="subject">Chủ đề</label>
                <input id="subject" name="subject" type="text" required />
              </div>

              <div className="field">
                <label htmlFor="message">Nội dung</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Mở email để gửi
              </button>
              <p
                className="form-status"
                id="form-status"
                aria-live="polite"
                ref={formStatusRef}
              ></p>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter
        text="Nguyễn Chí Thanh. Portfolio for recruitment."
        backHref="#home"
        backLabel="Về đầu trang"
      />
    </>
  );
}
