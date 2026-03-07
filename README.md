# Dynamic Wedding Invitation 💍

A sleek, modern wedding invitation built with React, Vite, and Framer Motion. This project converts static images into an interactive, magazine-like experience.

## ✨ Features

- **Premium Animations**: Built with Framer Motion, featuring smooth, high-quality transitions between pages.
- **Interactive Gallery**: A swipeable, responsive gallery replacing the traditional long-scroll design. Supports both mouse drag and touch swipe gestures, as well as button navigation.
- **Personalized Receivers**: Dynamically render the recipient's name on the opening screen using a simple URL parameter.
- **Background Audio**: Seamless background music (`music.mp3`) managed by a custom Audio Player component that respects modern browser autoplay policies.
- **Netlify Ready**: Pre-configured `netlify.toml` for instant deployment.

## 🔗 How to use the Receiver Feature

You can personalize the invitation by passing a `to` parameter in the URL.

```text
https://your-domain.com/?to=John+Doe
```

When this parameter is present, it will elegantly render "Dear John Doe," using the `Alex Brush` cursive font on the opening envelope screen. If no parameter is present, it simply displays the standard template.

## 🚀 Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Deployment

This repository is configured to be deployed on **Netlify**. Simply connect your GitHub repository to Netlify, and it will automatically handle the build process, taking into account the routing rules defined in `netlify.toml`.
