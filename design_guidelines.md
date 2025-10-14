# Design Guidelines: Cochlea LED Visualizer

## Design Approach: Scientific Data Visualization System

**Selected Framework**: Material Design 3 with scientific visualization principles  
**Rationale**: This educational medical application prioritizes clarity, data accuracy, and accessibility. Material Design provides robust patterns for data-dense interfaces while maintaining visual hierarchy and readability essential for MBBS students and faculty.

**Core Design Principles**:
- Scientific precision over decorative elements
- Maximum readability and data comprehension
- Clear visual hierarchy for complex information
- Accessibility-first approach for medical education
- Professional, clinical aesthetic appropriate for academic use

---

## Color Palette

### Light Mode (Primary)
- **Background**: 255 0% 100% (pure white for clinical clarity)
- **Surface**: 210 20% 98% (subtle cool gray for cards/panels)
- **Primary Brand**: 210 100% 45% (#0066CC - professional medical blue)
- **Text Primary**: 220 25% 8% (#0b132b - high contrast dark blue-black)
- **Text Secondary**: 220 15% 40% (muted for supporting text)
- **Data Accent**: 280 65% 55% (purple for interactive data elements)
- **Success/Active LED**: 142 76% 36% (medical green for active states)
- **Warning**: 38 92% 50% (amber for alerts)

### Dark Mode
- **Background**: 220 25% 8% (matches primary text from light mode)
- **Surface**: 220 20% 12% (elevated surface)
- **Primary Brand**: 210 90% 60% (brighter blue for dark backgrounds)
- **Text Primary**: 0 0% 100% (pure white)
- **Text Secondary**: 220 10% 70% (muted light gray)

### LED/Visualization Colors
- **Frequency Colormap**: Viridis scale (perceptually uniform)
  - Low frequencies: 280 65% 25% (deep purple)
  - Mid frequencies: 180 85% 45% (cyan-green)
  - High frequencies: 60 95% 65% (bright yellow)

---

## Typography

### Font Families
- **Primary**: Inter (via Google Fonts CDN) - body text, UI elements, data labels
- **Monospace**: JetBrains Mono - numerical data, coordinates, frequency values

### Type Scale
- **H1 (Page Title)**: 32px/1.2, font-weight 600, letter-spacing -0.02em
- **H2 (Section Headers)**: 24px/1.3, font-weight 600
- **H3 (Graph Titles)**: 18px/1.4, font-weight 600
- **Body Text**: 16px/1.6, font-weight 400
- **Caption/Labels**: 14px/1.5, font-weight 500
- **Data Display**: 20px/1.2, font-weight 500, monospace
- **Small (Tooltips)**: 12px/1.4, font-weight 400

---

## Layout System

### Spacing Primitives
Primary units: 4, 8, 12, 16, 24, 32, 48, 64 (Tailwind: 1, 2, 3, 4, 6, 8, 12, 16)

### Grid Structure
- **Main Container**: max-w-7xl with px-4 (mobile) → px-8 (desktop)
- **Graph Grid**: 12-column grid system for responsive data layouts
- **3D Viewer**: Fixed aspect ratio container (16:9 or 4:3)
- **Control Panels**: Sidebar width 320px (desktop) / full-width drawer (mobile)

### Vertical Rhythm
- Section padding: py-8 (mobile) → py-12 (tablet) → py-16 (desktop)
- Component spacing: gap-6 for related items, gap-12 for distinct sections
- Graph margin: mb-8 between stacked visualizations

---

## Component Library

### Primary Components

**3D Cochlea Viewer**
- Dark surface background (220 20% 12%) for model contrast
- LED indicators: 8px diameter circles with glow effect (box-shadow)
- Hover tooltips: white surface with 4px rounded corners, elevated shadow
- Controls overlay: semi-transparent panel (background blur-md) bottom-right

**Graph Containers**
- White surface with subtle border (220 15% 90%)
- 16px padding, 8px rounded corners
- Title bar with graph name + export button (top-right)
- "How to read this" explanatory text in colored pill (primary/10 background)
- Axis labels in 14px medium weight, gridlines in 220 10% 92%

**Data Cards**
- Elevated surface with 1px border
- 12px padding, 6px rounded corners
- Header with icon + title, body with large numerical display
- Real-time update indicator: subtle pulse animation on value change

**Control Panels**
- Grouped settings in accordion-style collapsible sections
- Input fields: 44px height (touch-friendly), 8px rounded, subtle focus ring
- Sliders with visible tick marks for key values
- Toggle switches using Material Design switch pattern

**Navigation**
- Sticky header with 64px height
- Tab navigation for main sections (3D View, Graphs, Theory, Settings)
- Active tab: 3px bottom border in primary color
- Breadcrumb trail for multi-level settings

### Interactive Elements

**Buttons**
- Primary: Solid primary color, 40px height, 8px rounded, 500 weight text
- Secondary: Outline style with primary border, transparent background
- Icon buttons: 40×40px touch target, circular hover state
- Export/Action: Elevated shadow, icon + text label

**Forms**
- Input fields: 1px border, 8px radius, 12px padding
- Focus state: 2px primary border, subtle shadow
- Error state: red-600 border with helper text below
- Numeric inputs: Monospace font with step controls

**Tooltips & Popovers**
- White surface, 8px rounded, elevated shadow (4px blur)
- Arrow pointer 8px size
- Max-width 280px for readability
- Appear on 300ms hover delay

---

## Data Visualization Standards

### Graph Aesthetics
- **Axis lines**: 1px, 220 15% 80% color
- **Gridlines**: 1px dashed, 220 10% 92% color
- **Data lines**: 2-3px stroke width, smooth curves
- **Interactive points**: 6px radius, enlarge to 8px on hover
- **Color consistency**: Use frequency colormap for all frequency-related displays

### Axis Specifications
- **Font**: 12px Inter, 500 weight
- **Tick length**: 6px extending from axis
- **Label padding**: 8px from axis
- **Units**: Always display in parentheses after label (e.g., "Frequency (Hz)")

### Legend Placement
- Position: Top-right corner of graph or below x-axis
- Style: Inline horizontal layout with 16px spacing between items
- Markers: 12×12px color squares with 4px rounded corners

---

## Educational Content Sections

### Theory Cards
- Large icon (48×48px) in primary color at top
- Title in H3, description in body text
- Illustrative diagram below (SVG with primary/accent colors)
- "Learn more" link in primary color at bottom

### Video Embed
- 16:9 aspect ratio container with 8px rounded corners
- Subtle border, centered in section
- Caption below in secondary text color

### Comparison Table
- Striped rows (alternating background: white / 220 10% 98%)
- Header row: primary/10 background, 600 weight text
- Cell padding: 12px vertical, 16px horizontal
- Sticky header on scroll

---

## Accessibility Features

- **Contrast ratios**: Minimum 4.5:1 for all text, 7:1 for data displays
- **Focus indicators**: 3px solid ring in primary color, 2px offset
- **Keyboard navigation**: Tab order follows visual hierarchy, skip links for graphs
- **Screen reader**: ARIA labels on all interactive elements, live regions for real-time data
- **Color blindness**: Never rely on color alone, use patterns + labels
- **Touch targets**: Minimum 44×44px for all interactive elements

---

## Animation Guidelines

**Use sparingly - only where functionally meaningful**

- LED blinking: 500ms pulse on frequency detection (ease-in-out)
- Data updates: 200ms fade transition for value changes
- Graph rendering: Stagger line drawing 50ms per series
- Panel transitions: 300ms slide for settings drawers
- Loading states: Subtle skeleton screens, no spinners

**Forbidden**: Decorative hover animations, floating elements, parallax effects

---

## Responsive Breakpoints

- **Mobile**: < 640px - Single column, stacked graphs, full-width controls
- **Tablet**: 640px - 1024px - 2-column graph grid, side-by-side theory cards
- **Desktop**: > 1024px - 3-column layouts, persistent side panel for controls
- **Large screens**: > 1440px - Max container width, extra margin on sides

---

## Images

**Required Images**:
1. **Theory Diagrams** (SVG illustrations):
   - Place Theory: Cross-section cochlea diagram showing base-to-apex frequency gradient
   - Frequency Theory: Waveform with neural spike timing alignment
   - Volley Theory: Multiple neuron firing pattern diagram
   - Style: Clean line art in primary color (210 100% 45%) on white background

2. **Placeholder 3D Model**: 
   - Anatomically accurate cochlea GLB file
   - Neutral gray material (220 10% 60%)
   - Clear LED node positions along spiral

**No hero image** - This is a functional application that launches directly into the 3D visualization interface.