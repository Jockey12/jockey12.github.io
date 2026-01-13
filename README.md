
# Portfolio for Jockey12

A statically generated portfolio website built with Next.js 14+, TypeScript, and Tailwind CSS.
It fetches data from the GitHub API to showcase your profile and projects.

## Features

- **GitHub Integration**: Automatically fetches profile, repos, and READMEs.
- **Static Generation**: Fast performance with ISR (Incremental Static Regeneration).
- **Responsive Design**: Mobile-first UI with Tailwind CSS.
- **Dark Mode**: Support for system preference (and easy to extend).
- **SEO Optimized**: Meta tags and semantic HTML.

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Jockey12/portfolio-njs.git
    cd portfolio-njs
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it.

4.  **Build for production**:
    ```bash
    npm run build
    npm start
    ```

## Environment Variables

No environment variables are strictly required for public data if rate limits aren't hit.
However, to increase GitHub API limits, create a `.env.local` file:

```bash
GITHUB_TOKEN=your_personal_access_token
```

## Project Structure

- `src/app`: App Router pages.
- `src/components`: Reusable UI components.
- `src/lib`: Utilities and API fetching logic.
- `src/data`: Fallback JSON data.

## Deployment

Deploy to Vercel for the best experience:

1. Push to GitHub.
2. Import project in Vercel.
3. Deploy.

## License

MIT

