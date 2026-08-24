module.exports = {
  // Use the standard Stylelint rules as the starting point so only project-specific changes need to be listed here.
  extends: ['stylelint-config-standard'],
  rules: {
    // This rule uses numbers like 0.5 for alpha values because that is the format used in this CSS.
    'alpha-value-notation': 'number',
    // This rule is turned off because the project mixes color function styles and does not need one forced syntax.
    'color-function-notation': null,
    // This rule is turned off because both short and long hex colors are accepted in the codebase.
    'color-hex-length': null,
    // This rule is turned off because comments are kept compact and empty lines before them are not important here.
    'comment-empty-line-before': null,
    // This rule is turned off because custom properties are grouped tightly for easier scanning.
    'custom-property-empty-line-before': null,
    // This rule is turned off because repeated declarations are sometimes used on purpose for overrides or fallbacks.
    'declaration-block-no-duplicate-properties': null,
    // This rule is turned off because longhand properties can be clearer when only part of a shorthand needs control.
    'declaration-block-no-redundant-longhand-properties': null,
    // This rule is turned off because the project allows unquoted font family names where they are valid.
    'font-family-name-quotes': null,
    // This rule is turned off because some chosen font stacks do not need an enforced generic fallback.
    'font-family-no-missing-generic-family-keyword': null,
    // This rule is turned off because zero values with units are sometimes kept for consistency with nearby values.
    'length-zero-no-unit': null,
    // This rule is turned off because the project does not need one fixed media range syntax style.
    'media-feature-range-notation': null,
    // This rule is turned off because selector order across split files can trigger warnings even when the CSS works as intended.
    'no-descending-specificity': null,
    // This rule is turned off because related selectors can appear more than once across component and utility files.
    'no-duplicate-selectors': null,
    // This rule is turned off because the project does not need one enforced style for :not() selectors.
    'selector-not-notation': null,
    // The site uses BEM component names alongside kebab-case utility classes.
    'selector-class-pattern': '^[a-z][a-z0-9]*(?:(?:-|__|--)[a-z0-9]+)*$',
    // This rule is turned off because explicit shorthand values can be easier to read during maintenance.
    'shorthand-property-no-redundant-values': null,
    // This rule is turned off because keyword casing is not important enough here to block linting.
    'value-keyword-case': null,
  },
};
