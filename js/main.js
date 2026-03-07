(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeMeta = document.getElementById("theme-color-meta");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.getElementById("site-header");
  const MOBILE_NAV_BREAKPOINT = 900;

  const THEME_KEY = "portfolio_theme";
  const THEME_COLORS = {
    light: "#f4f6f8",
    dark: "#0f141a",
  };

  const PROJECT_CASES = {
    "ops-dashboard": {
      badge: "Public Case · Frontend + Product",
      title: "Admin Dashboard cho vận hành bán lẻ",
      summary:
        "Tối ưu dashboard theo flow thao tác thực tế, giảm nhầm thao tác ở khối vận hành và giúp lead theo dõi trạng thái đơn hàng nhanh hơn.",
      meta: [
        "Vai trò: Frontend Contributor (Student Project)",
        "Team: 4 người",
        "Thời gian: 4 tháng",
        "Stack: React + TypeScript + Chart.js",
      ],
      proof: [
        { value: "4 tháng", label: "Thời gian triển khai" },
        { value: "4 người", label: "Quy mô team" },
        { value: "2 đợt", label: "Release nội bộ" },
        { value: "~30%", label: "Giảm thao tác chính" },
      ],
      problem:
        "Dashboard cũ khó đọc khi số lượng đơn tăng cao, thao tác đổi trạng thái đơn nhiều bước, dữ liệu biểu đồ không đồng nhất giữa các màn hình.",
      solution:
        "Thiết kế lại cấu trúc màn hình theo tác vụ ưu tiên, chuẩn hóa filter/table/chart, và tách state rõ ràng để giảm lỗi runtime.",
      storyImpact:
        "Giảm thời gian xử lý thao tác chính khoảng 30%, giảm lỗi lặp ở các sprint sau và giúp onboarding dev mới nhanh hơn.",
      architectureDiagram: "assets/diagrams/ops-dashboard-arch.svg",
      architectureCaption:
        "Tách rõ UI modules, domain rules và data layer để giảm side-effects và giữ tốc độ iterate.",
      architecture: [
        "Chia module theo domain: Orders, Inventory, Analytics.",
        "Tách state truy vấn và state UI để hạn chế side-effects.",
        "Xây component library nội bộ cho form/table/charts.",
      ],
      technicalDecisions: [
        "Dùng React Query để quản lý cache và trạng thái async nhất quán.",
        "Ưu tiên domain-based modules thay vì chia theo loại file.",
        "Xây reusable table/filter để giảm duplicated logic giữa màn hình.",
      ],
      impact: [
        "Giảm số bước ở thao tác xử lý đơn chính.",
        "Onboard dev mới nhanh hơn nhờ module hóa.",
        "Giảm bug giao diện lặp lại qua các sprint.",
      ],
      roleScope: [
        "Phụ trách UI architecture cho luồng Order Queue và Inventory.",
        "Thiết kế reusable components: table, filter, status-tag, empty/loading states.",
        "Chuẩn hóa token màu và khoảng cách để thống nhất light/dark mode.",
      ],
      evidence: [
        "Flow map trước/sau tối ưu thao tác (PDF).",
        "Checklist QA responsive + accessibility cho release.",
        "Clip walkthrough 60-90 giây (có thể gửi theo yêu cầu).",
      ],
      challenges: [
        "Giữ consistency giữa nhiều màn hình sử dụng data table.",
        "Tránh rerender thừa khi filter và sort dữ liệu lớn.",
        "Đảm bảo chart hiển thị đúng ở cả light/dark mode.",
      ],
      lessons: [
        "UX flow quan trọng hơn số lượng hiệu ứng.",
        "State design tốt giúp giảm bug lâu dài.",
        "Checklist release giúp team giữ chất lượng ổn định.",
      ],
      nda:
        "Repo có thể chia sẻ ở mức code sample public; dữ liệu production và logic nội bộ đã được ẩn.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Bạn có thể đặt `videoEmbed` (YouTube) hoặc `videoFile` (MP4 local) để hiển thị demo trực tiếp.",
      gallery: [
        {
          title: "Order Queue Screen",
          desc: "Màn hình ưu tiên thao tác nhanh cho đội vận hành.",
          image: "assets/cases/ops-queue.svg",
          alt: "Order queue screen preview",
        },
        {
          title: "Analytics View",
          desc: "Biểu đồ và KPI theo ngày/tuần, đồng bộ style token.",
          image: "assets/cases/ops-analytics.svg",
          alt: "Analytics view preview",
        },
        {
          title: "Filter System",
          desc: "Bộ lọc nhiều điều kiện, tránh reset trạng thái ngoài ý muốn.",
          image: "assets/cases/ops-filter.svg",
          alt: "Filter system preview",
        },
        {
          title: "Reusable Table",
          desc: "Table component dùng lại cho nhiều module.",
          image: "assets/cases/ops-table.svg",
          alt: "Reusable table preview",
        },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/thu-high" },
        {
          label: "LinkedIn Case Note",
          href: "https://www.linkedin.com/in/thu-high",
        },
      ],
    },

    "b2b-workflow": {
      badge: "Private Case · NDA",
      title: "Nền tảng quản lý quy trình nội bộ (B2B)",
      summary:
        "Hệ thống xử lý form nghiệp vụ nhiều bước với phân quyền theo phòng ban, tập trung vào ổn định và khả năng mở rộng dài hạn.",
      meta: [
        "Vai trò: Frontend Contributor (Core Workflow)",
        "Team: 6 người",
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
      nda:
        "Toàn bộ source code và dữ liệu thuộc phạm vi NDA. Có thể demo trực tiếp qua buổi walkthrough không ghi hình.",
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
      badge: "Public Case · Frontend",
      title: "Website tuyển dụng cho thương hiệu công nghệ",
      summary:
        "Landing page tuyển dụng ưu tiên readability và tốc độ tải, giúp đội HR chủ động cập nhật nội dung mà không phá vỡ layout.",
      meta: [
        "Vai trò: Frontend Developer",
        "Team: 3 người",
        "Thời gian: 2 tháng",
        "Stack: HTML/CSS/JavaScript",
      ],
      proof: [
        { value: "2 tháng", label: "Thời gian triển khai" },
        { value: "3 người", label: "Quy mô team" },
        { value: "Mobile-first", label: "Trọng tâm UX" },
        { value: "Nhẹ & nhanh", label: "Ưu tiên performance" },
      ],
      problem:
        "Trang tuyển dụng cũ thiếu hierarchy nội dung, animation gây nhiễu và tốc độ tải trang đầu chậm trên mobile.",
      solution:
        "Thiết kế lại grid và typography theo ưu tiên đọc, cắt giảm script block render, tối ưu CTA và biểu mẫu ứng tuyển.",
      storyImpact:
        "Tăng thời gian đọc JD trên mobile, giảm bounce ở hero và giúp HR cập nhật nội dung nhanh hơn.",
      architectureDiagram: "assets/diagrams/hiring-landing-arch.svg",
      architectureCaption:
        "Kiến trúc content blocks + performance budget giúp trang nhẹ nhưng vẫn giữ brand consistency.",
      architecture: [
        "Thiết kế token màu + spacing thống nhất toàn trang.",
        "Progressive enhancement cho hiệu ứng thay vì bắt buộc JavaScript.",
        "Kiểm soát ảnh và asset theo performance budget.",
      ],
      technicalDecisions: [
        "Giảm script blocking để tối ưu first render trên mobile.",
        "Ưu tiên semantic HTML để tăng readability và maintainability.",
        "Dùng token hóa spacing/typography để HR dễ cập nhật content.",
      ],
      impact: [
        "Tăng thời gian đọc nội dung JD trên mobile.",
        "Giảm tỷ lệ thoát ở hero section.",
        "Đội HR cập nhật nội dung nhanh hơn và ít lỗi format.",
      ],
      roleScope: [
        "Thiết kế content hierarchy: hero, JD blocks, application flow.",
        "Viết lại layout responsive theo mobile-first grid.",
        "Tối ưu asset tải ban đầu và giảm script gây block render.",
      ],
      evidence: [
        "Ảnh so sánh trước/sau ở hero và phần mô tả vị trí.",
        "Checklist tối ưu mobile performance.",
        "Recording ngắn luồng đọc JD và gửi form ứng tuyển.",
      ],
      challenges: [
        "Giữ brand identity mà không làm UI rối.",
        "Đảm bảo tính nhất quán giữa desktop và mobile.",
        "Tối ưu tải trang khi nội dung có nhiều ảnh.",
      ],
      lessons: [
        "Hierarchy tốt có tác động trực tiếp đến conversion.",
        "Animation chỉ nên hỗ trợ nội dung, không chiếm spotlight.",
        "Performance nên được đo và kiểm soát từ đầu.",
      ],
      nda:
        "Repo có thể chia sẻ public nhưng đã loại bỏ toàn bộ dữ liệu nội bộ trước khi xuất bản.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Có thể thêm video demo thao tác ứng tuyển để tăng độ tin cậy cho case public.",
      gallery: [
        {
          title: "Hero Section",
          desc: "Tối ưu headline, CTA và content hierarchy.",
          image: "assets/cases/hire-hero.svg",
          alt: "Hiring hero section preview",
        },
        {
          title: "Job Detail Layout",
          desc: "Thiết kế block JD dễ scan trong 15-20 giây.",
          image: "assets/cases/hire-jd.svg",
          alt: "Job detail layout preview",
        },
        {
          title: "Application Form",
          desc: "Form tối giản, validation rõ ràng và ít friction.",
          image: "assets/cases/hire-form.svg",
          alt: "Application form preview",
        },
        {
          title: "Mobile View",
          desc: "Giữ readability tốt trên màn hình nhỏ.",
          image: "assets/cases/hire-mobile.svg",
          alt: "Mobile view preview",
        },
      ],
      links: [{ label: "GitHub", href: "https://github.com/thu-high" }],
    },

    "task-workspace": {
      badge: "Private Case · Product",
      title: "Task Workspace cho team cross-functional",
      summary:
        "Workspace quản lý sprint và block issue theo thời gian thực, tập trung vào việc giảm nghẽn giao tiếp giữa PM, QA và Engineer.",
      meta: [
        "Vai trò: Frontend Contributor",
        "Team: 5 người",
        "Thời gian: 5 tháng",
        "Stack: Vue + TypeScript + Node.js",
      ],
      proof: [
        { value: "5 tháng", label: "Thời gian dự án" },
        { value: "5 người", label: "Team triển khai" },
        { value: "Realtime", label: "Trọng tâm dữ liệu" },
        { value: "Nội bộ", label: "Private product" },
      ],
      problem:
        "Thông tin task rải rác giữa nhiều công cụ, PM khó nắm bottleneck theo sprint và đội dev mất thời gian đồng bộ trạng thái thủ công.",
      solution:
        "Xây dashboard tập trung theo sprint health, timeline tiến độ và dependency map; kết nối webhook để đồng bộ trạng thái giữa các hệ thống.",
      storyImpact:
        "Giảm thời gian check trạng thái đầu ngày, phát hiện bottleneck sớm hơn và giảm xung đột thông tin giữa PM và dev.",
      architectureDiagram: "assets/diagrams/task-workspace-arch.svg",
      architectureCaption:
        "Event-driven data flow cho realtime sprint tracking và insights tổng hợp theo chu kỳ.",
      architecture: [
        "State store tách theo board, sprint và insights.",
        "Realtime cập nhật trạng thái qua event channel.",
        "UI kit chung cho task board, filters và progress view.",
      ],
      technicalDecisions: [
        "Tách state theo domain board/sprint để tránh coupling.",
        "Event channel giúp đồng bộ realtime nhất quán giữa module.",
        "UI kit thống nhất giảm khác biệt tương tác ở các view phức tạp.",
      ],
      impact: [
        "Giảm thời gian check trạng thái đầu ngày của team.",
        "Phát hiện bottleneck sớm hơn trong sprint.",
        "Giảm xung đột thông tin giữa PM và dev.",
      ],
      roleScope: [
        "Phụ trách dashboard sprint health và dependency map.",
        "Thiết kế interaction cho filters, board grouping và timeline view.",
        "Phối hợp BE để chuẩn hóa event naming khi đồng bộ realtime.",
      ],
      evidence: [
        "Ảnh wireframe và bản final cho luồng theo dõi sprint.",
        "Decision log ngắn về state management và event flow.",
        "Demo private theo lịch hẹn với nhà tuyển dụng.",
      ],
      challenges: [
        "Đồng bộ dữ liệu từ nhiều nguồn trong thời gian ngắn.",
        "Giữ UI dễ dùng khi số task tăng mạnh.",
        "Thiết kế quyền truy cập hợp lý theo vai trò.",
      ],
      lessons: [
        "Visualization tốt giúp team quyết định nhanh hơn.",
        "Event-driven flow cần theo dõi trạng thái chặt chẽ.",
        "Product nội bộ vẫn cần UX rõ ràng như sản phẩm public.",
      ],
      nda:
        "Sản phẩm nội bộ chưa public. Có thể trình bày chi tiết kiến trúc và decision log trong buổi phỏng vấn kỹ thuật.",
      videoEmbed: "",
      videoFile: "",
      videoPoster: "",
      videoNote:
        "Do phạm vi nội bộ, video demo chỉ chia sẻ trong buổi trao đổi trực tiếp.",
      gallery: [
        {
          title: "Sprint Health Panel",
          desc: "Theo dõi trạng thái sprint theo thời gian thực.",
          image: "assets/cases/task-sprint.svg",
          alt: "Sprint health panel preview",
        },
        {
          title: "Dependency Map",
          desc: "Minh họa task bị chặn và mức độ ảnh hưởng.",
          image: "assets/cases/task-dependency.svg",
          alt: "Dependency map preview",
        },
        {
          title: "Team Board",
          desc: "Quản lý task theo team và ưu tiên.",
          image: "assets/cases/task-board.svg",
          alt: "Team board preview",
        },
        {
          title: "Insight View",
          desc: "Tổng hợp xu hướng tiến độ qua các sprint.",
          image: "assets/cases/task-insight.svg",
          alt: "Insight view preview",
        },
      ],
      links: [{ label: "Case private" }, { label: "Repo theo NDA" }],
    },
  };

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeMeta) {
      themeMeta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);
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
    menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
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
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    const sections = Array.from(document.querySelectorAll("main section[id]")).filter((section) =>
      navTargets.has(`#${section.id}`),
    );

    if (sections.length === 0 || navLinks.length === 0) return;

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
      let currentId = sections[0].id;

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

        const current = items.find((item) => item.section === visible[0].target);
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

  const initProjectFilter = () => {
    const buttons = Array.from(document.querySelectorAll(".filter-btn"));
    const cards = Array.from(document.querySelectorAll(".project-card"));

    if (buttons.length === 0 || cards.length === 0) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";

        buttons.forEach((btn) => btn.classList.toggle("active", btn === button));

        cards.forEach((card) => {
          if (filter === "all") {
            card.classList.remove("is-hidden");
            return;
          }

          const type = card.dataset.projectType || "";
          const match = type.split(" ").includes(filter);
          card.classList.toggle("is-hidden", !match);
        });
      });
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
      value.textContent = "Case Study";
      const label = document.createElement("span");
      label.textContent = "Chi tiết kết quả sẽ được cập nhật theo dữ liệu thực tế.";

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
    const detail = PROJECT_CASES[projectId];

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || "";
    };

    if (!detail) {
      setText("project-case-title", "Không tìm thấy case study");
      setText(
        "project-case-summary",
        "ID dự án không hợp lệ hoặc chưa được cấu hình. Vui lòng quay lại trang chính để chọn dự án hợp lệ.",
      );
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
        (item) => typeof item.image === "string" && item.image.trim().length > 0,
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
        fallback.textContent = "Case preview media sẽ hiển thị tại đây khi bạn thêm ảnh cover.";
        heroMedia.appendChild(fallback);
      }
    }

    const architectureDiagram = document.getElementById("project-architecture-diagram");
    const architectureCaption = document.getElementById("project-architecture-caption");
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
        "Sơ đồ kiến trúc minh họa cấu trúc UI, data flow và các quyết định tổ chức module.";
    }

    renderProof(document.getElementById("project-proof-grid"), detail.proof || []);
    renderList(document.getElementById("project-architecture"), detail.architecture);
    renderList(document.getElementById("project-tech-decisions"), detail.technicalDecisions);
    renderList(document.getElementById("project-role-scope"), detail.roleScope);
    renderList(document.getElementById("project-evidence"), detail.evidence);
    renderList(document.getElementById("project-challenges"), detail.challenges);
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
          document.createTextNode("Trình duyệt không hỗ trợ phát video cho định dạng này."),
        );

        videoContainer.appendChild(video);
      } else if (detail.videoEmbed) {
        const iframe = document.createElement("iframe");
        iframe.src = detail.videoEmbed;
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.title = `${detail.title} walkthrough`;
        videoContainer.appendChild(iframe);
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "video-placeholder";

        const strong = document.createElement("strong");
        strong.textContent = "Video không public";
        const note = document.createElement("span");
        note.textContent = "Dự án thuộc phạm vi private/NDA. Có thể demo trực tiếp khi phỏng vấn.";

        placeholder.appendChild(strong);
        placeholder.appendChild(note);
        videoContainer.appendChild(placeholder);
      }
    }

    const gallery = document.getElementById("project-gallery");
    if (gallery) {
      gallery.innerHTML = "";
      (detail.gallery || []).forEach((item) => {
        const hasImage = typeof item.image === "string" && item.image.trim().length > 0;
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
        if (status) status.textContent = "Vui lòng điền đầy đủ thông tin trước khi gửi.";
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
        status.textContent = "Đang mở ứng dụng email...";
      }

      window.location.href = `mailto:thu.high.dev@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
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
    initMobileMenu();
    initHomeAnchorBehavior();
    initHeaderScroll();
    initScrollProgress();
    initSpotlightCards();
    initReveal();
    initActiveNav();
    initCaseSectionNav();
    initProjectFilter();
    renderProjectPage();
    initContactForm();
    initFooterYear();

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
