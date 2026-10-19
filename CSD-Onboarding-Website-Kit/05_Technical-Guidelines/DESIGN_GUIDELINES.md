# CSD Onboarding Website — Design Guidelines

## 1. Purpose and audience
Create a professional, interactive onboarding experience for new and existing CSD team members. The team is the direct audience, but the student journey is the human centre of the design. The site should help users understand the service system, responsibilities, handoffs and how internal coordination affects students.

## 2. Visual character
Editorial, warm, calm, confident, precise and visual-first. Avoid generic dashboard layouts, excessive cards, neon gradients, excessive glassmorphism, stock-photo overload, long walls of text and decorative animation without purpose.

## 3. Design tokens
- Background: #F7F4EE
- Surface: #FFFEFB
- Main text: #292B29
- Muted text: #706F69
- Primary accent: #774650
- Secondary accent: #B66E53
- Supporting accent: #718572
- Border: #E5DFD5
- Body font: Poppins
- Heading font: Sora (Manrope alternative)
- Desktop: 12-column grid with generous margins
- Mobile: one-column flow, diagrams become vertically navigable
- Use consistent spacing, fine dividers, moderate corner radius and restrained shadows.

## 4. Motion and interaction
Use subtle scroll reveals, progressive SVG connector lines, stage selection, actor highlighting, hover/focus feedback, a slim scroll progress indicator and restrained parallax in decorative layers. Use Motion for React/Framer Motion only if supported; CSS transitions and Intersection Observer are acceptable alternatives. Respect prefers-reduced-motion. All interactions must be keyboard accessible and have visible focus states.

## 5. Information architecture
1. Welcome
2. CSD Ecosystem / actor map
3. Roles & Responsibilities
4. CSD Operational Process — separate full-width section
5. Stakeholder Guide
6. Information & Tools
7. Communication Protocols
8. Student Placement Journey — separate full-width section
9. Scenario Simulator
10. First-Week Checklist

## 6. Diagram requirements
- Actor map: CSD Team in the centre; Students, SPOCs, HODs, Faculty/Mentors, Companies/Recruiters and Placement Leadership around it.
- Do not include Alumni anywhere in the actor map or stakeholder network.
- Use only relationships supported by the actual source map/research. Do not draw inferred connections.
- CSD operational process: eight stages as in the JSON dataset.
- Student placement journey: seven stages as in the JSON dataset.
- If maps have not been supplied yet, create labelled placeholders with the same dimensions and interaction structure. Replace them after source maps are provided.

## 7. Content integrity
Use the supplied research and JSON as the source of truth. Do not invent official policies, placement statistics, SLAs, response-time promises, deadlines or responsibilities. Scenario responses and communication principles are suggested guidance, not official policy. Mark uncertain details for confirmation.

## 8. Accessibility and responsiveness
Use semantic HTML, logical heading hierarchy, adequate contrast, keyboard support, descriptive labels, reduced-motion support and readable content without animation. Ensure the maps reflow for mobile and never force horizontal page overflow.

## 9. Definition of done
All ten sections are present. Both journey/process maps are separate full-width sections. The actor map has no Alumni. All interactive controls work. No placeholder text remains except intentionally labelled map placeholders awaiting final source maps. The site builds successfully and is usable on desktop, tablet and mobile.
