// Password Validator (Modern JS)

const validatePassword = (password) => {
  const errors = [];
  const suggestions = [];
  let score = 0;

  const commonPasswords = ["password", "123456", "qwerty", "admin", "letmein"];

  // Validation rules (array-driven)
  const rules = [
    {
      check: pwd => pwd.length >= 8,
      error: `Too short`,
      suggestion: `Use at least 8 characters`,
      score: 20
    },
    {
      check: pwd => /[A-Z]/.test(pwd),
      error: `Missing uppercase letter`,
      suggestion: `Add an uppercase letter`,
      score: 15
    },
    {
      check: pwd => /[a-z]/.test(pwd),
      error: `Missing lowercase letter`,
      suggestion: `Add a lowercase letter`,
      score: 15
    },
    {
      check: pwd => /[0-9]/.test(pwd),
      error: `Missing number`,
      suggestion: `Add a number`,
      score: 15
    },
    {
      check: pwd => /[!@#$%^&*()_+\-=]/.test(pwd),
      error: `Missing special character`,
      suggestion: `Add a special character`,
      score: 15
    }
  ];

  // Apply rules using array method
  rules.forEach(rule => {
    if (rule.check(password)) {
      score += rule.score;
    } else {
      errors.push(rule.error);
      suggestions.push(rule.suggestion);
    }
  });

  // Common password check
  if (commonPasswords.some(pwd => pwd === password.toLowerCase())) {
    errors.push(`Common password`);
    suggestions.push(`Avoid common passwords`);
    score -= 30;
  } else {
    score += 20;
  }

  // Clamp score between 0–100
  score = Math.max(0, Math.min(100, score));

  return {
    isValid: errors.length === 0,
    score: Number(`${score}`),
    errors,
    suggestions
  };
};

// Button Handler (Arrow Function)
const checkPassword = () => {
  const pwd = document.getElementById("password").value;
  const result = validatePassword(pwd);

  document.getElementById("output").textContent =
    `${JSON.stringify(result, null, 2)}`;
};

// Test Cases
console.log(validatePassword("abc"));
console.log(validatePassword("MyP@ssw0rd!2024"));
