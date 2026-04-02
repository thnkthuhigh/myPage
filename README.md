# Nguyễn Chí Thanh — Portfolio (React + TypeScript)

Portfolio website cho vị trí **Frontend Internship**.

## Tech Stack

- React 18
- TypeScript 5
- Vite 6
- ESLint 9

## Quick Start

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

## Build Production

```bash
npm run build
npm run preview
```

## Quality Gates

```bash
npm run typecheck
npm run lint
npm run ci
```

- `typecheck`: strict TypeScript project check
- `lint`: ESLint static analysis
- `ci`: local equivalent of GitHub Actions CI pipeline

## Deployment (GitHub Pages)

- Auto deploy workflow: `.github/workflows/deploy-pages.yml`
- Trigger: push to `main` or manual `workflow_dispatch`
- Deploy artifact includes React build output from `dist/` and static assets needed by case-study media (`assets/`, `ava.jpg`, `CNAME`).

CV and project case-study pages now run fully on React routes (no legacy HTML pages).

## Project Structure

```text
src/
  data/
    portfolioData.ts
  pages/
    index.ts
    HomePage.tsx
    ProjectsPage.tsx
    ProjectDetailPage.tsx
    CvPage.tsx
  types/
    portfolio.ts
  components/
    Header.tsx
    Hero.tsx
    Highlights.tsx
    Projects.tsx
    Skills.tsx
    Contact.tsx
  App.tsx
  main.tsx
  styles.css
```

## Data Integrity (No Information Drift)

- All profile information is centralized in `src/data/portfolioData.ts`.
- Components only render data from this single typed source.
- Data model is enforced via `src/types/portfolio.ts` and `readonly` structures.
- This prevents copy mismatch across sections and keeps recruiter-facing info consistent.

## Import Convention

- Import page modules through the barrel file `src/pages/index.ts`.
- In app-level wiring, use `import { ... } from "./pages"` instead of deep page imports.
- This keeps editor resolution stable and avoids transient module-not-found diagnostics.

## Content Consistency Check

- Technical fixes (routing/import resolution/workflow) must not modify recruiter-facing profile text.
- Before merge, re-check these content sources:
  - `src/data/portfolioData.ts`
  - `src/pages/CvPage.tsx`

## Notes for Recruiters / Tech Leads

- This portfolio repository is now implemented with **React + TypeScript**.
- Project case-study links point to real repositories under `thnkthuhigh`.
- Positioning is intentionally internship-focused: practical implementation, collaboration, and learning speed.
- Pull requests/pushes to `main` are validated by GitHub Actions CI (`typecheck + lint + build`).

## Contact

- Email: `ngchithanh.dev@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/thnkthuhigh/`
- GitHub: `https://github.com/thnkthuhigh`
