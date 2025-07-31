module.exports = {
    rules: {
        "type-enum": [2, "always", ["MH"]], // Enforce "MH" type
        "header-max-length": [2, "always", 50000], // Enforce header length
        "scope-empty": [2, "never"], // Scope must not be empty
        "scope-case": [2, "always", "lower-case"], // Ensure scope is lowercase
        "scope-pattern": [2, "always"], // Custom scope pattern rule
    },
    plugins: [
        {
            rules: {
                "scope-pattern": (parsed) => {
                    if (!parsed.scope) {
                        return [false, `Scope must not be empty.`];
                    }

                    const scopePattern = /^[0-9]{3}$/; // Match 3-digit numeric scope

                    return [
                        scopePattern.test(parsed.scope),
                        `Scope must be a 3-digit number (e.g., 000, 123).`,
                    ];
                },
            },
        },
    ],
    extends: [],
};
