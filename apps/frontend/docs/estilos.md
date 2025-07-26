# Styles and Tailwind CSS

This project uses **Tailwind CSS** as the main framework for styles. Here you'll find a quick guide on how styles are managed and some recommendations to maintain visual consistency throughout the application.

---

## Why Tailwind?

- Allows you to write styles quickly and consistently using utility classes.
- Makes customization and responsive design easy.
- Reduces the need for extensive custom CSS files.

---

## Styles Structure

- The main styles file is located at:
  `src/styles/index.css`
- Here, Tailwind is imported and you can add global styles if necessary.

```css
@import 'tailwindcss';

:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  color-scheme: light dark;
}
```

---

## Using Tailwind Classes

- Use utility classes directly in your JSX/TSX components.
- Example:
  ```tsx
  <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
    Save
  </button>
  ```

---

## Best Practices

- **Avoid inline styles** (`style={{ ... }}`) except for very specific cases.
- **Do not modify Tailwind files directly**. Customize using the configuration file (`tailwind.config.js`) if needed.
- **Group related classes** to improve readability:
  ```tsx
  <div className="flex flex-col items-center justify-center gap-4 py-8">
    ...
  </div>
  ```
- **Use responsive and state variants** (`hover:`, `md:`, etc.) to enhance user experience.

---

## Useful Resources

- [Official Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Playground](https://play.tailwindcss.com/)

