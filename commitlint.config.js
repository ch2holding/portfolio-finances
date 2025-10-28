module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nova funcionalidade
        "fix", // Correção de bug
        "docs", // Documentação
        "style", // Formatação
        "refactor", // Refatoração
        "test", // Testes
        "chore", // Manutenção
        "perf", // Performance
        "ci", // CI/CD
        "build", // Build
        "revert", // Reverter commit
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [2, "always", "lower-case"],
    "header-max-length": [2, "always", 100],
  },
};
