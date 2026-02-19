# A.T.L.A.S. Overview

Project A.T.L.A.S. stands for Assistant Technology Leveraging Accessibility Systems. 

The goal is to provide a local-first app for supporting folks suffering from executive dysfunction. Organization systems can be one of the most significant quality of life upgrades, but the manual organizing and upkeep can prevent people who need them most from being able to access the benefits of them. 

A.T.L.A.S.' goal is NOT to be a perfectly customized system for everybody. Its goal is to be A system that automates as much of the organizing as possible for fast input and retrieval. Full text search is built-in, with additional semantic searching coming in a future release through local-only private service integrations.

## Developer Background

As someone who was diagnosed with autism and ADHD at 30, I've struggled with executive dysfunction for my entire life. I have always had trouble keeping things from slipping through the cracks on my own, but no matter what I tried, every system took more work than I could put in. 

A.T.L.A.S. is ultimately the result of why I got into coding to begin with. I've always seen technology as something rare and impactful, and now I've finally been able to line up my day job with a coding framework accessible from pretty much everywhere. Now is the perfect time to make the automated system, that like a friend helping, might not use the exact system for whatever situation, but does accomplish the goal nonetheless.

## Getting Started with A.T.L.A.S.

### Developer Experience

After downloading, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## UI Components
We use [shadcn/ui](https://ui.shadcn.com/) for our component library.

**To add a new primitive:**
```bash
npx shadcn add [component-name]
# Example: npx shadcn add accordion

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
