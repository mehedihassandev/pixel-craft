module.exports = {
  rules: {
    'header-max-length': [2, 'always', 50000], // Enforce header length
    'type-empty': [0], // Disable - we use custom format
    'subject-empty': [0], // Disable - we use custom format
    'mh-format': [2, 'always'], // Custom rule for MH-{number}: format
  },
  plugins: [
    {
      rules: {
        'mh-format': parsed => {
          const { header } = parsed;
          if (!header) {
            return [false, 'Header cannot be empty'];
          }

          // Check for MH-{number}: format
          const mhPattern = /^MH-\d+:\s.+$/;

          if (!mhPattern.test(header)) {
            return [
              false,
              "Header must be in format 'MH-{number}: Description' (e.g., MH-123: Add new feature)",
            ];
          }

          // Check for at least 3 words after the colon
          const afterColon = header.split(': ')[1];
          if (!afterColon || afterColon.trim().split(/\s+/).length < 3) {
            return [false, 'Description must have at least 3 words after the colon'];
          }

          // Check for imperative mood (no -ing or -ed endings)
          const firstWord = afterColon.trim().split(/\s+/)[0];
          if (/ing$|ed$/.test(firstWord.toLowerCase())) {
            return [false, "Use imperative mood (e.g., 'Add', not 'Adding' or 'Added')"];
          }

          return [true];
        },
      },
    },
  ],
  extends: [],
};
