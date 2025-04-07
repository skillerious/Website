# Environmental Impact

At **Markiva**, we recognize that every digital product—no matter how small—plays a role in the broader environmental landscape. While Markiva is a lightweight Markdown editor, we believe in transparency and sustainability wherever possible.

---

## 1. Energy Usage

Markiva is built using **Electron**, which allows for cross-platform support but also comes with a larger energy footprint compared to native apps. Here's how we address that:

- **Optimized Performance**: We reduce CPU usage through performance tuning, debouncing UI updates, and efficient rendering.
- **Minimal Background Activity**: Markiva does not run unnecessary background processes or telemetry, which saves energy when idle.

---

## 2. Data Storage & Privacy

Markiva stores user data **locally**, not on cloud servers. This has two key benefits:

- **Reduced Cloud Load**: Fewer server resources are used, leading to reduced emissions from data center operations.
- **User Control**: You control your own files, which minimizes external dependencies and transmission costs.

---

## 3. No Network Dependency

- Markiva works **fully offline** after installation.
- All features, including file editing, preview rendering, and notes, operate without a continuous internet connection.
- This reduces data transfer over the network, thereby decreasing energy consumption and bandwidth use.

---

## 4. Sustainable Practices for Developers

If you're contributing to or forking Markiva, here are a few tips to keep your development eco-friendly:

- Avoid adding large dependencies unnecessarily.
- Reuse code and libraries rather than reinventing them.
- Use `npm audit` and similar tools to clean up and optimize dependencies.

---

## 5. Electron & Environmental Tradeoffs

While Electron apps use more memory and CPU than native apps, they:

- Enable faster cross-platform development, which reduces redundant builds.
- Encourage reuse of JavaScript libraries and tools, minimizing duplicated effort across ecosystems.

We acknowledge the trade-offs and aim to make Markiva as efficient as possible within those constraints.

---

## 6. Future Goals

We're exploring future steps to further reduce our impact:

- **Optional Low-Energy Mode**: A mode that reduces animations and re-rendering.
- **Sustainable Themes**: High-contrast themes that require less energy on OLED displays.
- **Community Feedback**: We welcome ideas from users and contributors on how we can improve sustainability.

---

## 7. Final Thoughts

Every small action counts. Even as a Markdown editor, Markiva strives to be mindful of its environmental footprint. By running locally, reducing dependencies, and avoiding wasteful data usage, we believe Markiva can serve as a responsible part of your digital toolkit.

Together, we can code a cleaner future.