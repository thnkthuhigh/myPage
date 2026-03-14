(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeMeta = document.getElementById("theme-color-meta");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const languageToggle = document.getElementById("language-toggle");
  const header = document.getElementById("site-header");
  const MOBILE_NAV_BREAKPOINT = 900;

  const THEME_KEY = "portfolio_theme";
  const LANGUAGE_KEY = "portfolio_lang";
  const SUPPORTED_LANGS = ["vi", "en"];
  let currentLanguage = "vi";
  const THEME_COLORS = {
    light: "#f4f6f8",
    dark: "#0f141a",
  };

  const PROJECT_CASES = {
    "ops-dashboard": {
      badge: "Public Case · Production SaaS",
      title: "Language Center SaaS (englishforkids.me)",
      year: "2026",
      filters: ["frontend", "product"],
      cardBadge: "Public",
      previewTag: "Production Case",
      summary:
        "Nền tảng SaaS quản lý trung tâm tiếng Anh đang chạy production, tập trung vào dashboard đa vai trò, quy trình tài chính và đồng bộ thời gian thực.",
      meta: [
        "Vai trò: Frontend Engineer (API/DevOps-aware)",
        "Team: Solo builder",
        "Thời gian: Nhiều tháng phát triển liên tục",
        "Stack: React + TypeScript + Node.js + MongoDB + Socket.IO",
      ],
      proof: [
        { value: "50k+ LOC", label: "Mã nguồn production" },
        { value: "822 tests", label: "Tự động hóa kiểm thử" },
        { value: "200+ APIs", label: "Backend routes triển khai" },
        { value: "Live", label: "Đang vận hành thực tế" },
      ],
      problem:
        "Quy trình vận hành trung tâm tiếng Anh rời rạc giữa quản lý học viên, lịch học, tài chính và tính lương; dữ liệu khó đồng bộ theo thời gian thực.",
      solution:
        "Thiết kế lại thành một hệ thống SaaS theo role-based dashboards, chuẩn hóa data flow và bổ sung realtime events cho các luồng quan trọng.",
      storyImpact:
        "Hệ thống được triển khai production, tăng khả năng theo dõi vận hành tập trung và giảm thao tác thủ công ở các quy trình chính.",
      architectureDiagram: "assets/diagrams/ops-dashboard-arch.svg",
      architectureCaption:
        "Kiến trúc module theo domain + RBAC giúp mở rộng nghiệp vụ mà vẫn giữ flow rõ ràng.",
      architecture: [
        "Phân module theo domain: học viên, lớp học, tài chính, lương.",
        "RBAC theo 4 vai trò chính để tách quyền rõ ràng.",
        "Realtime sync cho attendance, payment và notification flows.",
      ],
      technicalDecisions: [
        "Ưu tiên TypeScript end-to-end để giảm lỗi integration.",
        "Áp dụng kiến trúc role-first cho dashboard và route guards.",
        "Thiết kế API contracts theo domain để scale độc lập từng module.",
      ],
      impact: [
        "Chuẩn hóa quy trình vận hành vào một nền tảng tập trung.",
        "Giảm thời gian đồng bộ giữa các bộ phận vận hành.",
        "Cải thiện khả năng theo dõi dữ liệu theo vai trò.",
      ],
      roleScope: [
        "Phụ trách các flow frontend theo role và nghiệp vụ cốt lõi.",
        "Xây component patterns cho dashboard, table và form workflows.",
        "Tối ưu readability của dữ liệu vận hành trên desktop/mobile.",
      ],
      evidence: [
        "Live demo production: englishforkids.me.",
        "Public repository: thnkthuhigh/language-center-saas.",
        "Repository công khai kèm tài liệu kiến trúc và hướng dẫn triển khai.",
        "Testing và quality metrics thể hiện trực tiếp trong README.",
      ],
      challenges: [
        "Đảm bảo tính nhất quán khi số module và vai trò tăng nhanh.",
        "Cân bằng tốc độ phát triển và chất lượng release production.",
        "Giữ trải nghiệm mượt với các luồng đồng bộ thời gian thực.",
      ],
      lessons: [
        "Domain boundaries rõ ràng giúp scale nhanh hơn.",
        "Documentation tốt giúp team onboard và review dễ hơn.",
        "Quality gates cần được thiết kế từ giai đoạn đầu.",
      ],
      nda: "Repo public được dùng để trình bày kỹ thuật; dữ liệu thật và chi tiết vận hành production đã được bảo mật.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Bạn có thể đặt `videoEmbed` (YouTube) hoặc `videoFile` (MP4 local) để hiển thị demo trực tiếp.",
      gallery: [
        {
          title: "Operations Dashboard",
          desc: "Tổng quan KPI vận hành theo từng vai trò trên production SaaS.",
          image: "assets/cases/ops-queue.svg",
          alt: "Language Center SaaS operations dashboard preview",
        },
        {
          title: "Academic & Revenue Analytics",
          desc: "Màn hình phân tích học vụ và tài chính cho quản trị viên.",
          image: "assets/cases/ops-analytics.svg",
          alt: "Language Center SaaS analytics view preview",
        },
        {
          title: "Role-based Workflows",
          desc: "Luồng theo vai trò Owner/Admin/Teacher/Accountant với quyền tách bạch.",
          image: "assets/cases/ops-filter.svg",
          alt: "Language Center SaaS role workflow preview",
        },
        {
          title: "Shared Component Patterns",
          desc: "Pattern table/form dùng lại xuyên suốt nhiều module nghiệp vụ.",
          image: "assets/cases/ops-table.svg",
          alt: "Language Center SaaS shared components preview",
        },
      ],
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/thnkthuhigh/language-center-saas",
        },
        { label: "Live Demo", href: "https://www.englishforkids.me/" },
      ],
    },

    "ai-doc-formatter": {
      badge: "Core Case · Private Core + Public Showcase",
      title: "AI Doc Formatter / Proze AI",
      year: "2026",
      filters: ["frontend", "product", "private"],
      cardBadge: "Hybrid",
      previewTag: "Core Project",
      summary:
        "Nền tảng AI định dạng tài liệu theo chuẩn production: AI editor, export pipeline bất đồng bộ, CI/CD nhiều tầng, deploy DigitalOcean và observability stack đầy đủ.",
      meta: [
        "Vai trò: Frontend Engineer (API/DevOps-aware)",
        "Team: Solo builder",
        "Thời gian: Nhiều tháng phát triển + hardening",
        "Stack: Next.js + TypeScript + FastAPI + Redis + Celery + Docker + GitHub Actions",
      ],
      proof: [
        { value: "10 CI jobs", label: "Quality + security + e2e gates" },
        {
          value: "2 Deploy jobs",
          label: "DO deploy + health check + rollback",
        },
        {
          value: "6 Compose variants",
          label: "dev/prod/staging/light/monitoring/blue-green",
        },
        {
          value: "6 SLOs",
          label: "latency, error rate, availability, circuit-breaker",
        },
      ],
      problem:
        "Người dùng cần biến nội dung thô thành tài liệu chuyên nghiệp nhanh chóng, nhưng luồng soạn thảo + AI + export thường rời rạc và khó đảm bảo chất lượng đầu ra.",
      solution:
        "Xây nền tảng hợp nhất: AI analysis + block editor + export queue, kèm CI/CD 10 jobs, branch-protection gates, deploy pipeline có health-check/rollback và monitoring Prometheus/Grafana/Loki.",
      storyImpact:
        "Tạo một workflow end-to-end từ raw text đến tài liệu hoàn chỉnh, giảm thao tác thủ công và tăng tính nhất quán giữa trải nghiệm editor và output export.",
      architectureDiagram: "assets/diagrams/task-workspace-arch.svg",
      architectureCaption:
        "Kiến trúc fullstack tách rõ frontend editor, backend AI/export services và lớp job processing bất đồng bộ.",
      architecture: [
        "Frontend Next.js + TipTap cho editor và AI-assisted authoring flow.",
        "Backend FastAPI phân tách routers: AI, document, export, research.",
        "Redis + Celery cho export jobs; Docker Compose cho nhiều môi trường; Nginx reverse proxy trước production services.",
      ],
      technicalDecisions: [
        "Ưu tiên strict TypeScript + schema validation để giảm lỗi biên dữ liệu.",
        "Thiết kế middleware bảo mật nhiều lớp (CSRF, rate limit, security headers).",
        "Chuẩn hóa CI quality gates (lint/test/build/audit/e2e) + deploy workflow có rollback tự động khi health-check fail.",
      ],
      impact: [
        "Workflow từ commit đến production rõ ràng hơn, giảm rủi ro release thủ công.",
        "Độ tin cậy export tăng nhờ queue + preflight + health-check gates.",
        "Quan sát hệ thống tốt hơn với metrics/logs/alerts theo SLO.",
      ],
      roleScope: [
        "Thiết kế và triển khai toàn bộ kiến trúc frontend/backend cốt lõi.",
        "Xây AI text features, editor workflows và export pipelines.",
        "Thiết lập release discipline: CI gates, deploy scripts, runbook, checklist, branch protection.",
      ],
      evidence: [
        "Private repo chính: thnkthuhigh/ai-doc-formatter (source core).",
        "Public showcase: thnkthuhigh/proze-ai (10-job CI, 2-job deploy, 6 SLO, 6 compose variants).",
        "Artifacts DevOps: deploy-do.sh, Deployment Runbook, Blue-Green strategy, monitoring stack docs.",
      ],
      challenges: [
        "Giữ output export fidelity cao giữa editor preview và file thật.",
        "Kiểm soát trạng thái realtime khi AI streaming và user chỉnh sửa song song.",
        "Cân bằng tốc độ phát triển tính năng và độ ổn định production qua release gates.",
      ],
      lessons: [
        "AI product không chỉ là gọi model, mà là bài toán reliability + UX.",
        "Kiến trúc module và docs tốt giúp scale project solo bền vững hơn.",
        "Quality gates từ sớm giảm mạnh chi phí sửa lỗi về sau.",
      ],
      nda: "Public repo `proze-ai` là showcase giới thiệu; source code production chính nằm ở private repo `ai-doc-formatter` và có thể walkthrough trực tiếp khi phỏng vấn.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Demo public có thể xem qua showcase; chi tiết source core sẽ trình bày trong technical walkthrough.",
      gallery: [
        {
          title: "AI Editor Workspace",
          desc: "Không gian soạn thảo kết hợp block editor và AI assistance.",
          image: "assets/cases/ops-table.svg",
          alt: "AI document editor workspace preview",
        },
        {
          title: "Document Intelligence",
          desc: "Luồng phân tích cấu trúc và quality scoring cho tài liệu.",
          image: "assets/cases/ops-analytics.svg",
          alt: "AI document intelligence preview",
        },
        {
          title: "Export Pipeline",
          desc: "Pipeline xuất PDF/DOCX/Markdown/HTML với kiểm soát trạng thái.",
          image: "assets/cases/task-board.svg",
          alt: "AI document export pipeline preview",
        },
        {
          title: "Architecture & Ops",
          desc: "Góc nhìn kỹ thuật về module boundaries, security và CI/CD.",
          image: "assets/cases/task-insight.svg",
          alt: "AI document architecture and operations preview",
        },
      ],
      links: [
        { label: "Private Core (Walkthrough on request)" },
        {
          label: "Public Showcase",
          href: "https://github.com/thnkthuhigh/proze-ai",
        },
      ],
    },

    "b2b-workflow": {
      badge: "Private Case · NDA",
      title: "Private Internal Workflow Suite (NDA)",
      year: "2025",
      filters: ["product", "private"],
      cardBadge: "Private",
      previewTag: "NDA Case",
      summary:
        "Case study cho dự án nội bộ không public: xử lý form nghiệp vụ nhiều bước, phân quyền theo phòng ban và rule engine cho UI.",
      meta: [
        "Vai trò: Frontend Engineer (API/DevOps-aware)",
        "Team: Nhóm 6 người (cross-functional)",
        "Thời gian: 7 tháng",
        "Stack: Next.js + TypeScript",
      ],
      proof: [
        { value: "7 tháng", label: "Thời gian dự án" },
        { value: "6 người", label: "Team cross-functional" },
        { value: "NDA", label: "Dữ liệu bảo mật" },
        { value: "Nhiều vai trò", label: "Phân quyền phức tạp" },
      ],
      problem:
        "Luồng duyệt hồ sơ cũ phụ thuộc nhiều màn hình rời rạc, role handling thiếu nhất quán và khó mở rộng khi thêm nghiệp vụ mới.",
      solution:
        "Xây kiến trúc route theo domain và rule engine cho UI visibility. Chuẩn hóa form schema, validation pipeline, và activity log cho từng bước duyệt.",
      storyImpact:
        "Giảm rework khi thêm nghiệp vụ mới, giảm lỗi phân quyền và giúp team release ổn định hơn ở các flow phức tạp.",
      architectureDiagram: "assets/diagrams/b2b-workflow-arch.svg",
      architectureCaption:
        "Schema engine kết hợp role gate giúp mở rộng workflow mà không hardcode UI từng màn hình.",
      architecture: [
        "Feature-sliced architecture: workflow, approvals, reports.",
        "Form schema-driven rendering để tái sử dụng nhiều bước duyệt.",
        "Permission map theo role + hành động để đảm bảo tính nhất quán.",
      ],
      technicalDecisions: [
        "Chọn schema-driven form để scale nhanh khi nghiệp vụ đổi.",
        "Thiết kế permission map trung tâm thay vì kiểm tra role rải rác.",
        "Log hành động tại domain layer để phục vụ audit và debug.",
      ],
      impact: [
        "Giảm rework khi thêm nghiệp vụ mới.",
        "Tăng độ ổn định ở màn hình có logic phân quyền phức tạp.",
        "Rút ngắn thời gian bàn giao giữa các sprint.",
      ],
      roleScope: [
        "Thiết kế lại luồng form nhiều bước cho nhóm nghiệp vụ trọng điểm.",
        "Xây layer kiểm tra quyền hiển thị/cho phép thao tác theo role.",
        "Thiết lập component pattern cho form schema để giảm code trùng lặp.",
      ],
      evidence: [
        "Ảnh kiến trúc luồng duyệt đã ẩn dữ liệu nhạy cảm.",
        "Mẫu bảng role-matrix (đã lược bỏ tên nghiệp vụ thật).",
        "Walkthrough trực tiếp trong phỏng vấn, không ghi hình.",
      ],
      challenges: [
        "Mỗi phòng ban có rule xử lý khác nhau theo trạng thái hồ sơ.",
        "Nhiều bước duyệt liên quan dữ liệu nhạy cảm.",
        "Cần kiểm soát regression khi update form schema.",
      ],
      lessons: [
        "Schema-first giúp scale project nhanh hơn hardcode UI.",
        "Rule map rõ ràng giảm bug phân quyền đáng kể.",
        "Log hành động là yếu tố bắt buộc cho sản phẩm nội bộ.",
      ],
      nda: "Toàn bộ source code và dữ liệu thuộc phạm vi NDA. Có thể demo trực tiếp qua buổi walkthrough không ghi hình.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Do NDA, video công khai không khả dụng. Có thể trình bày live flow trong buổi phỏng vấn.",
      gallery: [
        {
          title: "Workflow Timeline",
          desc: "Minh hoạ chuỗi duyệt nhiều bước theo role.",
          image: "assets/cases/b2b-workflow.svg",
          alt: "Workflow timeline preview",
        },
        {
          title: "Role Matrix",
          desc: "Bảng quyền hành động theo trạng thái hồ sơ.",
          image: "assets/cases/b2b-role.svg",
          alt: "Role matrix preview",
        },
        {
          title: "Form Schema",
          desc: "Cấu trúc dynamic fields cho nhiều nghiệp vụ.",
          image: "assets/cases/b2b-schema.svg",
          alt: "Form schema preview",
        },
        {
          title: "Audit Log",
          desc: "Theo dõi lịch sử cập nhật phục vụ truy vết.",
          image: "assets/cases/b2b-audit.svg",
          alt: "Audit log preview",
        },
      ],
      links: [{ label: "Repo theo NDA" }, { label: "Demo theo lịch hẹn" }],
    },

    "hiring-landing": {
      badge: "Public Case · Product Monorepo",
      title: "Healthcare Clinic System",
      year: "2026",
      filters: ["frontend", "product"],
      cardBadge: "Public",
      previewTag: "Public Case",
      summary:
        "Hệ thống quản lý phòng khám đa vai trò với doctor dashboard, hàng đợi bệnh nhân thông minh và luồng khám bệnh kê đơn có phân quyền rõ ràng.",
      meta: [
        "Vai trò: Frontend Contributor",
        "Team: Nhóm nhiều vai trò trong môn chuyên ngành",
        "Thời gian: Nhiều sprint liên tục",
        "Stack: React + TypeScript + PostgreSQL + Docker",
      ],
      proof: [
        { value: "Monorepo", label: "Tổ chức codebase theo module" },
        { value: "Multi-role", label: "Owner/Admin/Doctor/Patient" },
        { value: "Queue Smart", label: "Ưu tiên bệnh nhân theo rule" },
        { value: "Swagger", label: "API docs rõ ràng" },
      ],
      problem:
        "Quản lý khám bệnh, hàng đợi, lịch hẹn và kê đơn tách rời khiến đội vận hành khó theo dõi toàn bộ flow theo thời gian thực.",
      solution:
        "Xây hệ thống đồng nhất với dashboard theo vai trò, smart queue cho bác sĩ và consultation flow có kiểm soát trạng thái rõ ràng.",
      storyImpact:
        "Giảm độ rời rạc trong vận hành phòng khám, tăng tốc xử lý hàng đợi và cải thiện khả năng theo dõi dữ liệu lâm sàng.",
      architectureDiagram: "assets/diagrams/hiring-landing-arch.svg",
      architectureCaption:
        "Monorepo + module boundaries giúp tách rõ domain bác sĩ, bệnh nhân, lịch hẹn và vận hành.",
      architecture: [
        "Tách module theo domain: doctor, patient, appointments, prescriptions.",
        "Thiết kế queue engine ưu tiên theo trạng thái và nguồn đặt lịch.",
        "Chuẩn hóa API contracts để frontend và backend phát triển song song.",
      ],
      technicalDecisions: [
        "Ưu tiên TypeScript ở frontend để giảm lỗi trạng thái UI.",
        "Áp dụng state clarity cho luồng queue và consultation actions.",
        "Dùng Docker cho môi trường dev nhất quán giữa các thành viên.",
      ],
      impact: [
        "Bác sĩ theo dõi hàng đợi trực quan hơn ở từng ca khám.",
        "Giảm thao tác thủ công khi cập nhật trạng thái khám bệnh.",
        "Tăng khả năng maintain module theo vai trò nghiệp vụ.",
      ],
      roleScope: [
        "Thiết kế UI cho doctor dashboard và queue management.",
        "Xây các component trạng thái cho consultation flow.",
        "Tối ưu form thao tác để giảm nhầm lẫn trong quy trình khám.",
      ],
      evidence: [
        "README chi tiết với quick-start và module overview.",
        "Swagger endpoints và quy trình chạy dự án rõ ràng.",
        "Case walkthrough có thể demo trực tiếp khi phỏng vấn.",
      ],
      challenges: [
        "Giữ UX rõ ràng khi dữ liệu bệnh nhân cập nhật liên tục.",
        "Đồng bộ rule ưu tiên queue với trạng thái nghiệp vụ thực tế.",
        "Kiểm soát regression khi thêm tính năng theo role mới.",
      ],
      lessons: [
        "Role-based UI cần đi cùng rule engine rõ ràng.",
        "Monorepo giúp reuse tốt nhưng cần kỷ luật module boundaries.",
        "Tài liệu setup tốt giúp tăng tốc onboard và review.",
      ],
      nda: "Repo công khai; dữ liệu thật trong môi trường production không được đưa vào mã nguồn.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Có thể thêm video demo thao tác ứng tuyển để tăng độ tin cậy cho case public.",
      gallery: [
        {
          title: "Doctor Dashboard",
          desc: "Tổng quan ca khám và trạng thái bệnh nhân theo thời gian thực.",
          image: "assets/cases/hire-hero.svg",
          alt: "Healthcare clinic doctor dashboard preview",
        },
        {
          title: "Smart Queue Management",
          desc: "Hàng đợi ưu tiên theo trạng thái và mức độ ưu tiên điều trị.",
          image: "assets/cases/hire-jd.svg",
          alt: "Healthcare clinic smart queue preview",
        },
        {
          title: "Consultation Form",
          desc: "Form khám bệnh và cập nhật chẩn đoán theo flow rõ ràng.",
          image: "assets/cases/hire-form.svg",
          alt: "Healthcare clinic consultation form preview",
        },
        {
          title: "Prescription Workflow",
          desc: "Luồng kê đơn có validation và kiểm soát trạng thái thuốc.",
          image: "assets/cases/hire-mobile.svg",
          alt: "Healthcare clinic prescription workflow preview",
        },
      ],
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/thnkthuhigh/healthcare-clinic-system",
        },
      ],
    },

    "task-workspace": {
      badge: "Public Case · Realtime Platform",
      title: "RealTime Auction System",
      year: "2026",
      filters: ["frontend", "product"],
      cardBadge: "Public",
      previewTag: "Realtime Case",
      summary:
        "Nền tảng đấu giá thời gian thực với phòng đấu giá live, cập nhật giá tức thì qua Socket.IO và luồng xử lý bid history có kiểm soát.",
      meta: [
        "Vai trò: Frontend Engineer (API/DevOps-aware)",
        "Team: Nhóm 5 người",
        "Thời gian: Dự án chuyên ngành năm 4",
        "Stack: React + TypeScript + Socket.IO + Redis + PostgreSQL",
      ],
      proof: [
        { value: "Realtime", label: "Đặt giá tức thì qua WebSocket" },
        { value: "5 người", label: "Team triển khai" },
        { value: "Redis", label: "Tối ưu lớp dữ liệu thời gian thực" },
        { value: "CI/CD", label: "Workflow theo nhóm chuẩn hóa" },
      ],
      problem:
        "Bài toán đấu giá yêu cầu cập nhật liên tục và tránh sai lệch trạng thái khi nhiều người dùng đặt giá đồng thời.",
      solution:
        "Thiết kế UI realtime theo event stream, kết hợp đồng bộ state bid history và thông báo để người dùng theo dõi phiên đấu giá ổn định.",
      storyImpact:
        "Tạo trải nghiệm đấu giá mượt hơn, giảm độ trễ cảm nhận ở room và tăng độ tin cậy khi người dùng tương tác đồng thời.",
      architectureDiagram: "assets/diagrams/task-workspace-arch.svg",
      architectureCaption:
        "Realtime architecture kết hợp REST + Socket events để giữ state nhất quán trong phòng đấu giá.",
      architecture: [
        "Kết hợp REST API cho CRUD và WebSocket cho events realtime.",
        "Tách state theo auction room, bid stream và notification panel.",
        "Dùng Redis làm lớp hỗ trợ sync và scaling cho socket events.",
      ],
      technicalDecisions: [
        "Ưu tiên event naming chuẩn hóa để debug dễ trong realtime flows.",
        "Tách UI state và server state nhằm giảm race-condition hiển thị.",
        "Áp dụng schema validation để kiểm soát payload trước khi render.",
      ],
      impact: [
        "Người dùng nhận cập nhật giá nhanh và rõ ràng hơn.",
        "Giảm lỗi hiển thị chồng chéo khi có nhiều bid liên tiếp.",
        "Team maintain dễ hơn nhờ cấu trúc module theo luồng nghiệp vụ.",
      ],
      roleScope: [
        "Xây dựng các màn hình auction room và bid history.",
        "Tối ưu trạng thái loading/sync/reconnect trong luồng realtime.",
        "Phối hợp backend thống nhất contract cho socket events.",
      ],
      evidence: [
        "Repository công khai kèm kiến trúc hệ thống trong README.",
        "Mô tả rõ stack realtime: Socket.IO, Redis, PostgreSQL.",
        "Có thể demo trực tiếp room flow trong buổi phỏng vấn.",
      ],
      challenges: [
        "Đảm bảo thứ tự cập nhật giá khi sự kiện đến dồn dập.",
        "Giữ UI ổn định trong tình huống reconnect mạng.",
        "Thiết kế luồng thông báo không gây nhiễu cho người dùng.",
      ],
      lessons: [
        "Realtime UX tốt phụ thuộc mạnh vào state model rõ ràng.",
        "Chuẩn hóa event contract giảm đáng kể lỗi tích hợp.",
        "Project nhóm cần review discipline để giữ chất lượng code.",
      ],
      nda: "Repo công khai, có thể chia sẻ code và walkthrough kỹ thuật trực tiếp.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Do phạm vi nội bộ, video demo chỉ chia sẻ trong buổi trao đổi trực tiếp.",
      gallery: [
        {
          title: "Auction Room",
          desc: "Giao diện phòng đấu giá hiển thị giá hiện tại theo thời gian thực.",
          image: "assets/cases/task-sprint.svg",
          alt: "Realtime auction room preview",
        },
        {
          title: "Live Bid Stream",
          desc: "Luồng cập nhật bid liên tục, đồng bộ theo sự kiện socket.",
          image: "assets/cases/task-dependency.svg",
          alt: "Realtime auction bid stream preview",
        },
        {
          title: "Auction Notifications",
          desc: "Thông báo thay đổi giá và trạng thái phiên đấu giá theo thời gian thực.",
          image: "assets/cases/task-board.svg",
          alt: "Realtime auction notification preview",
        },
        {
          title: "Bid History Panel",
          desc: "Theo dõi lịch sử đặt giá để kiểm chứng tính nhất quán của dữ liệu.",
          image: "assets/cases/task-insight.svg",
          alt: "Realtime auction bid history preview",
        },
      ],
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/thnkthuhigh/auction",
        },
      ],
    },

    "cloud-clipboard": {
      badge: "Public Case · Utility App",
      title: "Cloud Clipboard (bunker)",
      year: "2026",
      filters: ["frontend"],
      cardBadge: "Public",
      previewTag: "Utility Case",
      summary:
        "Ứng dụng clipboard tự host cho phép lưu text/ảnh, drag-drop upload và đồng bộ nhanh giữa nhiều thiết bị.",
      meta: [
        "Vai trò: Frontend-focused Developer",
        "Team: Solo",
        "Thời gian: Triển khai theo từng iteration ngắn",
        "Stack: Node.js + Express + SQLite + Vanilla JS",
      ],
      proof: [
        { value: "Self-hosted", label: "Triển khai linh hoạt trên VPS" },
        { value: "Text + Image", label: "Lưu và truy xuất nhanh nội dung" },
        { value: "Auto-sync", label: "Refresh dữ liệu định kỳ giữa thiết bị" },
        { value: "Upload 50MB", label: "Hỗ trợ file ảnh thực tế" },
      ],
      problem:
        "Copy dữ liệu giữa laptop/điện thoại thường rời rạc và thiếu một nơi lưu tạm tập trung cho text + image.",
      solution:
        "Xây ứng dụng clipboard web đơn giản, upload ảnh nhanh bằng paste/drag-drop và tổ chức nội dung theo category + pin.",
      storyImpact:
        "Rút ngắn thao tác chia sẻ nội dung giữa thiết bị, phù hợp nhu cầu dùng cá nhân hoặc team nhỏ cần công cụ nội bộ gọn nhẹ.",
      architectureDiagram: "assets/diagrams/task-workspace-arch.svg",
      architectureCaption:
        "Kiến trúc nhỏ gọn: Express API + SQLite storage + client-side interaction tập trung vào tốc độ thao tác.",
      architecture: [
        "REST API đơn giản cho create/read/update/delete clipboard items.",
        "Lưu metadata và nội dung bằng SQLite để triển khai nhẹ.",
        "Frontend tối ưu thao tác paste image, drag-drop và pin item.",
      ],
      technicalDecisions: [
        "Chọn SQLite để setup nhanh, dễ backup và phù hợp scale cá nhân/team nhỏ.",
        "Tách upload pipeline với Multer để kiểm soát file size/type rõ ràng.",
        "Giữ frontend thuần JS để giảm độ phức tạp khi bảo trì nhanh.",
      ],
      impact: [
        "Tăng tốc luồng lưu/chia sẻ snippet hằng ngày.",
        "Giảm phụ thuộc các công cụ third-party cho clipboard nội bộ.",
        "Dễ deploy lên VPS với chi phí thấp.",
      ],
      roleScope: [
        "Thiết kế UX thao tác nhanh cho text/image clipboard.",
        "Xây backend CRUD và upload handling.",
        "Chuẩn bị script deploy + vận hành cơ bản trên server.",
      ],
      evidence: [
        "README mô tả đầy đủ features và luồng deploy.",
        "Cấu trúc dự án rõ giữa backend, frontend và scripts.",
        "Có thể demo trực tiếp các flow paste, pin, category.",
      ],
      challenges: [
        "Giữ trải nghiệm upload ổn định cho nhiều định dạng ảnh.",
        "Tổ chức dữ liệu đơn giản nhưng vẫn dễ mở rộng theo category.",
        "Đảm bảo UX mượt trên desktop/mobile với thao tác nhanh.",
      ],
      lessons: [
        "Công cụ nội bộ nhỏ nhưng UX tốc độ cao tạo giá trị lớn.",
        "Thiết kế API tối giản giúp maintain lâu dài dễ hơn.",
        "Deploy scripts rõ ràng giúp tiết kiệm thời gian vận hành.",
      ],
      nda: "Repo public, có thể chia sẻ code đầy đủ và demo ngay.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Có thể bổ sung clip ngắn 60 giây để recruiter xem nhanh workflow chính.",
      gallery: [
        {
          title: "Clipboard Feed",
          desc: "Danh sách snippet text/ảnh được đồng bộ theo thời gian.",
          image: "assets/cases/task-board.svg",
          alt: "Cloud clipboard feed preview",
        },
        {
          title: "Image Paste & Upload",
          desc: "Hỗ trợ Ctrl+V và drag-drop để lưu ảnh nhanh.",
          image: "assets/cases/task-dependency.svg",
          alt: "Cloud clipboard upload preview",
        },
        {
          title: "Category & Pin",
          desc: "Phân loại nội dung và ghim item quan trọng lên đầu.",
          image: "assets/cases/task-sprint.svg",
          alt: "Cloud clipboard category and pin preview",
        },
        {
          title: "Cross-device Usage",
          desc: "Truy cập cùng một dữ liệu clipboard trên nhiều thiết bị.",
          image: "assets/cases/task-insight.svg",
          alt: "Cloud clipboard cross-device preview",
        },
      ],
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/thnkthuhigh/bunker",
        },
      ],
    },
  };

  const PROJECT_CASES_EN = {
    "ops-dashboard": {
      badge: "Public Case · Production SaaS",
      title: "Language Center SaaS (englishforkids.me)",
      summary:
        "A production SaaS platform for language centers, focused on role-based dashboards, finance workflows, and real-time synchronization.",
      meta: [
        "Role: Frontend Engineer (API/DevOps-aware)",
        "Team: Solo builder",
        "Duration: Multi-month iterative development",
        "Stack: React + TypeScript + Node.js + MongoDB + Socket.IO",
      ],
      proof: [
        { value: "50k+ LOC", label: "Production codebase scale" },
        { value: "822 tests", label: "Automated test coverage" },
        { value: "200+ APIs", label: "Implemented backend endpoints" },
        { value: "Live", label: "Running in production" },
      ],
      problem:
        "Operations were fragmented across enrollment, scheduling, finance, and payroll, with weak real-time visibility.",
      solution:
        "Designed a role-based SaaS architecture with domain-driven modules and real-time event flows for critical operations.",
      storyImpact:
        "Improved operational visibility and reduced manual synchronization across departments.",
      architectureCaption:
        "Domain boundaries + RBAC structure improve scalability while keeping workflows understandable.",
      architecture: [
        "Domain modules for academics, scheduling, finance, and payroll.",
        "RBAC for four main user roles with explicit permissions.",
        "Realtime sync for attendance, payment, and notifications.",
      ],
      technicalDecisions: [
        "TypeScript end-to-end for safer integrations.",
        "Role-first dashboard routing and permission guards.",
        "Domain-based API contracts for scalable team development.",
      ],
      impact: [
        "Centralized operations into one cohesive platform.",
        "Reduced cross-team handoff and data mismatch.",
        "Improved role-specific visibility and decision speed.",
      ],
      roleScope: [
        "Built key frontend workflows for role-based dashboards.",
        "Developed reusable table/form component patterns.",
        "Improved readability of dense operational data.",
      ],
      evidence: [
        "Live production demo at englishforkids.me.",
        "Public repository: thnkthuhigh/language-center-saas.",
        "Public repository with architecture and deployment documentation.",
        "Test and quality metrics documented in README.",
      ],
      challenges: [
        "Maintaining consistency while module count grew fast.",
        "Balancing delivery speed with production quality.",
        "Keeping realtime interactions stable under heavy usage.",
      ],
      lessons: [
        "Clear domain boundaries accelerate scaling.",
        "Documentation quality is a force multiplier.",
        "Quality gates must be designed from the beginning.",
      ],
      nda: "Public repo is used for technical showcase; real user data and production operational details remain protected.",
      videoNote:
        "You can set `videoEmbed` (YouTube) or `videoFile` (local MP4) to display a walkthrough.",
      gallery: [
        {
          title: "Operations Dashboard",
          desc: "Role-specific KPI overview for daily operations.",
          image: "assets/cases/ops-queue.svg",
          alt: "Language Center SaaS operations dashboard preview",
        },
        {
          title: "Academic & Revenue Analytics",
          desc: "Academic and financial analytics views for admins.",
          image: "assets/cases/ops-analytics.svg",
          alt: "Language Center SaaS analytics preview",
        },
        {
          title: "Role-based Workflows",
          desc: "Workflow boundaries by role with explicit access rules.",
          image: "assets/cases/ops-filter.svg",
          alt: "Language Center SaaS workflow preview",
        },
        {
          title: "Shared Component Patterns",
          desc: "Reusable table and form patterns across modules.",
          image: "assets/cases/ops-table.svg",
          alt: "Language Center SaaS shared components preview",
        },
      ],
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/thnkthuhigh/language-center-saas",
        },
        { label: "Live Demo", href: "https://www.englishforkids.me/" },
      ],
    },

    "ai-doc-formatter": {
      badge: "Core Case · Private Core + Public Showcase",
      title: "AI Doc Formatter / Proze AI",
      summary:
        "An AI document platform built with production discipline: AI editor, async export pipeline, multi-stage CI/CD, DigitalOcean deployment, and full observability.",
      meta: [
        "Role: Frontend Engineer (API/DevOps-aware)",
        "Team: Solo builder",
        "Duration: Multi-month implementation and hardening",
        "Stack: Next.js + TypeScript + FastAPI + Redis + Celery + Docker + GitHub Actions",
      ],
      proof: [
        { value: "10 CI jobs", label: "Quality, security, and e2e gates" },
        {
          value: "2 Deploy jobs",
          label: "DO deploy with health-check + rollback",
        },
        {
          value: "6 Compose variants",
          label: "dev/prod/staging/light/monitoring/blue-green",
        },
        {
          value: "6 SLOs",
          label: "latency, error rate, availability, circuit breaker",
        },
      ],
      problem:
        "Users need to turn raw drafts into polished documents quickly, but authoring, AI assistance, and export are often disconnected in typical tools.",
      solution:
        "Built a unified platform: AI analysis + block editor + async exports, backed by 10-job CI, branch-protection gates, deployment runbooks, and automated health-check rollback.",
      storyImpact:
        "Created an end-to-end writing workflow from raw input to publication-ready output with better consistency and lower manual effort.",
      architectureCaption:
        "A clear fullstack split between editor UX, AI/export backend services, and asynchronous job processing.",
      architecture: [
        "Next.js + TipTap frontend for authoring and AI-assisted editing.",
        "FastAPI backend with separated routers for AI, document, export, and research.",
        "Redis + Celery for background jobs, Docker Compose environment overlays, and Nginx reverse-proxy in production.",
      ],
      technicalDecisions: [
        "Strict TypeScript and schema validation to reduce boundary errors.",
        "Layered security middleware (CSRF, rate limiting, security headers).",
        "Multi-stage CI gates (lint/test/build/audit/e2e) with deploy rollback on failed health checks.",
      ],
      impact: [
        "Reduced deployment risk through formal release gates and runbooks.",
        "Improved export reliability with queue-based processing and preflight checks.",
        "Increased operational confidence via metrics, logs, and alert-driven monitoring.",
      ],
      roleScope: [
        "Designed and implemented core frontend/backend architecture.",
        "Built AI text operations, editor workflows, and export pipeline logic.",
        "Established release discipline: CI checks, branch protection, deploy scripts, and incident-oriented docs.",
      ],
      evidence: [
        "Private core repository: thnkthuhigh/ai-doc-formatter.",
        "Public showcase repository: thnkthuhigh/proze-ai (10 CI jobs, 2 deploy jobs, 6 SLOs).",
        "DevOps artifacts: deploy-do.sh, deployment runbook, blue-green strategy, monitoring docs.",
      ],
      challenges: [
        "Maintaining high export fidelity between editor preview and output files.",
        "Handling state stability during AI streaming and concurrent editing.",
        "Balancing rapid feature delivery with production reliability.",
      ],
      lessons: [
        "AI products require reliability and UX discipline beyond model calls.",
        "Strong module boundaries and docs scale solo execution effectively.",
        "Early quality gates reduce downstream bug-fix cost significantly.",
      ],
      nda: "`proze-ai` is the public showcase repository; the production core source is private in `ai-doc-formatter` and can be reviewed via technical walkthrough.",
      videoNote:
        "Public showcase is available; private core implementation can be presented in interview walkthrough.",
      gallery: [
        {
          title: "AI Editor Workspace",
          desc: "Block-based editing workspace with AI-assisted authoring.",
          image: "assets/cases/ops-table.svg",
          alt: "AI document editor workspace preview",
        },
        {
          title: "Document Intelligence",
          desc: "Document analysis and quality scoring workflow.",
          image: "assets/cases/ops-analytics.svg",
          alt: "AI document intelligence preview",
        },
        {
          title: "Export Pipeline",
          desc: "Status-aware multi-format export flow.",
          image: "assets/cases/task-board.svg",
          alt: "AI document export pipeline preview",
        },
        {
          title: "Architecture & Ops",
          desc: "Operational view of architecture, security, and CI/CD.",
          image: "assets/cases/task-insight.svg",
          alt: "AI document architecture and operations preview",
        },
      ],
      links: [
        { label: "Private Core (Walkthrough on request)" },
        {
          label: "Public Showcase",
          href: "https://github.com/thnkthuhigh/proze-ai",
        },
      ],
    },

    "b2b-workflow": {
      badge: "Private Case · NDA",
      title: "Private Internal Workflow Suite (NDA)",
      summary:
        "A private multi-step workflow system with schema-driven forms and role-based access controls.",
      meta: [
        "Role: Frontend Engineer (API/DevOps-aware)",
        "Team: 6-member cross-functional team",
        "Duration: 7 months",
        "Stack: Next.js + TypeScript",
      ],
      proof: [
        { value: "7 months", label: "Project duration" },
        { value: "6 members", label: "Cross-functional team" },
        { value: "NDA", label: "Data confidentiality scope" },
        { value: "Multi-role", label: "Permission-heavy workflows" },
      ],
      problem:
        "Approval flows were fragmented across screens and permission handling was inconsistent.",
      solution:
        "Implemented domain-based routes, schema-driven forms, and centralized role visibility rules.",
      storyImpact:
        "Reduced rework for new business rules and improved release stability in permission-heavy flows.",
      architectureCaption:
        "Schema engine and centralized permission mapping make workflow changes predictable.",
      architecture: [
        "Feature-sliced domains: workflow, approvals, reports.",
        "Schema-driven form rendering for reusable multi-step flows.",
        "Central permission map for consistent role behavior.",
      ],
      technicalDecisions: [
        "Schema-driven approach for easier business scaling.",
        "Centralized permission map to avoid scattered role checks.",
        "Domain-layer activity logging for audit and debugging.",
      ],
      impact: [
        "Lower rework when adding new workflows.",
        "Higher reliability in role-sensitive screens.",
        "Faster handoff between sprints.",
      ],
      roleScope: [
        "Redesigned core multi-step form workflows.",
        "Implemented role-based visibility and action gating.",
        "Built reusable schema component patterns.",
      ],
      evidence: [
        "Sanitized workflow architecture screenshots.",
        "Role matrix sample without sensitive details.",
        "Live private walkthrough during interviews.",
      ],
      challenges: [
        "Different departments required different state transitions.",
        "Sensitive data constraints under NDA.",
        "Regression control when schema changes frequently.",
      ],
      lessons: [
        "Schema-first approach scales faster than hardcoded flows.",
        "Clear role maps significantly reduce permission bugs.",
        "Audit logging is essential for internal products.",
      ],
      nda: "Source code and production data are NDA-protected. A private live walkthrough can be arranged.",
      videoNote:
        "Public video is not available due NDA; a live walkthrough can be provided in interview.",
      links: [
        { label: "NDA Repository" },
        { label: "Private Demo by Appointment" },
      ],
    },

    "hiring-landing": {
      badge: "Public Case · Product Monorepo",
      title: "Healthcare Clinic System",
      summary:
        "A multi-role clinic management system with doctor dashboard, smart queue handling, and consultation/prescription workflows.",
      meta: [
        "Role: Frontend Contributor",
        "Team: Course project with multiple roles",
        "Duration: Multi-sprint implementation",
        "Stack: React + TypeScript + PostgreSQL + Docker",
      ],
      proof: [
        { value: "Monorepo", label: "Modular code structure" },
        { value: "Multi-role", label: "Owner/Admin/Doctor/Patient" },
        { value: "Smart Queue", label: "Rule-based patient prioritization" },
        { value: "Swagger", label: "Clear API documentation" },
      ],
      problem:
        "Appointments, queue, and consultation flows were hard to track consistently in real time.",
      solution:
        "Built role-based dashboards with smart queue rules and explicit consultation state transitions.",
      storyImpact:
        "Improved queue handling speed and reduced operational fragmentation in clinic workflows.",
      architectureCaption:
        "Monorepo module boundaries separate doctor, patient, appointment, and operations domains.",
      architecture: [
        "Domain modules for doctor, patient, appointment, and prescriptions.",
        "Queue rules by source and status priority.",
        "API contracts aligned for parallel frontend/backend work.",
      ],
      technicalDecisions: [
        "TypeScript for safer UI state transitions.",
        "Explicit state design for queue and consultation actions.",
        "Dockerized setup for team consistency.",
      ],
      impact: [
        "Doctors can process queue state with less friction.",
        "Reduced manual state updates in consultation flow.",
        "Improved maintainability through domain modules.",
      ],
      roleScope: [
        "Designed doctor dashboard and queue interfaces.",
        "Implemented consultation-state UI components.",
        "Improved form clarity in high-stress medical operations.",
      ],
      evidence: [
        "Comprehensive README with quick-start and architecture.",
        "Swagger endpoints and environment setup guide.",
        "Live walkthrough available for interviews.",
      ],
      challenges: [
        "Keeping UX clear while patient data updates rapidly.",
        "Aligning queue priority rules with real operations.",
        "Preventing regressions when adding new role features.",
      ],
      lessons: [
        "Role-based UI must be backed by clear rule mapping.",
        "Monorepo reuse requires strict module boundaries.",
        "Strong setup docs dramatically improve onboarding.",
      ],
      nda: "Repository is public; real patient and production data are not exposed.",
      videoNote:
        "A concise walkthrough video can be added for faster recruiter review.",
      gallery: [
        {
          title: "Doctor Dashboard",
          desc: "Shift overview and patient status at a glance.",
          image: "assets/cases/hire-hero.svg",
          alt: "Healthcare clinic doctor dashboard preview",
        },
        {
          title: "Smart Queue Management",
          desc: "Priority queue behavior by operational rules.",
          image: "assets/cases/hire-jd.svg",
          alt: "Healthcare clinic queue preview",
        },
        {
          title: "Consultation Form",
          desc: "Structured consultation and diagnosis workflow.",
          image: "assets/cases/hire-form.svg",
          alt: "Healthcare consultation form preview",
        },
        {
          title: "Prescription Workflow",
          desc: "Validation-aware prescription flow and medicine state.",
          image: "assets/cases/hire-mobile.svg",
          alt: "Healthcare prescription workflow preview",
        },
      ],
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/thnkthuhigh/healthcare-clinic-system",
        },
      ],
    },

    "task-workspace": {
      badge: "Public Case · Realtime Platform",
      title: "RealTime Auction System",
      summary:
        "A real-time auction platform with live room updates, bid stream synchronization, and event-driven UI states.",
      meta: [
        "Role: Frontend Engineer (API/DevOps-aware)",
        "Team: 5-member project team",
        "Duration: Final-year specialization project",
        "Stack: React + TypeScript + Socket.IO + Redis + PostgreSQL",
      ],
      proof: [
        { value: "Realtime", label: "Live bidding over WebSocket" },
        { value: "5 members", label: "Team implementation scale" },
        { value: "Redis", label: "Realtime synchronization layer" },
        { value: "CI/CD", label: "Structured team workflow" },
      ],
      problem:
        "Auction rooms require low-latency updates and stable state consistency under concurrent bidding.",
      solution:
        "Implemented event-driven realtime UI with explicit bid-state sync and reconnect-safe interaction flow.",
      storyImpact:
        "Improved perceived responsiveness and reliability in high-concurrency auction sessions.",
      architectureCaption:
        "Hybrid REST + Socket architecture keeps auction state coherent across clients.",
      architecture: [
        "REST API for CRUD and Socket events for realtime actions.",
        "State split by auction room, bid stream, and notifications.",
        "Redis-backed sync support for event consistency.",
      ],
      technicalDecisions: [
        "Standardized event naming for reliable debugging.",
        "Separated UI state from server state to reduce race conditions.",
        "Schema validation for incoming event payloads.",
      ],
      impact: [
        "Faster and clearer live price updates for users.",
        "Lower UI inconsistency during burst bidding.",
        "Improved maintainability through flow-oriented modules.",
      ],
      roleScope: [
        "Built auction room and bid history interfaces.",
        "Handled loading/sync/reconnect UX for realtime flow.",
        "Aligned socket contracts with backend team.",
      ],
      evidence: [
        "Public repository with architecture explanation.",
        "Documented realtime stack and design decisions.",
        "Live demo walkthrough can be provided in interviews.",
      ],
      challenges: [
        "Preserving bid-order consistency under high event volume.",
        "Stabilizing UX during network reconnect scenarios.",
        "Avoiding notification overload while keeping users informed.",
      ],
      lessons: [
        "Realtime UX quality depends on clear state modeling.",
        "Event contract discipline reduces integration bugs.",
        "Team review rigor is critical in concurrent systems.",
      ],
      nda: "Repository is public; code and implementation details can be shared openly.",
      videoNote:
        "A short recorded demo can be added for faster recruiter screening.",
      gallery: [
        {
          title: "Auction Room",
          desc: "Live auction room with current price and bidder context.",
          image: "assets/cases/task-sprint.svg",
          alt: "Realtime auction room preview",
        },
        {
          title: "Live Bid Stream",
          desc: "Continuous bid event stream synchronized across users.",
          image: "assets/cases/task-dependency.svg",
          alt: "Realtime auction bid stream preview",
        },
        {
          title: "Auction Notifications",
          desc: "Status notifications for bid and auction state updates.",
          image: "assets/cases/task-board.svg",
          alt: "Realtime auction notifications preview",
        },
        {
          title: "Bid History Panel",
          desc: "Historical bid timeline for consistency verification.",
          image: "assets/cases/task-insight.svg",
          alt: "Realtime auction bid history preview",
        },
      ],
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/thnkthuhigh/auction",
        },
      ],
    },

    "cloud-clipboard": {
      badge: "Public Case · Utility App",
      title: "Cloud Clipboard (bunker)",
      summary:
        "A self-hosted cloud clipboard for storing text and images, with fast upload and multi-device access.",
      meta: [
        "Role: Frontend-focused Developer",
        "Team: Solo",
        "Duration: Incremental short iterations",
        "Stack: Node.js + Express + SQLite + Vanilla JS",
      ],
      proof: [
        { value: "Self-hosted", label: "Deployable on low-cost VPS" },
        { value: "Text + Image", label: "Unified clipboard content types" },
        { value: "Auto-sync", label: "Periodic refresh across devices" },
        { value: "50MB upload", label: "Practical image handling limit" },
      ],
      problem:
        "Cross-device text/image sharing is often fragmented and slow in daily workflow.",
      solution:
        "Built a lightweight web clipboard with paste/drag-drop upload, categories, and pinning for quick recall.",
      storyImpact:
        "Reduced friction when sharing snippets and media between personal devices or small teams.",
      architectureCaption:
        "Lean architecture: Express API + SQLite storage + interaction-focused client UI.",
      architecture: [
        "Simple CRUD API for clipboard items.",
        "SQLite for lightweight local persistence and easy backup.",
        "Client optimized for paste image, drag-drop, and pin action speed.",
      ],
      technicalDecisions: [
        "SQLite chosen for simple setup and maintenance.",
        "Multer upload pipeline for explicit file-size/type control.",
        "Vanilla JS frontend to keep complexity low and iteration fast.",
      ],
      impact: [
        "Faster daily capture/share workflow for snippets.",
        "Reduced dependency on third-party clipboard tools.",
        "Low-cost deployment and straightforward maintenance.",
      ],
      roleScope: [
        "Designed UX for high-speed text/image capture.",
        "Implemented backend CRUD and upload handling.",
        "Prepared deployment scripts for server setup.",
      ],
      evidence: [
        "README with features and deployment instructions.",
        "Clear repo structure across app and deploy scripts.",
        "Live walkthrough possible for key interaction flows.",
      ],
      challenges: [
        "Maintaining upload stability across image formats.",
        "Keeping data model simple while supporting categories and pinning.",
        "Ensuring responsive interaction across device sizes.",
      ],
      lessons: [
        "Small internal tools can deliver major workflow value.",
        "Minimal APIs are easier to maintain over time.",
        "Operational scripts should be part of product quality.",
      ],
      nda: "Public repository with shareable implementation details.",
      videoNote:
        "A short 60-second demo can be added for recruiter quick scan.",
      gallery: [
        {
          title: "Clipboard Feed",
          desc: "Unified feed for text snippets and image items.",
          image: "assets/cases/task-board.svg",
          alt: "Cloud clipboard feed preview",
        },
        {
          title: "Image Paste & Upload",
          desc: "Fast paste and drag-drop upload interactions.",
          image: "assets/cases/task-dependency.svg",
          alt: "Cloud clipboard upload preview",
        },
        {
          title: "Category & Pin",
          desc: "Categorization and pinning for priority items.",
          image: "assets/cases/task-sprint.svg",
          alt: "Cloud clipboard category preview",
        },
        {
          title: "Cross-device Usage",
          desc: "Access the same clipboard content on multiple devices.",
          image: "assets/cases/task-insight.svg",
          alt: "Cloud clipboard cross-device preview",
        },
      ],
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/thnkthuhigh/bunker",
        },
      ],
    },
  };

  const PROJECT_CARD_ORDER = [
    "ops-dashboard",
    "ai-doc-formatter",
    "hiring-landing",
    "task-workspace",
    "cloud-clipboard",
    "b2b-workflow",
  ];

  const UI_TEXT = {
    vi: {
      themeLabel: "Theme",
      detailButton: "Xem case study đầy đủ",
      stackFallback: "Tech stack cập nhật trong case study.",
      notFoundTitle: "Không tìm thấy case study",
      notFoundSummary:
        "ID dự án không hợp lệ hoặc chưa được cấu hình. Vui lòng quay lại trang chính để chọn dự án hợp lệ.",
      formMissing: "Vui lòng điền đầy đủ thông tin trước khi gửi.",
      formOpening: "Đang mở ứng dụng email...",
      menuOpen: "Mở menu",
      menuClose: "Đóng menu",
      mobileMenuAria: "Điều hướng di động",
    },
    en: {
      themeLabel: "Theme",
      detailButton: "View full case study",
      stackFallback: "Tech stack will be updated in this case study.",
      notFoundTitle: "Case study not found",
      notFoundSummary:
        "Invalid project ID or case data is not configured yet. Please return to the portfolio and pick a valid project.",
      formMissing: "Please complete all required fields before sending.",
      formOpening: "Opening your email client...",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      mobileMenuAria: "Mobile navigation",
    },
  };

  const INDEX_TRANSLATIONS = {
    vi: [
      { selector: "a.skip-link", text: "Bỏ qua điều hướng" },
      { selector: '.site-nav .nav-link[href="#about"]', text: "Giới thiệu" },
      { selector: '.site-nav .nav-link[href="#skills"]', text: "Kỹ năng" },
      { selector: '.site-nav .nav-link[href="cv.html"]', text: "CV" },
      { selector: '.site-nav .nav-link[href="#projects"]', text: "Dự án" },
      {
        selector: '.site-nav .nav-link[href="#experience"]',
        text: "Hành trình",
      },
      { selector: '.site-nav .nav-link[href="#contact"]', text: "Liên hệ" },
      {
        selector: '#mobile-menu .mobile-link[href="#about"]',
        text: "Giới thiệu",
      },
      {
        selector: '#mobile-menu .mobile-link[href="#skills"]',
        text: "Kỹ năng",
      },
      {
        selector: '#mobile-menu .mobile-link[href="cv.html"]',
        text: "CV",
      },
      {
        selector: '#mobile-menu .mobile-link[href="#projects"]',
        text: "Dự án",
      },
      {
        selector: '#mobile-menu .mobile-link[href="#experience"]',
        text: "Hành trình",
      },
      {
        selector: '#mobile-menu .mobile-link[href="#contact"]',
        text: "Liên hệ",
      },
      {
        selector: ".hero-content .eyebrow",
        text: "Sinh viên năm 4 CNTT · Tập trung Frontend",
      },
      {
        selector: ".hero-content h1",
        html: true,
        text: 'Portfolio thực tập Frontend: <span class="headline-accent">code chắc</span>, UI rõ, ship feature ổn định.',
      },
      {
        selector: ".hero-lead",
        html: true,
        text: "Mình là <strong>Nguyễn Chí Thanh</strong>, sinh viên năm 4 ngành CNTT. Mình tập trung Frontend Product Engineering; có backend implementation (API/realtime/queue) và DevOps đủ để đưa feature lên production.",
      },
      { selector: ".hero-actions .btn-primary", text: "Xem dự án nổi bật" },
      { selector: ".hero-actions .btn-secondary", text: "Mở CV ngay" },
      { selector: ".hero-actions .btn-tertiary", text: "Tải CV PDF" },
      {
        selector: ".hero-proof-chips span:nth-child(1)",
        text: "6 case study projects",
      },
      {
        selector: ".hero-proof-chips span:nth-child(2)",
        text: "Frontend + delivery discipline",
      },
      {
        selector: ".hero-proof-chips span:nth-child(3)",
        text: "Private repo friendly",
      },
      {
        selector: ".hero-proof-chips span:nth-child(4)",
        text: "Interview ready",
      },
      {
        selector: ".quick-contact span:last-child",
        text: "Tìm cơ hội Internship / Junior Frontend",
      },
      { selector: ".panel-title", text: "Tóm tắt nhanh" },
      { selector: ".hero-kpi li:nth-child(1) .kpi-value", text: "Năm 4" },
      {
        selector: ".hero-kpi li:nth-child(1) .kpi-label",
        text: "Sinh viên Khoa học máy tính",
      },
      {
        selector: ".hero-kpi li:nth-child(2) .kpi-value",
        text: "6 case studies",
      },
      {
        selector: ".hero-kpi li:nth-child(2) .kpi-label",
        text: "8 public repos + 2 private cores",
      },
      { selector: ".hero-kpi li:nth-child(3) .kpi-value", text: "Stack chính" },
      {
        selector: ".hero-kpi li:nth-child(3) .kpi-label",
        text: "React, Next.js, TypeScript, API/Realtime integration",
      },
      {
        selector: ".availability-text",
        text: "Sẵn sàng phỏng vấn + test kỹ thuật",
      },
      {
        selector: ".hero-verified-note",
        text: "Số liệu public được đối chiếu từ GitHub Repositories tab.",
      },
      { selector: ".hero-cv-card .hero-rail-title", text: "CV nhanh" },
      {
        selector: ".hero-cv-note",
        text: "CV tuyển dụng: mở online hoặc tải PDF ngay (1 click).",
      },
      { selector: ".hero-cv-actions a:nth-child(1)", text: "CV ATS-safe" },
      { selector: ".hero-cv-actions a:nth-child(2)", text: "CV Premium" },
      {
        selector: ".hero-cv-actions a:nth-child(3)",
        text: "CV English",
      },
      {
        selector: ".hero-cv-actions a:nth-child(4)",
        text: "CV ATS English",
      },
      {
        selector: ".hero-cv-actions a:nth-child(5)",
        text: "Tải CV PDF (1 click)",
      },
      { selector: ".hero-case-rail .hero-rail-title", text: "Case nổi bật" },
      { selector: ".cv-inline-actions a:nth-child(1)", text: "CV ATS-safe" },
      { selector: ".cv-inline-actions a:nth-child(2)", text: "CV Premium" },
      {
        selector: ".cv-inline-actions a:nth-child(3)",
        text: "CV English",
      },
      {
        selector: ".cv-inline-actions a:nth-child(4)",
        text: "CV ATS English",
      },
      {
        selector: ".cv-inline-actions a:nth-child(5)",
        text: "Tải PDF (1 click)",
      },
      { selector: "#cv-document .section-label", text: "CV Đầy Đủ" },
      {
        selector: "#cv-document .section-title",
        text: "CV sẵn sàng cho recruiter xem ngay",
      },
      {
        selector: "#cv-document .section-subtitle",
        text: "Đây là bản CV gói gọn thông tin cốt lõi để tuyển dụng. Bạn có thể mở online hoặc tải PDF trực tiếp.",
      },
      { selector: ".lane-card .section-label", text: "Làn tuyển dụng nhanh" },
      { selector: ".trust-item:nth-child(1) h3", text: "Tư duy theo dự án" },
      {
        selector: ".trust-item:nth-child(1) p",
        text: "Không nói chung chung, luôn đi từ bài toán tới kết quả.",
      },
      {
        selector: ".trust-item:nth-child(2) h3",
        text: "Code sạch và có tổ chức",
      },
      {
        selector: ".trust-item:nth-child(2) p",
        text: "Ưu tiên maintainability, dễ review, dễ mở rộng.",
      },
      {
        selector: ".trust-item:nth-child(3) h3",
        text: "Hợp tác tốt trong team",
      },
      {
        selector: ".trust-item:nth-child(3) p",
        text: "Giao tiếp rõ, chủ động nhận feedback và iterate nhanh.",
      },
      { selector: ".lane-card h2", text: "Quét nhanh hồ sơ trong 60 giây" },
      {
        selector: ".lane-card > div p:last-of-type",
        text: "Nếu bạn cần ra quyết định nhanh, hãy đi theo 3 mục dưới đây: CV snapshot, case study nổi bật và thông tin liên hệ để đặt lịch demo private project.",
      },
      { selector: ".lane-links a:nth-child(1)", text: "1. CV Full" },
      { selector: ".lane-links a:nth-child(2)", text: "2. Case Studies" },
      {
        selector: ".lane-links a:nth-child(3)",
        text: "3. Contact / Interview",
      },
      { selector: "#about .section-label", text: "Giới thiệu" },
      {
        selector: "#about .section-title",
        text: "SV năm 4 nhưng có thể đóng góp gì ngay?",
      },
      {
        selector: "#about .about-content p:nth-child(1)",
        text: "Mình không dùng portfolio để “trang trí”, mà dùng để thể hiện cách giải quyết vấn đề. Mỗi project đều có bối cảnh, ràng buộc, quyết định kỹ thuật và kết quả cụ thể.",
      },
      {
        selector: "#about .about-content p:nth-child(2)",
        text: "Trong team, mình có thể nhận các task frontend production-level: xây component chuẩn, tích hợp API, tối ưu UX và xử lý lỗi giao diện theo checklist rõ ràng.",
      },
      { selector: "#resume .section-label", text: "CV Snapshot" },
      {
        selector: "#resume .section-title",
        text: "Thông tin CV recruiter cần trong 30 giây",
      },
      { selector: "#fit .section-label", text: "JD Fit" },
      {
        selector: "#fit .section-title",
        text: "Mức độ phù hợp cho Internship / Junior Frontend",
      },
      {
        selector: "#fit .section-subtitle",
        text: "Frontend là trọng tâm; backend implementation được chứng minh qua case study thực tế.",
      },
      {
        selector:
          "#fit .section-head + .fit-grid + .section-head .section-label",
        text: "Sẵn sàng cho Junior",
      },
      {
        selector:
          "#fit .section-head + .fit-grid + .section-head .section-title",
        text: "Vì sao có thể đóng góp ngay từ sprint đầu",
      },
      { selector: "#faq .section-label", text: "FAQ tuyển dụng" },
      {
        selector: "#faq .section-title",
        text: "Một số câu hỏi nhà tuyển dụng hay hỏi",
      },
      { selector: "#skills .section-label", text: "Kỹ năng" },
      {
        selector: "#skills .section-title",
        text: "Stack tập trung cho môi trường product",
      },
      { selector: "#projects .section-label", text: "Dự án" },
      {
        selector: "#projects .section-title",
        text: "Case studies dành cho nhà tuyển dụng",
      },
      {
        selector: "#projects .section-subtitle",
        text: "Tập trung vào vấn đề, giải pháp và kết quả, không làm phô hiệu ứng.",
      },
      { selector: "#experience .section-label", text: "Hành trình" },
      {
        selector: "#experience .section-title",
        text: "Các cột mốc học tập và thực chiến dự án",
      },
      {
        selector:
          "#experience .section-head + .timeline + .section-head .section-label",
        text: "Cách làm việc",
      },
      {
        selector:
          "#experience .section-head + .timeline + .section-head .section-title",
        text: "Quy trình 4 bước khi nhận một feature",
      },
      { selector: "#contact .section-label", text: "Liên hệ" },
      {
        selector: "#contact .section-title",
        text: "Phù hợp vị trí nào, mình có thể trao đổi ngay",
      },
      {
        selector: ".contact-lead",
        text: "Mình ưu tiên vị trí Internship / Junior Frontend theo hướng Product Engineering. Có thể gửi CV PDF, transcript và walkthrough dự án private qua email theo yêu cầu.",
      },
      {
        selector: "#about .about-list li:nth-child(1)",
        text: "Đọc hiểu codebase nhanh và tự tách task rõ ràng.",
      },
      {
        selector: "#about .about-list li:nth-child(2)",
        text: "Viết UI có structure để người khác maintain được.",
      },
      {
        selector: "#about .about-list li:nth-child(3)",
        text: "Ưu tiên hiệu năng và accessibility ngay từ đầu.",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(1) h3",
        text: "6 real case studies",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(1) p",
        text: "Có public và private project, trình bày được decision từ problem đến impact.",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(2) h3",
        text: "Backend implementation strength",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(2) p",
        text: "Không chỉ làm UI: triển khai được API, realtime/queue flow và giữ release discipline ở mức production cơ bản.",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(3) h3",
        text: "Production architecture focus",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(3) p",
        text: "Tổ chức code theo module, ưu tiên maintainability và release safety khi dự án tăng độ phức tạp.",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(4) h3",
        text: "Ready for code test",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(4) p",
        text: "Sẵn sàng nhận test task, walkthrough kiến trúc và live coding khi cần.",
      },
      { selector: ".github-proof h3", text: "GitHub Proof" },
      {
        selector: ".github-proof p",
        text: "Có thể xem thẳng docs/repo để xác minh CI jobs, deploy workflow, Docker variants, health-check/rollback và monitoring artifacts.",
      },
      {
        selector: ".github-proof a",
        text: "Xem GitHub contributions, CI/CD & deploy evidence",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(1) h3",
        text: "Có thể làm bài test kỹ thuật không?",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(1) p",
        text: "Có, sẵn sàng làm test task và giải thích approach chi tiết.",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(2) h3",
        text: "Có thể demo project private không?",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(2) p",
        text: "Có thể demo trực tiếp trong buổi phỏng vấn theo phạm vi NDA.",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(3) h3",
        text: "Có thể làm part-time không?",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(3) p",
        text: "Có, linh hoạt lịch part-time/full-time theo giai đoạn học kỳ.",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(1) h3",
        text: "Frontend Engineering",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(1) li:nth-child(1)",
        text: "React, Next.js, TypeScript",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(1) li:nth-child(2)",
        text: "State management và component architecture",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(1) li:nth-child(3)",
        text: "Animation có kiểm soát, ưu tiên UX",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(2) h3",
        text: "UI System & Quality",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(2) li:nth-child(1)",
        text: "Design tokens, responsive system",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(2) li:nth-child(2)",
        text: "Accessibility chuẩn thực tế",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(2) li:nth-child(3)",
        text: "Performance tuning theo Core Web Vitals",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(3) h3",
        text: "Collaboration",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(3) li:nth-child(1)",
        text: "Git workflow, review checklist",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(3) li:nth-child(2)",
        text: "Viết tài liệu kỹ thuật ngắn gọn",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(3) li:nth-child(3)",
        text: "Làm việc chặt với QA, PM, Designer",
      },
      {
        selector: ".process-grid .process-card:nth-child(1) h3",
        text: "Hiểu đúng bài toán",
      },
      {
        selector: ".process-grid .process-card:nth-child(1) p",
        text: "Chốt rõ user flow, success metric, phạm vi và rủi ro.",
      },
      {
        selector: ".process-grid .process-card:nth-child(2) h3",
        text: "Thiết kế kỹ thuật",
      },
      {
        selector: ".process-grid .process-card:nth-child(2) p",
        text: "Tách component, state, API contract trước khi code.",
      },
      {
        selector: ".process-grid .process-card:nth-child(3) h3",
        text: "Triển khai & review",
      },
      {
        selector: ".process-grid .process-card:nth-child(3) p",
        text: "Code sạch, test điểm rủi ro cao, review theo checklist.",
      },
      {
        selector: ".process-grid .process-card:nth-child(4) h3",
        text: "Đo lường sau release",
      },
      {
        selector: ".process-grid .process-card:nth-child(4) p",
        text: "Đọc số liệu thật rồi tối ưu vòng tiếp theo.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) .timeline-period",
        text: "2026 - Hiện tại",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) .timeline-main h3",
        text: "Sinh viên năm 4 · Xây portfolio hướng tuyển dụng",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) .timeline-company",
        text: "Định hướng Frontend / Product Engineering",
      },
      {
        selector:
          ".timeline .timeline-item:nth-child(1) .timeline-main p:nth-of-type(2)",
        text: "Tập trung hệ thống hóa 6 case study theo chuẩn recruiter: problem, constraints, kiến trúc, kết quả và bài học kỹ thuật.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) li:nth-child(1)",
        text: "Chuẩn hóa template case-study cho cả public và private repo.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) li:nth-child(2)",
        text: "Rèn khả năng trình bày quyết định kỹ thuật ngắn gọn, rõ ràng.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) .timeline-period",
        text: "2025 - 2026",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) .timeline-main h3",
        text: "Đồ án và dự án nhóm tại trường",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) .timeline-company",
        text: "Team 3-6 thành viên",
      },
      {
        selector:
          ".timeline .timeline-item:nth-child(2) .timeline-main p:nth-of-type(2)",
        text: "Triển khai các dự án có độ phức tạp tăng dần: dashboard, workflow nội bộ, nền tảng y tế, realtime auction.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) li:nth-child(1)",
        text: "Xây component tái sử dụng và quy ước code review trong nhóm.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) li:nth-child(2)",
        text: "Tự kiểm thử responsive, accessibility và hiệu năng cơ bản.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) .timeline-period",
        text: "2023 - 2025",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) .timeline-main h3",
        text: "Nền tảng kỹ thuật",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) .timeline-company",
        text: "Luyện thuật toán + web fundamentals",
      },
      {
        selector:
          ".timeline .timeline-item:nth-child(3) .timeline-main p:nth-of-type(2)",
        text: "Rèn nền tảng HTML/CSS/JavaScript, sau đó chuyển sang React và TypeScript để làm các bài toán sản phẩm thực tế hơn.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) li:nth-child(1)",
        text: "Thói quen viết code có tổ chức, tách component rõ ràng.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) li:nth-child(2)",
        text: "Luyện tư duy phân tích bài toán trước khi code.",
      },
      {
        selector: '.project-filters .filter-btn[data-filter="all"]',
        text: "Tất cả",
      },
      {
        selector: '.project-filters .filter-btn[data-filter="frontend"]',
        text: "Frontend",
      },
      {
        selector: '.project-filters .filter-btn[data-filter="product"]',
        text: "Product",
      },
      {
        selector: '.project-filters .filter-btn[data-filter="private"]',
        text: "Private / NDA",
      },
      {
        selector: ".projects-note",
        html: true,
        text: "Mỗi dự án đều có phần <strong>case study</strong> riêng. Với repo private/NDA, bạn vẫn xem được bối cảnh, kiến trúc, quyết định kỹ thuật và kết quả triển khai.",
      },
      {
        selector: ".contact-quick-actions .btn-primary",
        text: "Đặt lịch phỏng vấn",
      },
      {
        selector: ".contact-quick-actions .btn-secondary",
        text: "Trao đổi công việc",
      },
      { selector: ".contact-list li:nth-child(1) span", text: "Email" },
      { selector: ".contact-list li:nth-child(2) span", text: "Điện thoại" },
      { selector: ".contact-list li:nth-child(3) span", text: "LinkedIn" },
      { selector: ".contact-list li:nth-child(4) span", text: "GitHub" },
      { selector: "#contact-form h3", text: "Gửi lời nhắn nhanh" },
      {
        selector: "#contact-form .form-note",
        text: "Form sẽ mở email client với nội dung đã điền, để đảm bảo bạn gửi đúng người ngay lập tức.",
      },
      { selector: '#contact-form label[for="name"]', text: "Họ tên" },
      { selector: '#contact-form label[for="email"]', text: "Email" },
      { selector: '#contact-form label[for="subject"]', text: "Chủ đề" },
      { selector: '#contact-form label[for="message"]', text: "Nội dung" },
      {
        selector: '#contact-form button[type="submit"]',
        text: "Mở email để gửi",
      },
      {
        selector: ".site-footer .footer-inner p",
        html: true,
        text: '© <span id="current-year"></span> Nguyễn Chí Thanh. Portfolio for recruitment.',
      },
      { selector: ".site-footer .back-top", text: "Về đầu trang" },
    ],
    en: [
      { selector: "a.skip-link", text: "Skip navigation" },
      { selector: '.site-nav .nav-link[href="#about"]', text: "About" },
      { selector: '.site-nav .nav-link[href="#skills"]', text: "Skills" },
      { selector: '.site-nav .nav-link[href="cv.html"]', text: "CV" },
      { selector: '.site-nav .nav-link[href="#projects"]', text: "Projects" },
      { selector: '.site-nav .nav-link[href="#experience"]', text: "Journey" },
      { selector: '.site-nav .nav-link[href="#contact"]', text: "Contact" },
      { selector: '#mobile-menu .mobile-link[href="#about"]', text: "About" },
      { selector: '#mobile-menu .mobile-link[href="#skills"]', text: "Skills" },
      {
        selector: '#mobile-menu .mobile-link[href="cv.html"]',
        text: "CV",
      },
      {
        selector: '#mobile-menu .mobile-link[href="#projects"]',
        text: "Projects",
      },
      {
        selector: '#mobile-menu .mobile-link[href="#experience"]',
        text: "Journey",
      },
      {
        selector: '#mobile-menu .mobile-link[href="#contact"]',
        text: "Contact",
      },
      {
        selector: ".hero-content .eyebrow",
        text: "Final-year CS Student · Software Engineer Intern Track",
      },
      {
        selector: ".hero-content h1",
        html: true,
        text: 'Software Engineer internship portfolio: <span class="headline-accent">solid code</span>, clear UI, reliable feature delivery.',
      },
      {
        selector: ".hero-lead",
        html: true,
        text: "I’m <strong>Nguyễn Chí Thanh</strong>, a final-year CS student focused on Frontend Product Engineering. I also implement backend flows (API/realtime/queue) and use DevOps basics to ship features to production.",
      },
      {
        selector: ".hero-actions .btn-primary",
        text: "View featured projects",
      },
      { selector: ".hero-actions .btn-secondary", text: "Open CV now" },
      { selector: ".hero-actions .btn-tertiary", text: "Download CV PDF" },
      {
        selector: ".hero-proof-chips span:nth-child(1)",
        text: "6 case study projects",
      },
      {
        selector: ".hero-proof-chips span:nth-child(2)",
        text: "Frontend + delivery discipline",
      },
      {
        selector: ".hero-proof-chips span:nth-child(3)",
        text: "Private repo friendly",
      },
      {
        selector: ".hero-proof-chips span:nth-child(4)",
        text: "Interview ready",
      },
      {
        selector: ".quick-contact span:last-child",
        text: "Seeking Internship / Junior Frontend opportunities",
      },
      { selector: ".panel-title", text: "Quick Summary" },
      { selector: ".hero-kpi li:nth-child(1) .kpi-value", text: "Final Year" },
      {
        selector: ".hero-kpi li:nth-child(1) .kpi-label",
        text: "Computer Science Student",
      },
      {
        selector: ".hero-kpi li:nth-child(2) .kpi-value",
        text: "6 case studies",
      },
      {
        selector: ".hero-kpi li:nth-child(2) .kpi-label",
        text: "8 public repos + 2 private cores",
      },
      { selector: ".hero-kpi li:nth-child(3) .kpi-value", text: "Core stack" },
      {
        selector: ".hero-kpi li:nth-child(3) .kpi-label",
        text: "React, Next.js, TypeScript, API/realtime integration",
      },
      {
        selector: ".availability-text",
        text: "Available for interview and technical test",
      },
      {
        selector: ".hero-verified-note",
        text: "Public figures are cross-checked from the GitHub Repositories tab.",
      },
      { selector: ".hero-cv-card .hero-rail-title", text: "Quick CV" },
      {
        selector: ".hero-cv-note",
        text: "Recruiter CV: view online or download PDF instantly (1 click).",
      },
      { selector: ".hero-cv-actions a:nth-child(1)", text: "ATS-safe CV" },
      { selector: ".hero-cv-actions a:nth-child(2)", text: "Premium CV" },
      {
        selector: ".hero-cv-actions a:nth-child(3)",
        text: "English CV",
      },
      {
        selector: ".hero-cv-actions a:nth-child(4)",
        text: "ATS English CV",
      },
      {
        selector: ".hero-cv-actions a:nth-child(5)",
        text: "Download CV PDF (1 click)",
      },
      { selector: ".hero-case-rail .hero-rail-title", text: "Featured Cases" },
      { selector: ".cv-inline-actions a:nth-child(1)", text: "ATS-safe CV" },
      { selector: ".cv-inline-actions a:nth-child(2)", text: "Premium CV" },
      {
        selector: ".cv-inline-actions a:nth-child(3)",
        text: "English CV",
      },
      {
        selector: ".cv-inline-actions a:nth-child(4)",
        text: "ATS English CV",
      },
      {
        selector: ".cv-inline-actions a:nth-child(5)",
        text: "Download PDF (1 click)",
      },
      { selector: "#cv-document .section-label", text: "Full CV" },
      {
        selector: "#cv-document .section-title",
        text: "Recruiter-ready CV available instantly",
      },
      {
        selector: "#cv-document .section-subtitle",
        text: "This CV contains key hiring information. Open it online or download PDF directly.",
      },
      { selector: ".lane-card .section-label", text: "Recruiter Fast Lane" },
      {
        selector: ".trust-item:nth-child(1) h3",
        text: "Project-first mindset",
      },
      {
        selector: ".trust-item:nth-child(1) p",
        text: "Always start from concrete problems and measurable outcomes.",
      },
      {
        selector: ".trust-item:nth-child(2) h3",
        text: "Clean, structured code",
      },
      {
        selector: ".trust-item:nth-child(2) p",
        text: "Prioritize maintainability, reviewability, and scalability.",
      },
      {
        selector: ".trust-item:nth-child(3) h3",
        text: "Strong team collaboration",
      },
      {
        selector: ".trust-item:nth-child(3) p",
        text: "Clear communication, fast feedback loops, and rapid iteration.",
      },
      { selector: ".lane-card h2", text: "Scan this profile in 60 seconds" },
      {
        selector: ".lane-card > div p:last-of-type",
        text: "If you need a fast hiring signal, start with these 3 blocks: CV snapshot, featured case studies, and contact details for private project walkthrough.",
      },
      { selector: ".lane-links a:nth-child(1)", text: "1. Full CV" },
      { selector: ".lane-links a:nth-child(2)", text: "2. Case Studies" },
      {
        selector: ".lane-links a:nth-child(3)",
        text: "3. Contact / Interview",
      },
      { selector: "#about .section-label", text: "About" },
      {
        selector: "#about .section-title",
        text: "What can a final-year student contribute right away?",
      },
      {
        selector: "#about .about-content p:nth-child(1)",
        text: "I do not use this portfolio as decoration. Each project shows context, constraints, technical decisions, and real outcomes.",
      },
      {
        selector: "#about .about-content p:nth-child(2)",
        text: "In a team, I can handle production-level frontend tasks: building maintainable components, integrating APIs, improving UX, and fixing UI issues with clear quality checklists.",
      },
      { selector: "#resume .section-label", text: "CV Snapshot" },
      {
        selector: "#resume .section-title",
        text: "CV information recruiters need in 30 seconds",
      },
      { selector: "#fit .section-label", text: "JD Fit" },
      {
        selector: "#fit .section-title",
        text: "Fit for Internship / Junior Frontend roles",
      },
      {
        selector: "#fit .section-subtitle",
        text: "Frontend is the primary track; backend implementation is evidenced through real case studies.",
      },
      {
        selector:
          "#fit .section-head + .fit-grid + .section-head .section-label",
        text: "Why I’m Junior-Ready",
      },
      {
        selector:
          "#fit .section-head + .fit-grid + .section-head .section-title",
        text: "Why I can contribute from the first sprint",
      },
      { selector: "#faq .section-label", text: "Recruiter FAQ" },
      { selector: "#faq .section-title", text: "Common recruiter questions" },
      { selector: "#skills .section-label", text: "Skills" },
      {
        selector: "#skills .section-title",
        text: "Stack focused for product environments",
      },
      { selector: "#projects .section-label", text: "Projects" },
      {
        selector: "#projects .section-title",
        text: "Case studies for recruiters",
      },
      {
        selector: "#projects .section-subtitle",
        text: "Focused on problem, solution, and impact. No unnecessary visual noise.",
      },
      { selector: "#experience .section-label", text: "Journey" },
      {
        selector: "#experience .section-title",
        text: "Learning and project execution milestones",
      },
      {
        selector:
          "#experience .section-head + .timeline + .section-head .section-label",
        text: "Work Process",
      },
      {
        selector:
          "#experience .section-head + .timeline + .section-head .section-title",
        text: "My 4-step process for shipping a feature",
      },
      { selector: "#contact .section-label", text: "Contact" },
      {
        selector: "#contact .section-title",
        text: "If the role fits, we can discuss immediately",
      },
      {
        selector: ".contact-lead",
        text: "I’m seeking Internship / Junior Frontend roles with strong product engineering ownership. CV PDF, transcript, and private-project walkthrough can be shared by email.",
      },
      {
        selector: "#about .about-list li:nth-child(1)",
        text: "I can read existing codebases quickly and break tasks down clearly.",
      },
      {
        selector: "#about .about-list li:nth-child(2)",
        text: "I build structured UI components that others can maintain easily.",
      },
      {
        selector: "#about .about-list li:nth-child(3)",
        text: "I prioritize performance and accessibility from the start.",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(1) h3",
        text: "6 real case studies",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(1) p",
        text: "Public and private projects with clear narrative from problem to impact.",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(2) h3",
        text: "Backend implementation strength",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(2) p",
        text: "Beyond UI delivery, I can implement API/realtime/queue flows and keep release discipline for production-ready features.",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(3) h3",
        text: "Production architecture focus",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(3) p",
        text: "I structure code in modules, prioritizing maintainability and release safety as project complexity grows.",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(4) h3",
        text: "Ready for code test",
      },
      {
        selector: ".junior-ready-grid .jr-card:nth-child(4) p",
        text: "Available for test tasks, architecture walkthroughs, and live coding.",
      },
      { selector: ".github-proof h3", text: "GitHub Proof" },
      {
        selector: ".github-proof p",
        text: "You can directly verify CI jobs, deployment workflow, Docker variants, health-check/rollback flow, and monitoring artifacts from the repos/docs.",
      },
      {
        selector: ".github-proof a",
        text: "View GitHub contributions, CI/CD & deployment evidence",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(1) h3",
        text: "Can you take a technical test?",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(1) p",
        text: "Yes. I can complete a test task and explain my approach in detail.",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(2) h3",
        text: "Can you demo private projects?",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(2) p",
        text: "Yes. I can provide a live private walkthrough within NDA scope.",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(3) h3",
        text: "Are you available part-time?",
      },
      {
        selector: ".faq-grid .faq-item:nth-child(3) p",
        text: "Yes. Flexible part-time/full-time schedule depending on semester timing.",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(1) h3",
        text: "Frontend Engineering",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(1) li:nth-child(1)",
        text: "React, Next.js, TypeScript",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(1) li:nth-child(2)",
        text: "State management and component architecture",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(1) li:nth-child(3)",
        text: "Controlled animation with UX-first priorities",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(2) h3",
        text: "UI System & Quality",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(2) li:nth-child(1)",
        text: "Design tokens and responsive systems",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(2) li:nth-child(2)",
        text: "Practical accessibility standards",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(2) li:nth-child(3)",
        text: "Performance tuning via Core Web Vitals",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(3) h3",
        text: "Collaboration",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(3) li:nth-child(1)",
        text: "Git workflow and review checklist",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(3) li:nth-child(2)",
        text: "Concise technical documentation",
      },
      {
        selector: ".skills-grid .skill-card:nth-child(3) li:nth-child(3)",
        text: "Tight collaboration with QA, PM, and Designer",
      },
      {
        selector: ".process-grid .process-card:nth-child(1) h3",
        text: "Clarify the problem",
      },
      {
        selector: ".process-grid .process-card:nth-child(1) p",
        text: "Align user flow, success metrics, scope, and risk upfront.",
      },
      {
        selector: ".process-grid .process-card:nth-child(2) h3",
        text: "Design the technical plan",
      },
      {
        selector: ".process-grid .process-card:nth-child(2) p",
        text: "Split components, state, and API contract before coding.",
      },
      {
        selector: ".process-grid .process-card:nth-child(3) h3",
        text: "Implement & review",
      },
      {
        selector: ".process-grid .process-card:nth-child(3) p",
        text: "Write clean code, test risk points, and review with checklists.",
      },
      {
        selector: ".process-grid .process-card:nth-child(4) h3",
        text: "Measure after release",
      },
      {
        selector: ".process-grid .process-card:nth-child(4) p",
        text: "Read real metrics and iterate in the next cycle.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) .timeline-period",
        text: "2026 - Present",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) .timeline-main h3",
        text: "Final-year student · Building a recruiter-focused portfolio",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) .timeline-company",
        text: "Frontend / Product Engineering direction",
      },
      {
        selector:
          ".timeline .timeline-item:nth-child(1) .timeline-main p:nth-of-type(2)",
        text: "Structured 6 case studies using recruiter-friendly format: problem, constraints, architecture, impact, and technical lessons.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) li:nth-child(1)",
        text: "Standardized case-study templates for both public and private repos.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(1) li:nth-child(2)",
        text: "Practiced concise and defensible technical decision communication.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) .timeline-period",
        text: "2025 - 2026",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) .timeline-main h3",
        text: "Capstone and team projects at university",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) .timeline-company",
        text: "3-6 member teams",
      },
      {
        selector:
          ".timeline .timeline-item:nth-child(2) .timeline-main p:nth-of-type(2)",
        text: "Delivered increasingly complex projects: dashboards, internal workflows, healthcare platform, and realtime auction system.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) li:nth-child(1)",
        text: "Built reusable components and shared code-review conventions.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(2) li:nth-child(2)",
        text: "Performed practical checks for responsive behavior, accessibility, and baseline performance.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) .timeline-period",
        text: "2023 - 2025",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) .timeline-main h3",
        text: "Technical foundation",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) .timeline-company",
        text: "Algorithms + web fundamentals",
      },
      {
        selector:
          ".timeline .timeline-item:nth-child(3) .timeline-main p:nth-of-type(2)",
        text: "Built strong HTML/CSS/JavaScript fundamentals, then moved to React and TypeScript for real product-oriented problems.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) li:nth-child(1)",
        text: "Developed disciplined code structure and component separation habits.",
      },
      {
        selector: ".timeline .timeline-item:nth-child(3) li:nth-child(2)",
        text: "Practiced problem analysis before implementation.",
      },
      {
        selector: '.project-filters .filter-btn[data-filter="all"]',
        text: "All",
      },
      {
        selector: '.project-filters .filter-btn[data-filter="frontend"]',
        text: "Frontend",
      },
      {
        selector: '.project-filters .filter-btn[data-filter="product"]',
        text: "Product",
      },
      {
        selector: '.project-filters .filter-btn[data-filter="private"]',
        text: "Private / NDA",
      },
      {
        selector: ".projects-note",
        html: true,
        text: "Each project has a dedicated <strong>case study</strong>. For private/NDA repos, you can still review context, architecture, technical decisions, and outcomes.",
      },
      {
        selector: ".contact-quick-actions .btn-primary",
        text: "Schedule interview",
      },
      {
        selector: ".contact-quick-actions .btn-secondary",
        text: "Discuss opportunities",
      },
      { selector: ".contact-list li:nth-child(1) span", text: "Email" },
      { selector: ".contact-list li:nth-child(2) span", text: "Phone" },
      { selector: ".contact-list li:nth-child(3) span", text: "LinkedIn" },
      { selector: ".contact-list li:nth-child(4) span", text: "GitHub" },
      { selector: "#contact-form h3", text: "Send a quick message" },
      {
        selector: "#contact-form .form-note",
        text: "This form opens your email client with prefilled content, so you can reach me directly.",
      },
      { selector: '#contact-form label[for="name"]', text: "Name" },
      { selector: '#contact-form label[for="email"]', text: "Email" },
      { selector: '#contact-form label[for="subject"]', text: "Subject" },
      { selector: '#contact-form label[for="message"]', text: "Message" },
      {
        selector: '#contact-form button[type="submit"]',
        text: "Open email draft",
      },
      {
        selector: ".site-footer .footer-inner p",
        html: true,
        text: '© <span id="current-year"></span> Nguyễn Chí Thanh. Portfolio for recruitment.',
      },
      { selector: ".site-footer .back-top", text: "Back to top" },
    ],
  };

  const PROJECT_TRANSLATIONS = {
    vi: [
      { selector: "a.skip-link", text: "Bỏ qua điều hướng" },
      {
        selector: '.site-nav .nav-link[href="index.html#projects"]',
        text: "Quay lại dự án",
      },
      {
        selector: '.site-nav .nav-link[href="index.html#contact"]',
        text: "Liên hệ",
      },
      {
        selector: '#mobile-menu .mobile-link[href="index.html#home"]',
        text: "Trang chủ",
      },
      {
        selector: '#mobile-menu .mobile-link[href="index.html#projects"]',
        text: "Quay lại dự án",
      },
      {
        selector: '#mobile-menu .mobile-link[href="index.html#contact"]',
        text: "Liên hệ",
      },
      { selector: ".project-back-link", text: "← Quay lại danh sách dự án" },
      {
        selector: '.project-case-nav a[href="#case-overview"]',
        text: "Tổng quan",
      },
      { selector: '.project-case-nav a[href="#case-story"]', text: "Story" },
      {
        selector: '.project-case-nav a[href="#case-details"]',
        text: "Chi tiết kỹ thuật",
      },
      { selector: '.project-case-nav a[href="#case-media"]', text: "Media" },
      { selector: '.project-case-nav a[href="#case-proof"]', text: "Kết quả" },
      { selector: '.project-case-nav a[href="#case-security"]', text: "NDA" },
      { selector: "#case-story article:nth-child(1) h2", text: "Vấn đề" },
      { selector: "#case-story article:nth-child(2) h2", text: "Giải pháp" },
      { selector: "#case-story article:nth-child(3) h2", text: "Tác động" },
      { selector: "#case-media article:nth-child(1) h2", text: "Video demo" },
      {
        selector: "#case-media article:nth-child(2) h2",
        text: "Ảnh minh hoạ chính",
      },
      {
        selector: "#case-details article:nth-child(1) h2",
        text: "Sơ đồ kiến trúc",
      },
      {
        selector: "#case-details article:nth-child(2) h2",
        text: "Kiến trúc UI & luồng dữ liệu",
      },
      {
        selector: "#case-details article:nth-child(3) h2",
        text: "Quyết định kỹ thuật",
      },
      {
        selector: "#case-details article:nth-child(4) h2",
        text: "Phần tôi trực tiếp phụ trách",
      },
      {
        selector: "#case-details article:nth-child(5) h2",
        text: "Artifacts có thể chia sẻ",
      },
      {
        selector: "#case-details article:nth-child(6) h2",
        text: "Thách thức kỹ thuật",
      },
      {
        selector: "#case-details article:nth-child(7) h2",
        text: "Bài học rút ra",
      },
      { selector: "#case-security h2", text: "Phạm vi bảo mật / NDA" },
      {
        selector: ".project-footer-cta .btn-secondary",
        text: "Quay lại portfolio",
      },
      {
        selector: ".project-footer-cta .btn-primary",
        text: "Yêu cầu demo riêng / phỏng vấn kỹ thuật",
      },
      {
        selector: ".site-footer .footer-inner p",
        html: true,
        text: '© <span id="current-year"></span> Nguyễn Chí Thanh. Case Study.',
      },
      { selector: ".site-footer .back-top", text: "Về trang chính" },
    ],
    en: [
      { selector: "a.skip-link", text: "Skip navigation" },
      {
        selector: '.site-nav .nav-link[href="index.html#projects"]',
        text: "Back to Projects",
      },
      {
        selector: '.site-nav .nav-link[href="index.html#contact"]',
        text: "Contact",
      },
      {
        selector: '#mobile-menu .mobile-link[href="index.html#home"]',
        text: "Home",
      },
      {
        selector: '#mobile-menu .mobile-link[href="index.html#projects"]',
        text: "Back to Projects",
      },
      {
        selector: '#mobile-menu .mobile-link[href="index.html#contact"]',
        text: "Contact",
      },
      { selector: ".project-back-link", text: "← Back to project list" },
      {
        selector: '.project-case-nav a[href="#case-overview"]',
        text: "Overview",
      },
      { selector: '.project-case-nav a[href="#case-story"]', text: "Story" },
      {
        selector: '.project-case-nav a[href="#case-details"]',
        text: "Technical Details",
      },
      { selector: '.project-case-nav a[href="#case-media"]', text: "Media" },
      { selector: '.project-case-nav a[href="#case-proof"]', text: "Results" },
      { selector: '.project-case-nav a[href="#case-security"]', text: "NDA" },
      { selector: "#case-story article:nth-child(1) h2", text: "Problem" },
      { selector: "#case-story article:nth-child(2) h2", text: "Solution" },
      { selector: "#case-story article:nth-child(3) h2", text: "Impact" },
      {
        selector: "#case-media article:nth-child(1) h2",
        text: "Video Walkthrough",
      },
      {
        selector: "#case-media article:nth-child(2) h2",
        text: "Key Screenshots",
      },
      {
        selector: "#case-details article:nth-child(1) h2",
        text: "Architecture Diagram",
      },
      {
        selector: "#case-details article:nth-child(2) h2",
        text: "UI Architecture & Data Flow",
      },
      {
        selector: "#case-details article:nth-child(3) h2",
        text: "Technical Decisions",
      },
      {
        selector: "#case-details article:nth-child(4) h2",
        text: "My Ownership Scope",
      },
      {
        selector: "#case-details article:nth-child(5) h2",
        text: "Shareable Artifacts",
      },
      {
        selector: "#case-details article:nth-child(6) h2",
        text: "Engineering Challenges",
      },
      {
        selector: "#case-details article:nth-child(7) h2",
        text: "Lessons Learned",
      },
      { selector: "#case-security h2", text: "Security Scope / NDA" },
      {
        selector: ".project-footer-cta .btn-secondary",
        text: "Back to portfolio",
      },
      {
        selector: ".project-footer-cta .btn-primary",
        text: "Request private demo / technical interview",
      },
      {
        selector: ".site-footer .footer-inner p",
        html: true,
        text: '© <span id="current-year"></span> Nguyễn Chí Thanh. Case Study.',
      },
      { selector: ".site-footer .back-top", text: "Back to home" },
    ],
  };

  const t = (key) => {
    return UI_TEXT[currentLanguage]?.[key] || UI_TEXT.vi[key] || key;
  };

  const mergeProjectCaseByLanguage = (projectId) => {
    const base = PROJECT_CASES[projectId];
    if (!base) return null;
    if (currentLanguage !== "en") return base;

    const override = PROJECT_CASES_EN[projectId];
    if (!override) return base;

    return {
      ...base,
      ...override,
      meta: override.meta || base.meta,
      proof: override.proof || base.proof,
      architecture: override.architecture || base.architecture,
      technicalDecisions:
        override.technicalDecisions || base.technicalDecisions,
      impact: override.impact || base.impact,
      roleScope: override.roleScope || base.roleScope,
      evidence: override.evidence || base.evidence,
      challenges: override.challenges || base.challenges,
      lessons: override.lessons || base.lessons,
      gallery: override.gallery || base.gallery,
      links: override.links || base.links,
    };
  };

  const applyTranslationEntries = (entries) => {
    if (!Array.isArray(entries)) return;
    entries.forEach((entry) => {
      const node = document.querySelector(entry.selector);
      if (!node) return;
      if (entry.html) {
        node.innerHTML = entry.text;
      } else {
        node.textContent = entry.text;
      }
    });
  };

  const updateCvLinksByLanguage = () => {
    const links = Array.from(
      document.querySelectorAll('a[href^="cv.html"], a[href^="cv-en.html"]'),
    );
    if (!links.length) return;

    links.forEach((link) => {
      const rawHref = link.getAttribute("href") || "";
      if (!rawHref.startsWith("cv.html") && !rawHref.startsWith("cv-en.html"))
        return;

      const url = new URL(rawHref, window.location.href);
      url.searchParams.delete("lang");

      const query = url.searchParams.toString();
      const hash = url.hash || "";
      const isExplicitEnglishCv = rawHref.startsWith("cv-en.html");
      const basePath = isExplicitEnglishCv
        ? "cv-en.html"
        : currentLanguage === "en"
          ? "cv-en.html"
          : "cv.html";
      link.setAttribute(
        "href",
        `${basePath}${query ? `?${query}` : ""}${hash}`,
      );
    });
  };

  const updateProjectLinksByLanguage = () => {
    const links = Array.from(
      document.querySelectorAll('a[href^="project.html"]'),
    );
    if (!links.length) return;

    links.forEach((link) => {
      const rawHref = link.getAttribute("href") || "";
      if (!rawHref.startsWith("project.html")) return;

      const url = new URL(rawHref, window.location.href);
      if (currentLanguage === "en") {
        url.searchParams.set("lang", "en");
      } else {
        url.searchParams.delete("lang");
      }

      const query = url.searchParams.toString();
      const hash = url.hash || "";
      link.setAttribute(
        "href",
        `project.html${query ? `?${query}` : ""}${hash}`,
      );
    });
  };

  const applyStaticTranslations = () => {
    const isProjectPage = Boolean(document.getElementById("project-main"));
    if (isProjectPage) {
      applyTranslationEntries(PROJECT_TRANSLATIONS[currentLanguage]);
    } else {
      applyTranslationEntries(INDEX_TRANSLATIONS[currentLanguage]);
    }

    if (themeToggle) {
      const label =
        currentLanguage === "en"
          ? "Toggle light/dark theme"
          : "Đổi giao diện sáng/tối";
      themeToggle.setAttribute("aria-label", label);
      const text = themeToggle.querySelector(".theme-text");
      if (text) {
        text.textContent = t("themeLabel");
      }
    }

    if (languageToggle) {
      languageToggle.setAttribute(
        "aria-label",
        currentLanguage === "en" ? "Choose language" : "Chọn ngôn ngữ",
      );
    }

    if (mobileMenu) {
      mobileMenu.setAttribute("aria-label", t("mobileMenuAria"));
    }

    if (menuToggle) {
      const isOpen = mobileMenu?.classList.contains("is-open");
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? t("menuClose") : t("menuOpen"),
      );
    }

    document.documentElement.lang = currentLanguage === "en" ? "en" : "vi";
    updateCvLinksByLanguage();
    updateProjectLinksByLanguage();
    initFooterYear();
  };

  const setLanguage = (lang, options = {}) => {
    const { persist = true, rerender = true } = options;
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLanguage = lang;

    if (persist) {
      localStorage.setItem(LANGUAGE_KEY, lang);
    }

    if (languageToggle) {
      languageToggle.querySelectorAll(".lang-btn").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.lang === lang);
      });
    }

    applyStaticTranslations();

    if (!rerender) return;

    renderProjectCards();
    initProjectFilter();
    renderProjectPage();
  };

  const initLanguage = () => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("lang");
    const saved = localStorage.getItem(LANGUAGE_KEY);

    if (SUPPORTED_LANGS.includes(fromQuery)) {
      currentLanguage = fromQuery;
    } else if (SUPPORTED_LANGS.includes(saved)) {
      currentLanguage = saved;
    }

    if (languageToggle) {
      languageToggle.querySelectorAll(".lang-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const lang = button.dataset.lang;
          if (!lang || lang === currentLanguage) return;
          setLanguage(lang);
        });
      });
    }

    setLanguage(currentLanguage, { persist: false, rerender: false });
  };

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeMeta) {
      themeMeta.setAttribute(
        "content",
        THEME_COLORS[theme] || THEME_COLORS.light,
      );
    }
  };

  const initTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    } else {
      setTheme("light");
    }
  };

  const toggleTheme = () => {
    const current = root.getAttribute("data-theme") || "light";
    setTheme(current === "light" ? "dark" : "light");
  };

  const setMobileMenuState = (isOpen) => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.toggle("is-open", isOpen);
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? t("menuClose") : t("menuOpen"),
    );
    document.body.classList.toggle("mobile-menu-open", isOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuState(false);
  };

  const initMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("is-open");
      setMobileMenuState(isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_NAV_BREAKPOINT) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMobileMenu();
      }
    });
  };

  const initHomeAnchorBehavior = () => {
    const homeLinks = Array.from(document.querySelectorAll('a[href="#home"]'));
    if (homeLinks.length === 0) return;

    const scrollToTop = (behavior = "smooth") => {
      window.scrollTo({ top: 0, behavior });
    };

    if (window.location.hash === "#home") {
      requestAnimationFrame(() => {
        scrollToTop("auto");
      });
    }

    homeLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        if (window.location.hash !== "#home") {
          history.pushState(null, "", "#home");
        }
        scrollToTop("smooth");
        closeMobileMenu();
      });
    });

    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#home") {
        scrollToTop("auto");
      }
    });
  };

  const initHeaderScroll = () => {
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  };

  const initScrollProgress = () => {
    const progressFill = document.querySelector("#scroll-progress span");
    if (!progressFill) return;

    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const percent = Math.min(100, Math.max(0, ratio * 100));
      progressFill.style.width = `${percent.toFixed(2)}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  };

  const initSpotlightCards = () => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    const targets = document.querySelectorAll(
      ".trust-item, .lane-card, .snapshot-card, .fit-row, .skill-card, .project-card, .timeline-item, .process-card, .project-panel, .contact-form, .jr-card, .faq-item, .github-proof, .snapshot-highlights",
    );
    if (targets.length === 0) return;

    targets.forEach((target) => {
      target.addEventListener("pointermove", (event) => {
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        target.style.setProperty("--mx", `${x}px`);
        target.style.setProperty("--my", `${y}px`);
      });

      target.addEventListener("pointerleave", () => {
        target.style.removeProperty("--mx");
        target.style.removeProperty("--my");
      });
    });
  };

  const initReveal = () => {
    const revealElements = document.querySelectorAll("[data-reveal]");
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealElements.forEach((el) => observer.observe(el));
  };

  const initActiveNav = () => {
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const navTargets = new Set(
      navLinks
        .map((link) => link.getAttribute("href") || "")
        .filter((href) => href.startsWith("#")),
    );
    const sections = Array.from(
      document.querySelectorAll("main section[id]"),
    ).filter((section) => navTargets.has(`#${section.id}`));

    if (sections.length === 0 || navLinks.length === 0) return;

    const navOrderIds = navLinks
      .map((link) => (link.getAttribute("href") || "").replace("#", ""))
      .filter(Boolean);
    const sectionIdSet = new Set(sections.map((section) => section.id));
    const defaultId =
      navOrderIds.find((id) => sectionIdSet.has(id)) || sections[0].id;

    const setActive = (sectionId) => {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("is-active", isActive);
      });
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href") || "";
        if (href.startsWith("#")) {
          setActive(href.slice(1));
        }
      });
    });

    // Use section nearest to the top anchor line for stable active state.
    const updateActiveByPosition = () => {
      const topAnchor = window.scrollY + header.offsetHeight + 18;
      let currentId = defaultId;

      sections.forEach((section) => {
        if (section.offsetTop <= topAnchor) {
          currentId = section.id;
        }
      });

      setActive(currentId);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveByPosition();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId && navTargets.has(`#${hashId}`)) {
        setActive(hashId);
      }
    });
    updateActiveByPosition();
  };

  const initCaseSectionNav = () => {
    const links = Array.from(document.querySelectorAll(".project-case-nav a"));
    if (links.length === 0) return;

    const items = links
      .map((link) => {
        const href = link.getAttribute("href") || "";
        if (!href.startsWith("#")) return null;
        const section = document.querySelector(href);
        if (!section) return null;

        return {
          id: href.slice(1),
          link,
          section,
        };
      })
      .filter(Boolean);

    if (items.length === 0) return;

    const setActive = (id) => {
      items.forEach((item) => {
        item.link.classList.toggle("is-active", item.id === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const current = items.find(
          (item) => item.section === visible[0].target,
        );
        if (current) {
          setActive(current.id);
        }
      },
      {
        rootMargin: "-28% 0px -52% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    items.forEach((item) => observer.observe(item.section));
    setActive(items[0].id);
  };

  const extractStackFromMeta = (detail) => {
    const stackItem = (detail.meta || []).find((item) =>
      item.startsWith("Stack:"),
    );
    if (!stackItem) return t("stackFallback");
    return stackItem.replace(/^Stack:\s*/, "").replace(/\s*\+\s*/g, " · ");
  };

  const resolveCasePreview = (detail) => {
    const media = (detail.gallery || []).find(
      (item) => typeof item.image === "string" && item.image.trim().length > 0,
    );
    return {
      src: media?.image || "",
      alt: media?.alt || `Preview case study ${detail.title}`,
    };
  };

  const createProjectAction = (item) => {
    if (item.href) {
      const link = document.createElement("a");
      link.className = "project-link";
      link.href = item.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.label;
      return link;
    }

    const placeholder = document.createElement("span");
    placeholder.className = "project-link is-disabled";
    placeholder.setAttribute("aria-disabled", "true");
    placeholder.textContent = item.label;
    return placeholder;
  };

  const renderProjectCards = () => {
    const grid = document.getElementById("project-grid");
    if (!grid) return;

    grid.innerHTML = "";

    PROJECT_CARD_ORDER.forEach((projectId, index) => {
      const detail = mergeProjectCaseByLanguage(projectId);
      if (!detail) return;

      const card = document.createElement("article");
      card.className = "project-card";
      card.dataset.projectType = (detail.filters || []).join(" ");
      card.dataset.projectId = projectId;
      card.setAttribute("data-reveal", "up");
      if (index === 1) card.setAttribute("data-delay", "80");
      if (index === 2) card.setAttribute("data-delay", "160");

      const top = document.createElement("div");
      top.className = "project-top";
      const badge = document.createElement("span");
      badge.className = "project-badge";
      badge.textContent = detail.cardBadge || "Case Study";
      const year = document.createElement("span");
      year.className = "project-year";
      year.textContent = detail.year || "N/A";
      top.appendChild(badge);
      top.appendChild(year);

      const visual = document.createElement("div");
      visual.className = "project-visual";
      const preview = resolveCasePreview(detail);
      if (preview.src) {
        const img = document.createElement("img");
        img.src = preview.src;
        img.alt = preview.alt;
        img.loading = "lazy";
        img.decoding = "async";
        visual.appendChild(img);
      }
      const visualTag = document.createElement("span");
      visualTag.className = "project-visual-tag";
      visualTag.textContent = detail.previewTag || "Case Study";
      visual.appendChild(visualTag);

      const title = document.createElement("h3");
      title.textContent = detail.title;

      const summary = document.createElement("p");
      summary.textContent = detail.summary;

      const points = document.createElement("ul");
      points.className = "project-points";
      (detail.impact || detail.technicalDecisions || [])
        .slice(0, 3)
        .forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          points.appendChild(li);
        });

      const stack = document.createElement("div");
      stack.className = "project-stack";
      stack.textContent = extractStackFromMeta(detail);

      const actions = document.createElement("div");
      actions.className = "project-actions";
      const detailLink = document.createElement("a");
      detailLink.href =
        currentLanguage === "en"
          ? `project.html?id=${projectId}&lang=en`
          : `project.html?id=${projectId}`;
      detailLink.className = "project-link project-detail-btn";
      detailLink.textContent = t("detailButton");
      actions.appendChild(detailLink);
      (detail.links || []).forEach((item) => {
        actions.appendChild(createProjectAction(item));
      });

      card.appendChild(top);
      card.appendChild(visual);
      card.appendChild(title);
      card.appendChild(summary);
      card.appendChild(points);
      card.appendChild(stack);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  };

  const initProjectFilter = () => {
    const buttons = Array.from(document.querySelectorAll(".filter-btn"));
    if (buttons.length === 0) return;

    buttons.forEach((button) => {
      button.onclick = () => {
        const filter = button.dataset.filter || "all";
        const cards = Array.from(document.querySelectorAll(".project-card"));

        buttons.forEach((btn) =>
          btn.classList.toggle("active", btn === button),
        );

        cards.forEach((card) => {
          if (filter === "all") {
            card.classList.remove("is-hidden");
            return;
          }

          const type = card.dataset.projectType || "";
          const match = type.split(" ").includes(filter);
          card.classList.toggle("is-hidden", !match);
        });
      };
    });
  };

  const renderList = (container, items = []) => {
    if (!container) return;
    container.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      container.appendChild(li);
    });
  };

  const renderProof = (container, items = []) => {
    if (!container) return;
    container.innerHTML = "";

    if (!items.length) {
      const fallback = document.createElement("article");
      fallback.className = "proof-item";

      const value = document.createElement("strong");
      value.textContent =
        currentLanguage === "en" ? "Case Study" : "Case Study";
      const label = document.createElement("span");
      label.textContent =
        currentLanguage === "en"
          ? "Detailed impact metrics will be updated with real production data."
          : "Chi tiết kết quả sẽ được cập nhật theo dữ liệu thực tế.";

      fallback.appendChild(value);
      fallback.appendChild(label);
      container.appendChild(fallback);
      return;
    }

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "proof-item";

      const value = document.createElement("strong");
      value.textContent = item.value || "";
      const label = document.createElement("span");
      label.textContent = item.label || "";

      card.appendChild(value);
      card.appendChild(label);
      container.appendChild(card);
    });
  };

  const renderProjectPage = () => {
    const projectMain = document.getElementById("project-main");
    if (!projectMain) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id") || "";
    const detail = mergeProjectCaseByLanguage(projectId);

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || "";
    };

    if (!detail) {
      setText("project-case-title", t("notFoundTitle"));
      setText("project-case-summary", t("notFoundSummary"));
      return;
    }

    document.title = `${detail.title} | Case Study`;

    setText("project-case-badge", detail.badge);
    setText("project-case-title", detail.title);
    setText("project-case-summary", detail.summary);
    setText("project-story-problem", detail.problem);
    setText("project-story-solution", detail.solution);
    setText(
      "project-story-impact",
      detail.storyImpact || (detail.impact || []).slice(0, 2).join(" "),
    );
    setText("project-nda", detail.nda);
    setText("project-video-note", detail.videoNote);

    const metaContainer = document.getElementById("project-case-meta");
    if (metaContainer) {
      metaContainer.innerHTML = "";
      (detail.meta || []).forEach((item) => {
        const chip = document.createElement("span");
        chip.textContent = item;
        metaContainer.appendChild(chip);
      });
    }

    const heroMedia = document.getElementById("project-hero-media");
    if (heroMedia) {
      heroMedia.innerHTML = "";
      const cover = (detail.gallery || []).find(
        (item) =>
          typeof item.image === "string" && item.image.trim().length > 0,
      );

      if (cover) {
        const img = document.createElement("img");
        img.src = cover.image;
        img.alt = cover.alt || `${detail.title} cover preview`;
        img.loading = "eager";
        img.decoding = "async";
        heroMedia.appendChild(img);
      } else {
        const fallback = document.createElement("div");
        fallback.className = "project-hero-media-fallback";
        fallback.textContent =
          currentLanguage === "en"
            ? "Case preview media will appear here when a cover image is added."
            : "Case preview media sẽ hiển thị tại đây khi bạn thêm ảnh cover.";
        heroMedia.appendChild(fallback);
      }
    }

    const architectureDiagram = document.getElementById(
      "project-architecture-diagram",
    );
    const architectureCaption = document.getElementById(
      "project-architecture-caption",
    );
    if (architectureDiagram) {
      if (detail.architectureDiagram) {
        architectureDiagram.src = detail.architectureDiagram;
        architectureDiagram.alt = `${detail.title} architecture diagram`;
      } else {
        architectureDiagram.removeAttribute("src");
      }
    }
    if (architectureCaption) {
      architectureCaption.textContent =
        detail.architectureCaption ||
        (currentLanguage === "en"
          ? "Architecture diagram illustrating UI structure, data flow, and module organization decisions."
          : "Sơ đồ kiến trúc minh họa cấu trúc UI, data flow và các quyết định tổ chức module.");
    }

    renderProof(
      document.getElementById("project-proof-grid"),
      detail.proof || [],
    );
    renderList(
      document.getElementById("project-architecture"),
      detail.architecture,
    );
    renderList(
      document.getElementById("project-tech-decisions"),
      detail.technicalDecisions,
    );
    renderList(document.getElementById("project-role-scope"), detail.roleScope);
    renderList(document.getElementById("project-evidence"), detail.evidence);
    renderList(
      document.getElementById("project-challenges"),
      detail.challenges,
    );
    renderList(document.getElementById("project-lessons"), detail.lessons);

    const videoContainer = document.getElementById("project-video");
    if (videoContainer) {
      videoContainer.innerHTML = "";

      if (detail.videoFile) {
        const video = document.createElement("video");
        video.controls = true;
        video.preload = "metadata";
        if (detail.videoPoster) {
          video.poster = detail.videoPoster;
        }

        const source = document.createElement("source");
        source.src = detail.videoFile;
        source.type = "video/mp4";

        video.appendChild(source);
        video.appendChild(
          document.createTextNode(
            currentLanguage === "en"
              ? "Your browser does not support this video format."
              : "Trình duyệt không hỗ trợ phát video cho định dạng này.",
          ),
        );

        videoContainer.appendChild(video);
      } else if (detail.videoEmbed) {
        const iframe = document.createElement("iframe");
        iframe.src = detail.videoEmbed;
        iframe.loading = "lazy";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.title = `${detail.title} walkthrough`;
        videoContainer.appendChild(iframe);
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "video-placeholder";

        const strong = document.createElement("strong");
        strong.textContent =
          currentLanguage === "en"
            ? "Video not publicly available"
            : "Video không public";
        const note = document.createElement("span");
        note.textContent =
          currentLanguage === "en"
            ? "This case is private/NDA. A live walkthrough can be provided during interview."
            : "Dự án thuộc phạm vi private/NDA. Có thể demo trực tiếp khi phỏng vấn.";

        placeholder.appendChild(strong);
        placeholder.appendChild(note);
        videoContainer.appendChild(placeholder);
      }
    }

    const gallery = document.getElementById("project-gallery");
    if (gallery) {
      gallery.innerHTML = "";
      (detail.gallery || []).forEach((item) => {
        const hasImage =
          typeof item.image === "string" && item.image.trim().length > 0;
        if (hasImage) {
          const figure = document.createElement("figure");
          figure.className = "gallery-item gallery-item-media";

          const img = document.createElement("img");
          img.src = item.image;
          img.alt = item.alt || item.title || "Project media";
          img.loading = "lazy";
          img.decoding = "async";

          const caption = document.createElement("figcaption");
          caption.className = "gallery-item-caption";

          const title = document.createElement("strong");
          title.textContent = item.title;
          const desc = document.createElement("span");
          desc.textContent = item.desc;

          caption.appendChild(title);
          caption.appendChild(desc);
          figure.appendChild(img);
          figure.appendChild(caption);
          gallery.appendChild(figure);
          return;
        }

        const card = document.createElement("div");
        card.className = "gallery-item";

        const title = document.createElement("strong");
        title.textContent = item.title;
        const desc = document.createElement("span");
        desc.textContent = item.desc;

        card.appendChild(title);
        card.appendChild(desc);
        gallery.appendChild(card);
      });
    }

    const links = document.getElementById("project-links");
    if (links) {
      links.innerHTML = "";
      (detail.links || []).forEach((item) => {
        if (item.href) {
          const a = document.createElement("a");
          a.href = item.href;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.textContent = item.label;
          links.appendChild(a);
        } else {
          const span = document.createElement("span");
          span.textContent = item.label;
          links.appendChild(span);
        }
      });
    }
  };

  const initContactForm = () => {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !subject || !message) {
        if (status) status.textContent = t("formMissing");
        return;
      }

      const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
      const bodyLines = [
        `Họ tên: ${name}`,
        `Email: ${email}`,
        "",
        "Nội dung:",
        message,
      ];
      const mailtoBody = encodeURIComponent(bodyLines.join("\n"));

      if (status) {
        status.textContent = t("formOpening");
      }

      window.location.href = `mailto:a01204496068@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    });
  };

  const initFooterYear = () => {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  };

  const init = () => {
    initTheme();
    initLanguage();
    initMobileMenu();
    initHomeAnchorBehavior();
    initHeaderScroll();
    initScrollProgress();
    renderProjectCards();
    initSpotlightCards();
    initReveal();
    initActiveNav();
    initCaseSectionNav();
    initProjectFilter();
    renderProjectPage();
    initContactForm();
    initFooterYear();
    applyStaticTranslations();

    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }

    document.addEventListener("click", (event) => {
      if (!mobileMenu || !menuToggle) return;
      if (!mobileMenu.classList.contains("is-open")) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (mobileMenu.contains(target) || menuToggle.contains(target)) return;
      closeMobileMenu();
    });
  };

  document.addEventListener("DOMContentLoaded", init);
})();
