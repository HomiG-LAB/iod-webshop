# Design System Strategy: Kinetic Tactility
**Project ID:** 9135054782499456142

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Playground."** 

Unlike traditional "kiddie" interfaces that rely on chaotic primary colors and busy textures, this system treats the digital space like a premium pumptrack: fluid, safe, and high-performance. We are blending the raw energy of action sports with an editorial, eco-conscious aesthetic. The goal is "Organic Brutalism"—using the heavy, technical weight of `spaceGrotesk` against ultra-soft, rounded containers that mimic the recycled foam of high-end protective gear. 

The layout should feel like it’s in motion. We break the grid using intentional asymmetry—overlapping cards, text that bleeds off-canvas, and staggered vertical spacing—to mimic the rhythm of a rider navigating a track.

## 2. Colors: High-Vis Meets Soft-Touch
Our palette balances "Safety High-Vis" with "Recycled Neutrals." We use vibrant neons to represent speed and action, while the neutral base communicates the soft, plastic-free materials of the products.

*   **Primary (`#3f6600`) & Primary Container (`#a3fe00`):** This is our "Electric Lime." Use the Container token for high-impact zones.
*   **Secondary (`#a63400`) & Secondary Container (`#ffc4b1`):** "Burnished Clay." These represent the earthen elements of the track and eco-friendly packaging.
*   **Tertiary (`#00647a`):** "Velocity Blue." Used for technical details or customizable features.

### The "No-Line" Rule
To maintain the "Soft Material" vibe, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly on a `surface` background to create a soft, molded appearance.

### Surface Hierarchy & Nesting
Treat the UI as a series of molded layers. 
- Use `surface-container-lowest` for the "base" track.
- Use `surface-container-high` or `highest` for interactive elements that need to feel "closer" to the user.
- **Nesting Logic:** An inner container should always be one "tier" higher than its parent to simulate physical depth.

### The "Glass & Gradient" Rule
To avoid a flat, "cheap" look, use Glassmorphism for floating navigation or overlays. Apply `surface` colors at 70% opacity with a `20px` backdrop-blur. 
**Signature Texture:** Apply a subtle linear gradient from `primary` to `primary_container` on hero CTAs to give them a "tubular" 3D feel reminiscent of bike frames.

## 3. Typography: The Technical Edit
We use typography to bridge the gap between "playful" and "professional gear."

*   **Display & Headlines (`spaceGrotesk`):** This is our "Technical" voice. It’s wide, bold, and feels like high-end signage. Use `display-lg` for hero moments, often with a slight negative letter-spacing (-2%) to tighten the "energy."
*   **Body & Titles (`plusJakartaSans`):** This is our "Human" voice. It provides a soft contrast to the headlines. Plus Jakarta’s rounded terminals perfectly complement our `1rem` corner radius.
*   **The Contrast Play:** Pair a `display-sm` headline in all-caps with `body-md` for a sophisticated, editorial look that avoids looking like a typical "toy" website.

## 4. Elevation & Depth: Tonal Layering
We do not use harsh drop shadows. We convey height through "Tonal Layering."

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a "recessed" or "embossed" look that feels premium and tactile.
*   **Ambient Shadows:** If an element must float (like a "Build Your Bike" modal), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(45, 47, 44, 0.06);`. The shadow color is a tint of our `on-surface` token, never pure black.
*   **The "Ghost Border":** For accessibility on inputs, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Frosted Overlays:** Use `surface_variant` at 60% opacity with a heavy blur for tooltips and snackbars to maintain the eco-friendly "recycled glass" aesthetic.

## 5. Components

### Buttons: The "Padded" Style
*   **Primary:** `primary_container` background with `on_primary_container` text. 
*   **Shape:** Use the `full` (9999px) roundedness for a "pill" look that mimics handlebar grips.
*   **Interaction:** On hover, shift to `primary_fixed_dim`. On press, scale the button down to 0.96 for a tactile "squish" effect.

### Cards: The "Molded" Form
*   **Visuals:** No borders. Use `surface_container_low`. 
*   **Rounding:** Always use `xl` (3rem) for large product cards and `lg` (2rem) for content cards. 
*   **Layout:** Use asymmetrical padding (e.g., `pt-12 pb-8 px-8`) to create an active, energetic internal flow.

### Chips: The "Toggle" State
*   **Style:** `surface_container_high` with `label-md` typography.
*   **Active State:** Transition to `tertiary_container` with a subtle `tertiary` ghost border.

### Input Fields: The "Recessed" Look
*   **Background:** `surface_container_highest` with a `2rem` (lg) corner radius.
*   **State:** When focused, use a `2px` "Ghost Border" of the `primary` token at 40% opacity.

### Navigation: The "Floating Track"
*   **Style:** A floating bar using the Glassmorphism rule. Centered at the bottom of the screen for "thumb-friendly" mobile-first biking utility.

## 6. Do’s and Don’ts

### Do:
*   **Do** overlap images of bikes/scooters over the edges of containers to create a sense of speed and breaking the "box."
*   **Do** use `display-lg` typography as a background element (low opacity) for a bold, streetwear-inspired look.
*   **Do** use large, generous white space (following our Spacing Scale) to separate sections instead of lines.

### Don’t:
*   **Don’t** use 90-degree angles. Everything must have at least a `sm` (0.5rem) radius for "safety."
*   **Don’t** use pure black `#000000`. Use `on_surface` (`#2d2f2c`) for a softer, more organic contrast.
*   **Don’t** center-align everything. Use left-aligned headlines with right-aligned body copy to create "Kinetic Asymmetry."
*   **Don't** use standard "corporate" icons. Use thick-stroke, rounded-end icons that match the weight of `spaceGrotesk`.
