"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Reveal = { direction: string; delay: number; animation?: Animation; visible: boolean };

/** Animate existing elements while preserving layout and native scrolling. */
export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = new Map<HTMLElement, Reveal>();
    const photographs = new Set<HTMLElement>();
    const visiblePhotographs = new Set<HTMLElement>();
    let frame = 0;

    const reveal = (element: HTMLElement, state: Reveal) => {
      if (state.visible) return;
      state.visible = true;
      element.removeAttribute("data-reveal-pending");
      if (preference.matches || !element.animate) return;
      const mobile = window.innerWidth < 768;
      const distance = mobile ? 24 : 40;
      const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
      const x = state.direction === "left" ? -distance * rtl : state.direction === "right" ? distance * rtl : 0;
      const animation = element.animate([
        { opacity: 0, transform: `translate3d(${x}px, ${x ? 12 : distance}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ], {
        duration: mobile ? 750 : 1000,
        delay: state.delay,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      });
      state.animation = animation;
      animation.onfinish = () => {
        animation.cancel(); // Release transforms for existing hover interactions.
        state.animation = undefined;
      };
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const state = elements.get(element);
        if (!state) continue;
        if (entry.isIntersecting) reveal(element, state);
        else if (entry.boundingClientRect.top > window.innerHeight * 0.8 && !preference.matches) {
          // Re-arm below the viewport so a return visit replays the entrance.
          state.animation?.cancel();
          state.animation = undefined;
          state.visible = false;
          element.setAttribute("data-reveal-pending", "");
        }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

    const updatePhotographs = () => {
      frame = 0;
      if (preference.matches) return;
      // Batch geometry reads before writes to avoid layout thrashing.
      const updates = Array.from(visiblePhotographs).filter((element) => !element.closest("[inert]")).map((element) => {
        const rect = element.parentElement!.getBoundingClientRect();
        const progress = (window.innerHeight / 2 - rect.top - rect.height / 2) / ((window.innerHeight + rect.height) / 2);
        const travel = Math.min(window.innerWidth < 768 ? 14 : 28, rect.height * 0.035);
        return { element, offset: Math.max(-1, Math.min(1, progress)) * travel };
      });
      updates.forEach(({ element, offset }) => element.style.setProperty("--scroll-offset", `${offset.toFixed(2)}px`));
    };
    const schedulePhotographs = () => {
      if (!frame && !preference.matches) frame = requestAnimationFrame(updatePhotographs);
    };
    const photoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) visiblePhotographs.add(element);
        else visiblePhotographs.delete(element);
      });
      schedulePhotographs();
    });

    const register = (element: HTMLElement, direction: string, delay = 0) => {
      if (elements.has(element)) return;
      const visible = preference.matches || element.getBoundingClientRect().top < window.innerHeight * 0.2;
      elements.set(element, { direction, delay, visible });
      if (!visible) element.setAttribute("data-reveal-pending", "");
      observer.observe(element);
    };
    const refresh = () => {
      elements.forEach((state, element) => {
        if (!element.isConnected) {
          state.animation?.cancel();
          observer.unobserve(element);
          elements.delete(element);
        }
      });
      document.querySelectorAll<HTMLElement>("main [data-reveal]").forEach((element) => register(element, element.dataset.reveal || "up"));
      document.querySelectorAll<HTMLElement>("main [data-reveal-group]").forEach((group) => {
        Array.from(group.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return;
          const direction = group.dataset.revealGroup === "split" ? (index % 2 ? "right" : "left") : "up";
          register(child, direction, Math.min(index, 4) * (window.innerWidth < 768 ? 70 : 110));
        });
      });
      document.querySelectorAll<HTMLElement>("main [data-parallax]").forEach((element) => {
        if (photographs.has(element)) return;
        photographs.add(element);
        photoObserver.observe(element);
      });
      photographs.forEach((element) => {
        if (!element.isConnected) {
          photoObserver.unobserve(element);
          photographs.delete(element);
          visiblePhotographs.delete(element);
        }
      });
    };
    const showAll = () => {
      elements.forEach((state, element) => {
        state.animation?.cancel();
        state.animation = undefined;
        state.visible = true;
        element.removeAttribute("data-reveal-pending");
      });
      photographs.forEach((element) => element.style.removeProperty("--scroll-offset"));
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const showFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-reveal-pending]");
      if (element) {
        element.removeAttribute("data-reveal-pending");
        const state = elements.get(element);
        if (state) state.visible = true;
      }
    };

    refresh();
    // Include database-loaded cards and streamed route content after initial mount.
    const mutations = new MutationObserver(refresh);
    const main = document.querySelector("main");
    mutations.observe(main || document.body, { childList: true, subtree: true });
    preference.addEventListener("change", showAll);
    document.addEventListener("focusin", showFocused);
    window.addEventListener("scroll", schedulePhotographs, { passive: true });
    window.addEventListener("resize", schedulePhotographs);
    return () => {
      mutations.disconnect();
      observer.disconnect();
      photoObserver.disconnect();
      showAll();
      preference.removeEventListener("change", showAll);
      document.removeEventListener("focusin", showFocused);
      window.removeEventListener("scroll", schedulePhotographs);
      window.removeEventListener("resize", schedulePhotographs);
    };
  }, [pathname]);

  return null;
}

