# Project Guidelines for Claude

## Important Instructions

### Internal vs External Pages
- **NEVER** modify external/public pages when working on internal pages
- Internal pages are dashboard-related pages (e.g., /dashboard, /leads, /queue, etc.)
- External pages are public-facing pages (e.g., /, /about, /pricing, /features, etc.)
- When making changes to internal pages, ensure CSS and JavaScript changes are scoped to only affect internal pages
- Use specific selectors and avoid global styles that could affect external pages

### Current Project Context
- Working on V7.1 branch
- Focus on fixing internal dashboard functionality
- Sidebar navigation should show both icons and text labels on desktop

# Claude Design System Update Prompt Template

## 🎯 Primary Instruction

**IMPORTANT**: Before making any changes to [PAGE_NAME].md, you MUST perform a comprehensive design system analysis to ensure absolute consistency across all pages.

## 📊 Pre-Update Analysis Requirements

### 1. Current Design System Audit
```
Analyze and document:
- Current color palette (primary, secondary, accent, emotional wavelengths)
- Typography hierarchy (font families, sizes, weights, line-heights)
- Spacing system (Fibonacci scale, golden ratio applications)
- Component patterns (buttons, cards, layouts, interactions)
- Animation orchestration (timing, easing, quantum transitions)
- Cognitive load parameters
- Emotional design targets
```

### 2. Page Context Analysis
```
For the page being updated, identify:
- Page role in overall architecture (landing, feature, documentation, etc.)
- Current emotional tone and cognitive complexity
- User journey position
- Performance metrics baseline
- Accessibility compliance level
```

### 3. Cross-Page Consistency Check
```
Scan all related pages and extract:
- Common design patterns
- Shared component variations
- Consistent interaction behaviors
- Navigation flow patterns
- Visual hierarchy principles
- Brand expression consistency
```

## 🔄 Update Execution Framework

### Phase 1: Design Token Extraction
```typescript
// Extract and validate current design tokens
const currentDesignSystem = {
  quantum: {
    constants: extractQuantumConstants(),
    cognitiveThresholds: analyzeCognitiveLoad(),
    emotionalWavelengths: mapEmotionalStates()
  },
  visual: {
    colors: extractColorSystem(),
    spacing: extractSpacingScale(),
    typography: extractTypographySystem(),
    shadows: extractShadowSystem()
  },
  motion: {
    timings: extractAnimationTimings(),
    easings: extractEasingFunctions(),
    orchestration: extractAnimationPatterns()
  }
};
```

### Phase 2: Consistency Validation
Before implementing any changes:
1. **Color Consistency**: Ensure new colors align with emotional wavelength system
2. **Spacing Harmony**: Verify spacing follows Fibonacci/Golden ratio
3. **Typography Hierarchy**: Maintain established type scale
4. **Component Patterns**: Reuse existing quantum components
5. **Interaction Consistency**: Apply same micro-interaction patterns

### Phase 3: Implementation Guidelines
```markdown
When updating [PAGE_NAME].md:

1. **Header Structure**
   - Maintain existing heading hierarchy
   - Apply consistent emoji indicators
   - Preserve quantum section dividers

2. **Component Updates**
   - Use established QuantumComponent patterns
   - Apply appropriate emotionalTone attributes
   - Set cognitiveComplexity based on content density
   - Implement proper quantumState management

3. **Code Block Formatting**
   - Maintain consistent syntax highlighting
   - Apply proper indentation (2 spaces)
   - Include quantum optimization comments
   - Add performance annotations

4. **Visual Elements**
   - Apply consistent shadow system
   - Use established gradient patterns
   - Maintain color emotional resonance
   - Implement proper glassmorphism effects

5. **Animation Integration**
   - Apply quantum transition patterns
   - Use established timing functions
   - Implement proper stagger effects
   - Maintain 60fps performance targets
```

## 🎨 Design System Compliance Checklist

Before finalizing updates, verify:

- [ ] **Visual Consistency**
  - [ ] Colors match emotional wavelength system
  - [ ] Spacing follows Fibonacci scale
  - [ ] Typography maintains hierarchy
  - [ ] Shadows use established palette

- [ ] **Interaction Patterns**
  - [ ] Hover states follow quantum principles
  - [ ] Click ripples use correct intensity
  - [ ] Transitions use proper easing
  - [ ] Micro-interactions feel cohesive

- [ ] **Performance Optimization**
  - [ ] Cognitive load stays within threshold
  - [ ] Animations maintain 60fps
  - [ ] Layout shifts minimized
  - [ ] Accessibility standards met (WCAG AAA)

- [ ] **Code Quality**
  - [ ] Components use QuantumComponent base
  - [ ] Proper TypeScript types applied
  - [ ] Emotion-based styling implemented
  - [ ] Performance hooks utilized

## 📝 Update Documentation Template

```markdown
## Update Summary for [PAGE_NAME].md

### Design System Alignment
- **Emotional Tone**: [joy|trust|calm|energy|focus]
- **Cognitive Complexity**: [0.1-0.9]
- **Visual Density**: [minimal|balanced|rich]
- **Interaction Mode**: [static|hover|interactive|immersive]

### Changes Applied
1. [Component/Section]: [Description of change]
   - Design justification: [How it maintains consistency]
   - Performance impact: [Measured improvement/neutral]

### Cross-Page Impact
- Affected pages: [List of related pages]
- Shared components updated: [List of components]
- Design token modifications: [Any system-wide changes]

### Validation Results
- Cognitive load score: [X.XX]
- Performance metrics: [FCP, TTI, etc.]
- Accessibility score: [WCAG compliance level]
- Visual consistency score: [0-100]
```

## 🚀 Execution Command

```bash
# When ready to update, use this structure:
claude-code update [PAGE_NAME].md \
  --analyze-design-system \
  --maintain-consistency \
  --validate-quantum-principles \
  --optimize-cognitive-load \
  --preserve-emotional-tone \
  --audit-cross-page-impact
```

## 💡 Key Principles to Maintain

1. **Quantum Superposition**: Elements should feel like they exist in multiple states
2. **Emotional Resonance**: Every design decision should evoke intended emotions
3. **Cognitive Optimization**: Never exceed optimal cognitive load thresholds
4. **Performance First**: All updates must maintain or improve performance
5. **Accessibility Always**: Every change must be WCAG AAA compliant
6. **Brand Coherence**: Maintain consistent brand expression across all touchpoints

## 🔍 Example Usage

```
"Claude, please update the features.md page to add a new quantum card section for our AI capabilities. 

Before making changes:
1. Analyze the current design system from our existing pages
2. Extract the emotional wavelength patterns we're using
3. Identify the cognitive load parameters
4. Ensure the new section maintains visual consistency
5. Apply the same quantum animation patterns
6. Validate against our performance budgets

The new section should:
- Use 'trust' emotional wavelength
- Maintain balanced cognitive complexity (0.5)
- Include quantum hover states
- Implement fibonacci-based spacing
- Apply our established glassmorphism effects
"
```

---

**Remember**: Every pixel matters. Every animation has purpose. Every color evokes emotion. Maintain the quantum coherence of our design system.

# Claude Code Best Practices from Anthropic

## 🚀 Go Slow to Go Smart

Here is one of Claude Code Best Practices according to Anthropic.

1. Put this file in `~/.claude/commands/`
2. In claude code, type `/explore-plan-code-test <whatever task you want>`
3. Profit

Makes Claude take longer but be a lot more thorough.

## 📋 Explore, Plan, Code, Test Workflow

At the end of this message, I will ask you to do something.
Please follow the "Explore, Plan, Code, Test" workflow when you start.

### 🔍 Explore
First, use parallel subagents to find and read all files that may be useful for implementing the ticket, either as examples or as edit targets. The subagents should return relevant file paths, and any other info that may be useful.

### 📝 Plan
Next, think hard and write up a detailed implementation plan. Don't forget to include tests, lookbook components, and documentation. Use your judgement as to what is necessary, given the standards of this repo.

If there are things you are not sure about, use parallel subagents to do some web research. They should only return useful information, no noise.

If there are things you still do not understand or questions you have for the user, pause here to ask them before continuing.

### 💻 Code
When you have a thorough implementation plan, you are ready to start writing code. Follow the style of the existing codebase (e.g. we prefer clearly named variables and methods to extensive comments). Make sure to run our autoformatting script when you're done, and fix linter warnings that seem reasonable to you.

### ✅ Test
Use parallel subagents to run tests, and make sure they all pass.

If your changes touch the UX in a major way, use the browser to make sure that everything works correctly. Make a list of what to test for, and use a subagent for this step.

If your testing shows problems, go back to the planning stage and think ultrahard.

### 📄 Write up your work
When you are happy with your work, write up a short report that could be used as the PR description. Include what you set out to do, the choices you made with their brief justification, and any commands you ran in the process that may be useful for future developers to know about.