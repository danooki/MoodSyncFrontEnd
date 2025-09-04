# Frontend Design Principles

_Keep it simple, readable and modular_

## Core Rules

### **1. Simplicity First**

- Use simple, clear and identificable names.
- Keep functions small and focused.

### **2. Component Rules**

- **Pages**: Only use existing components.
- **Components**: Reusable and single-purpose.
- **Hooks**: Simple state management, avoid complex logic
- **Utils**: Basic helper functions only.

## ⚛️ React Guidelines

### **Hooks to Use**

- `useState` - for local state
- `useEffect` - for data fetching
- `onSubmit` - for forms

### **Hooks to Avoid**

- `useCallback`, `useMemo`, `useRef`, `useReducer`

### **State Management**

- Keep state local to components
- Use simple `useState` only

## Styling

- Use Tailwind utility classes only
- Keep class names readable
- Avoid custom CSS

## Common Patterns

### **API Calls**

```jsx
const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/endpoint`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setData(data);
    }
  } catch (error) {
    setError("Something went wrong");
  }
};
```

### **Form Handling** (onSubmit / onClick)

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const result = await submitForm(formData);

  if (result.success) {
    navigate("/success");
  } else {
    setError(result.message);
  }

  setIsLoading(false);
};
```

## Avoid

- Complex JavaScript patterns
- Advanced React features
- Redux or complex state management
- Complex form validation libraries

## What to Use

- Basic `useState` and `useEffect`
- Simple form handling (onSubmit for forms, onClick for buttons)
- Basic and centralized error handling
- Simple API calls with `fetch`
- Basic conditional rendering
- Use existing components
