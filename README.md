# 🌊 DeepDive

A beautiful web application that explores and visualizes GitHub repository structures with an elegant tree interface.

![DeepDive Banner](https://img.shields.io/badge/DeepDive-Repository%20Explorer-blue?style=for-the-badge&logo=github)

## ✨ Features

- 🔍 **Repository Search** - Search any public GitHub repository by owner and name
- 🌳 **Tree Visualization** - Beautiful hierarchical display of files and folders
- 📊 **Repository Info** - View stars, forks, language, and description
- 📁 **File Details** - See file sizes and proper organization
- 🎨 **Modern UI** - Clean, responsive design with gradient backgrounds
- 🌙 **Dark Mode Ready** - Built-in support for light and dark themes
- ⚡ **Fast Loading** - Optimized performance with loading states
- 📱 **Mobile Friendly** - Responsive design that works on all devices

## 🚀 Demo

Try exploring these popular repositories:

- `facebook/react`
- `vercel/next.js`
- `microsoft/vscode`
- `tailwindlabs/tailwindcss`

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [GitHub REST API](https://docs.github.com/en/rest)

## 📦 Installation

### Option 1: Clone and Install

\`\`\`bash

# Clone the repository

git clone https://github.com/ikegwuonu/deepdive.git

# Navigate to the project directory

cd deepdive

# Install dependencies

npm install

# Start the development server

npm run dev
\`\`\`

### Option 2: Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/deepdive)

## 🎯 Usage

1. **Enter Repository Details**

   - Input the repository owner (e.g., "facebook")
   - Input the repository name (e.g., "react")

2. **Explore the Structure**

   - View repository information including stars, forks, and language
   - Browse the complete file and folder structure
   - See file sizes and organization

3. **Navigate the Tree**
   - Folders are displayed with blue folder icons
   - Files show with gray file icons
   - File sizes are displayed in KB

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The app uses the public GitHub API which has rate limiting for unauthenticated requests.

For higher rate limits, you can optionally add:

\`\`\`env
GITHUB_TOKEN=your_github_personal_access_token
\`\`\`

### API Rate Limits

- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

## 📁 Project Structure

\`\`\`
deepdive/
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ ├── loading.tsx
│ └── page.tsx
├── components/
│ └── ui/
│ ├── button.tsx
│ ├── card.tsx
│ ├── input.tsx
│ └── ...
├── lib/
│ └── utils.ts
├── public/
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
\`\`\`

## 🎨 Customization

### Changing Colors

Edit the color scheme in `tailwind.config.ts`:

\`\`\`typescript
theme: {
extend: {
colors: {
// Add your custom colors here
}
}
}
\`\`\`

### Adding Features

The codebase is modular and easy to extend:

- Add new API endpoints in the `fetchRepoData` function
- Extend the tree visualization in the `renderTree` function
- Add new UI components using shadcn/ui

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing repository data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com/) for hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## 📧 Contact

**ikegwuonu** - Developer

---

<div align="center">
  <p>Developed with ❤️ by ikegwuonu</p>
  <p>
    <a href="#top">Back to top</a>
  </p>
</div>
