# Writing Blocks GPT 📝✨

Welcome to Writing Blocks GPT! This is a modern web application built with Next.js that helps you enhance your writing using AI-powered tools.

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)
- An OpenAI API key

### 🛠️ Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/writing-blocks-gpt.git
   cd writing-blocks-gpt
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

### 🏃‍♂️ Running the Application

To start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
pnpm build
pnpm start
```

## 🛠️ Tech Stack

This project is built with modern technologies:

- [Next.js 15](https://nextjs.org/) - React framework with server-side rendering
- [React 19](https://reactjs.org/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [OpenAI API](https://openai.com/) - AI capabilities
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives

## 📦 Project Structure

```
writing-blocks-gpt/
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # Reusable React components
│   ├── lib/         # Utility functions and configurations
│   └── prompts/     # AI prompt templates
├── public/          # Static assets
└── ...config files
```

## 🤝 Contributing

Feel free to contribute to this project! Whether it's bug fixes, new features, or improvements to the documentation, all contributions are welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

---

Happy writing! ✍️ If you have any questions or run into issues, please don't hesitate to open an issue on GitHub.
