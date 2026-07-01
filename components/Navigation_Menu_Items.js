// http-url:https://framerusercontent.com/modules/re1x09zDc1myffUWWdLH/TRJu61L3LbzK7W2uJjr2/iGBwQs2yO.js
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts as addFonts2, addPropertyControls as addPropertyControls2, ComponentViewportProvider, ControlType as ControlType2, cx as cx2, getFonts, ResolveLinks, SmartComponentScopedContainer, useActiveVariantCallback as useActiveVariantCallback2, useComponentViewport as useComponentViewport2, useLocaleInfo as useLocaleInfo2, useRouter, useVariantState as useVariantState2, withCSS as withCSS2 } from "framer";
import { LayoutGroup as LayoutGroup2, motion as motion2, MotionConfigContext as MotionConfigContext2 } from "framer-motion";
import * as React2 from "react";
import { useRef as useRef2 } from "react";

// http-url:https://framerusercontent.com/modules/yBF8wwdWSG1irx2MCplD/HZCpPRlTQ9yPnE5kxlg0/Q0U3CYn_a.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getFontsFromSharedStyle, Link, RichText, useActiveVariantCallback, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "framer";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";

// http-url:https://framerusercontent.com/modules/5HinDbt6GytvLDdPKAwt/JSaoxQhNDMwjBe2Tp8Vz/QhK6qqT5U.js
import { fontStore } from "framer";
fontStore.loadFonts(["GF;DM Sans-regular", "GF;DM Sans-700", "GF;DM Sans-700italic", "GF;DM Sans-italic"]);
var fonts = [{ explicitInter: true, fonts: [{ family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhS2f3ZGMZpg.woff2", weight: "400" }, { family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthS2f3ZGMZpg.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm32RmYJpso5.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW32RmYJpso5.woff2", weight: "400" }] }];
var css = ['.framer-CjDlz .framer-styles-preset-x0s9r5:not(.rich-text-wrapper), .framer-CjDlz .framer-styles-preset-x0s9r5.rich-text-wrapper p { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 400; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 400; --framer-letter-spacing: -0.2px; --framer-line-height: 26px; --framer-paragraph-spacing: 16px; --framer-text-alignment: start; --framer-text-color: var(--token-8f8054d9-8a09-4e7e-b957-8a76557c5e75, rgba(255, 255, 255, 0.6)); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className = "framer-CjDlz";

// http-url:https://framerusercontent.com/modules/yBF8wwdWSG1irx2MCplD/HZCpPRlTQ9yPnE5kxlg0/Q0U3CYn_a.js
var enabledGestures = { vbxf8HL8_: { hover: true } };
var cycleOrder = ["vbxf8HL8_", "dckrgQoZs"];
var serializationHash = "framer-GPjkJ";
var variantClassNames = { dckrgQoZs: "framer-v-11z3ns5", vbxf8HL8_: "framer-v-a47mct" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { damping: 60, delay: 0, mass: 1, stiffness: 400, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = { "In-Active": "vbxf8HL8_", Active: "dckrgQoZs" };
var getProps = ({ click, height, id, link, newTab, smoothScroll, title, width, ...props }) => {
  return { ...props, aLnDlFZKR: link ?? props.aLnDlFZKR, Cn6fz_Vow: title ?? props.Cn6fz_Vow ?? "Home", gBAcWz1fh: click ?? props.gBAcWz1fh, TqaTpTiSx: newTab ?? props.TqaTpTiSx, variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "vbxf8HL8_", X2yrtSssb: smoothScroll ?? props.X2yrtSssb };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const { activeLocale, setLocale } = useLocaleInfo();
  const { style, className: className2, layoutId, variant, Cn6fz_Vow, aLnDlFZKR, TqaTpTiSx, X2yrtSssb, gBAcWz1fh, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "vbxf8HL8_", enabledGestures, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);
  const onTapvxfeb4 = activeVariantCallback(async (...args) => {
    setGestureState({ isPressed: false });
    if (gBAcWz1fh) {
      const res = await gBAcWz1fh(...args);
      if (res === false) return false;
    }
  });
  const sharedStyleClassNames = [className];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  const ref1 = React.useRef(null);
  const defaultLayoutId = React.useId();
  const componentViewport = useComponentViewport();
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(Link, { href: aLnDlFZKR, motionChild: true, nodeId: "vbxf8HL8_", openInNewTab: TqaTpTiSx, smoothScroll: X2yrtSssb, children: /* @__PURE__ */ _jsx(motion.a, { ...restProps, ...gestureHandlers, className: `${cx(scopingClassNames, "framer-a47mct", className2, classNames)} framer-i9k05o`, "data-framer-name": "In-Active", "data-highlight": true, layoutDependency, layoutId: "vbxf8HL8_", onTap: onTapvxfeb4, ref: ref ?? ref1, style: { ...style }, ...addPropertyOverrides({ "vbxf8HL8_-hover": { "data-framer-name": void 0 }, dckrgQoZs: { "data-framer-name": "Active" } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-x0s9r5", "data-styles-preset": "QhK6qqT5U", style: { "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))" }, children: /* @__PURE__ */ _jsx(motion.span, { "data-text-fill": "true", style: { backgroundImage: "linear-gradient(90deg, var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, rgb(255, 255, 255)) 0%, var(--token-69ff14d1-f0d2-4345-baec-a0ff0f57f0ca, rgba(153, 153, 153, 0)) 409.99999999999994%)" }, children: "Home" }) }) }), className: "framer-oap6fz", fonts: ["Inter"], layoutDependency, layoutId: "uuXIr8Qtv", style: { "--extracted-r6o4lv": "rgb(255, 255, 255)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", opacity: 0.6 }, text: Cn6fz_Vow, variants: { "vbxf8HL8_-hover": { opacity: 1 }, dckrgQoZs: { opacity: 1 } }, verticalAlignment: "top", withExternalLayout: true }) }) }) }) }) });
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-GPjkJ.framer-i9k05o, .framer-GPjkJ .framer-i9k05o { display: block; }", ".framer-GPjkJ.framer-a47mct { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; text-decoration: none; width: min-content; }", ".framer-GPjkJ .framer-oap6fz { flex: none; height: auto; position: relative; white-space: pre; width: auto; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-GPjkJ.framer-a47mct { gap: 0px; } .framer-GPjkJ.framer-a47mct > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-GPjkJ.framer-a47mct > :first-child { margin-left: 0px; } .framer-GPjkJ.framer-a47mct > :last-child { margin-right: 0px; } }", ...css];
var FramerQ0U3CYn_a = withCSS(Component, css2, "framer-GPjkJ");
var Q0U3CYn_a_default = FramerQ0U3CYn_a;
FramerQ0U3CYn_a.displayName = "Navigation/Text Hover";
FramerQ0U3CYn_a.defaultProps = { height: 26, width: 43 };
addPropertyControls(FramerQ0U3CYn_a, { variant: { options: ["vbxf8HL8_", "dckrgQoZs"], optionTitles: ["In-Active", "Active"], title: "Variant", type: ControlType.Enum }, Cn6fz_Vow: { defaultValue: "Home", displayTextArea: false, title: "Title", type: ControlType.String }, aLnDlFZKR: { title: "Link", type: ControlType.Link }, TqaTpTiSx: { defaultValue: false, title: "New Tab", type: ControlType.Boolean }, X2yrtSssb: { defaultValue: false, title: "Smooth Scroll", type: ControlType.Boolean }, gBAcWz1fh: { title: "Click", type: ControlType.EventHandler } });
addFonts(FramerQ0U3CYn_a, [{ explicitInter: true, fonts: [{ family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...getFontsFromSharedStyle(fonts)], { supportsExplicitInterCodegen: true });

// http-url:https://framerusercontent.com/modules/re1x09zDc1myffUWWdLH/TRJu61L3LbzK7W2uJjr2/iGBwQs2yO.js
var NavigationTextHoverFonts = getFonts(Q0U3CYn_a_default);
var cycleOrder2 = ["I3GaZxydO", "zzSGFktzP", "FJ1T56A5y", "jyprgoSzZ", "ZslCevpJO", "cSJJhEAR6"];
var serializationHash2 = "framer-ekLVh";
var variantClassNames2 = { cSJJhEAR6: "framer-v-1cbuxkv", FJ1T56A5y: "framer-v-daaajd", I3GaZxydO: "framer-v-eim0kk", jyprgoSzZ: "framer-v-13sv9dx", ZslCevpJO: "framer-v-rz50sq", zzSGFktzP: "framer-v-klupt0" };
function addPropertyOverrides2(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var numberToPixelString = (value) => {
  if (typeof value !== "number") return value;
  if (!Number.isFinite(value)) return void 0;
  return Math.max(0, value) + "px";
};
var transition12 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition2 = ({ value, children }) => {
  const config = React2.useContext(MotionConfigContext2);
  const transition = value ?? config.transition;
  const contextValue = React2.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx2(MotionConfigContext2.Provider, { value: contextValue, children });
};
var Variants2 = motion2.create(React2.Fragment);
var humanReadableEnumMap = { Horizontal: "row", Vertical: "column" };
var humanReadableVariantMap2 = { "About Active": "zzSGFktzP", "All Not Active": "ZslCevpJO", "Contact Active": "jyprgoSzZ", "Home Active": "I3GaZxydO", "Mobile Active": "cSJJhEAR6", "Portfolio Active": "FJ1T56A5y" };
var getProps2 = ({ click, direction, fAQLink, gap, height, id, width, ...props }) => {
  return { ...props, AkGmmecg9: fAQLink ?? props.AkGmmecg9, Cror1qETX: humanReadableEnumMap[direction] ?? direction ?? props.Cror1qETX ?? "row", enY1ir1No: click ?? props.enY1ir1No, UYX2736iE: gap ?? props.UYX2736iE ?? 40, variant: humanReadableVariantMap2[props.variant] ?? props.variant ?? "I3GaZxydO" };
};
var createLayoutDependency2 = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component2 = /* @__PURE__ */ React2.forwardRef(function(props, ref) {
  const fallbackRef = useRef2(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React2.useId();
  const { activeLocale, setLocale } = useLocaleInfo2();
  const componentViewport = useComponentViewport2();
  const { style, className: className2, layoutId, variant, AkGmmecg9, Cror1qETX, UYX2736iE, enY1ir1No, ...restProps } = getProps2(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState2({ cycleOrder: cycleOrder2, defaultVariant: "I3GaZxydO", ref: refBinding, variant, variantClassNames: variantClassNames2 });
  const layoutDependency = createLayoutDependency2(props, variants);
  const { activeVariantCallback, delay } = useActiveVariantCallback2(baseVariant);
  const onTapd2ys3d = activeVariantCallback(async (...args) => {
    setGestureState({ isPressed: false });
    if (enY1ir1No) {
      const res = await enY1ir1No(...args);
      if (res === false) return false;
    }
  });
  const sharedStyleClassNames = [];
  const scopingClassNames = cx2(serializationHash2, ...sharedStyleClassNames);
  const router = useRouter();
  const isDisplayed = () => {
    if (baseVariant === "cSJJhEAR6") return false;
    return true;
  };
  return /* @__PURE__ */ _jsx2(LayoutGroup2, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx2(Variants2, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx2(Transition2, { value: transition12, children: /* @__PURE__ */ _jsxs(motion2.div, { ...restProps, ...gestureHandlers, className: cx2(scopingClassNames, "framer-eim0kk", className2, classNames), "data-framer-name": "Home Active", "data-highlight": true, layoutDependency, layoutId: "I3GaZxydO", onTap: onTapd2ys3d, ref: refBinding, style: { "--1q37rq3": Cror1qETX, "--1ysjk0m": numberToPixelString(UYX2736iE), ...style }, ...addPropertyOverrides2({ cSJJhEAR6: { "data-framer-name": "Mobile Active" }, FJ1T56A5y: { "data-framer-name": "Portfolio Active" }, jyprgoSzZ: { "data-framer-name": "Contact Active" }, ZslCevpJO: { "data-framer-name": "All Not Active" }, zzSGFktzP: { "data-framer-name": "About Active" } }, baseVariant, gestureVariant), children: [/* @__PURE__ */ _jsx2(ResolveLinks, { links: [{ href: { webPageId: "augiA20Il" }, implicitPathVariables: void 0 }, { href: { webPageId: "augiA20Il" }, implicitPathVariables: void 0 }, { href: { webPageId: "augiA20Il" }, implicitPathVariables: void 0 }, { href: { webPageId: "augiA20Il" }, implicitPathVariables: void 0 }, { href: { webPageId: "augiA20Il" }, implicitPathVariables: void 0 }, { href: { webPageId: "augiA20Il" }, implicitPathVariables: void 0 }], children: (resolvedLinks) => /* @__PURE__ */ _jsx2(ComponentViewportProvider, { height: 26, ...addPropertyOverrides2({ cSJJhEAR6: { y: (componentViewport?.y || 0) + 0 + 0 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer, { className: "framer-1h7khqo-container", layoutDependency, layoutId: "GaAooFYz9-container", nodeId: "GaAooFYz9", rendersWithMotion: true, scopeId: "iGBwQs2yO", children: /* @__PURE__ */ _jsx2(Q0U3CYn_a_default, { aLnDlFZKR: resolvedLinks[0], Cn6fz_Vow: "Home", height: "100%", id: "GaAooFYz9", layoutId: "GaAooFYz9", TqaTpTiSx: false, variant: "dckrgQoZs", width: "100%", X2yrtSssb: false, ...addPropertyOverrides2({ cSJJhEAR6: { aLnDlFZKR: resolvedLinks[5] }, FJ1T56A5y: { aLnDlFZKR: resolvedLinks[2], variant: "vbxf8HL8_" }, jyprgoSzZ: { aLnDlFZKR: resolvedLinks[3], variant: "vbxf8HL8_" }, ZslCevpJO: { aLnDlFZKR: resolvedLinks[4], variant: "vbxf8HL8_" }, zzSGFktzP: { aLnDlFZKR: resolvedLinks[1], variant: "vbxf8HL8_" } }, baseVariant, gestureVariant) }) }) }) }), /* @__PURE__ */ _jsx2(ResolveLinks, { links: [{ href: { webPageId: "hetOMwTYW" }, implicitPathVariables: void 0 }, { href: { webPageId: "hetOMwTYW" }, implicitPathVariables: void 0 }, { href: { webPageId: "hetOMwTYW" }, implicitPathVariables: void 0 }, { href: { webPageId: "hetOMwTYW" }, implicitPathVariables: void 0 }, { href: { webPageId: "hetOMwTYW" }, implicitPathVariables: void 0 }, { href: { webPageId: "hetOMwTYW" }, implicitPathVariables: void 0 }], children: (resolvedLinks1) => /* @__PURE__ */ _jsx2(ComponentViewportProvider, { height: 26, ...addPropertyOverrides2({ cSJJhEAR6: { y: (componentViewport?.y || 0) + 0 + 41 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer, { className: "framer-1chkher-container", layoutDependency, layoutId: "gCcf0GlGX-container", nodeId: "gCcf0GlGX", rendersWithMotion: true, scopeId: "iGBwQs2yO", children: /* @__PURE__ */ _jsx2(Q0U3CYn_a_default, { aLnDlFZKR: resolvedLinks1[0], Cn6fz_Vow: "About", height: "100%", id: "gCcf0GlGX", layoutId: "gCcf0GlGX", TqaTpTiSx: false, variant: "vbxf8HL8_", width: "100%", X2yrtSssb: false, ...addPropertyOverrides2({ cSJJhEAR6: { aLnDlFZKR: resolvedLinks1[5], variant: "dckrgQoZs" }, FJ1T56A5y: { aLnDlFZKR: resolvedLinks1[2] }, jyprgoSzZ: { aLnDlFZKR: resolvedLinks1[3] }, ZslCevpJO: { aLnDlFZKR: resolvedLinks1[4] }, zzSGFktzP: { aLnDlFZKR: resolvedLinks1[1], variant: "dckrgQoZs" } }, baseVariant, gestureVariant) }) }) }) }), /* @__PURE__ */ _jsx2(ResolveLinks, { links: [{ href: { webPageId: "ADJCSktRp" }, implicitPathVariables: void 0 }, { href: { webPageId: "ADJCSktRp" }, implicitPathVariables: void 0 }, { href: { webPageId: "ADJCSktRp" }, implicitPathVariables: void 0 }, { href: { webPageId: "ADJCSktRp" }, implicitPathVariables: void 0 }, { href: { webPageId: "ADJCSktRp" }, implicitPathVariables: void 0 }, { href: { webPageId: "ADJCSktRp" }, implicitPathVariables: void 0 }], children: (resolvedLinks2) => /* @__PURE__ */ _jsx2(ComponentViewportProvider, { height: 26, ...addPropertyOverrides2({ cSJJhEAR6: { y: (componentViewport?.y || 0) + 0 + 82 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer, { className: "framer-1nxucr6-container", layoutDependency, layoutId: "bta0XeZyH-container", nodeId: "bta0XeZyH", rendersWithMotion: true, scopeId: "iGBwQs2yO", children: /* @__PURE__ */ _jsx2(Q0U3CYn_a_default, { aLnDlFZKR: resolvedLinks2[0], Cn6fz_Vow: "Portfolio", height: "100%", id: "bta0XeZyH", layoutId: "bta0XeZyH", TqaTpTiSx: false, variant: "vbxf8HL8_", width: "100%", X2yrtSssb: false, ...addPropertyOverrides2({ cSJJhEAR6: { aLnDlFZKR: resolvedLinks2[5], variant: "dckrgQoZs" }, FJ1T56A5y: { aLnDlFZKR: resolvedLinks2[2], variant: "dckrgQoZs" }, jyprgoSzZ: { aLnDlFZKR: resolvedLinks2[3] }, ZslCevpJO: { aLnDlFZKR: resolvedLinks2[4] }, zzSGFktzP: { aLnDlFZKR: resolvedLinks2[1] } }, baseVariant, gestureVariant) }) }) }) }), /* @__PURE__ */ _jsx2(ResolveLinks, { links: [{ href: { webPageId: "iEYhqIzLi" }, implicitPathVariables: void 0 }, { href: { webPageId: "iEYhqIzLi" }, implicitPathVariables: void 0 }, { href: { webPageId: "iEYhqIzLi" }, implicitPathVariables: void 0 }, { href: { webPageId: "iEYhqIzLi" }, implicitPathVariables: void 0 }, { href: { webPageId: "iEYhqIzLi" }, implicitPathVariables: void 0 }, { href: { webPageId: "iEYhqIzLi" }, implicitPathVariables: void 0 }], children: (resolvedLinks3) => /* @__PURE__ */ _jsx2(ComponentViewportProvider, { height: 26, ...addPropertyOverrides2({ cSJJhEAR6: { y: (componentViewport?.y || 0) + 0 + 123 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer, { className: "framer-mya0nq-container", layoutDependency, layoutId: "Shk01PUoH-container", nodeId: "Shk01PUoH", rendersWithMotion: true, scopeId: "iGBwQs2yO", children: /* @__PURE__ */ _jsx2(Q0U3CYn_a_default, { aLnDlFZKR: resolvedLinks3[0], Cn6fz_Vow: "Contact", height: "100%", id: "Shk01PUoH", layoutId: "Shk01PUoH", TqaTpTiSx: false, variant: "vbxf8HL8_", width: "100%", X2yrtSssb: false, ...addPropertyOverrides2({ cSJJhEAR6: { aLnDlFZKR: resolvedLinks3[5], variant: "dckrgQoZs" }, FJ1T56A5y: { aLnDlFZKR: resolvedLinks3[2] }, jyprgoSzZ: { aLnDlFZKR: resolvedLinks3[3], variant: "dckrgQoZs" }, ZslCevpJO: { aLnDlFZKR: resolvedLinks3[4] }, zzSGFktzP: { aLnDlFZKR: resolvedLinks3[1] } }, baseVariant, gestureVariant) }) }) }) }), isDisplayed() && /* @__PURE__ */ _jsx2(ComponentViewportProvider, { height: 26, children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer, { className: "framer-zlbux7-container", layoutDependency, layoutId: "K0UK__rQx-container", nodeId: "K0UK__rQx", rendersWithMotion: true, scopeId: "iGBwQs2yO", children: /* @__PURE__ */ _jsx2(Q0U3CYn_a_default, { aLnDlFZKR: AkGmmecg9, Cn6fz_Vow: "FAQ", height: "100%", id: "K0UK__rQx", layoutId: "K0UK__rQx", TqaTpTiSx: false, variant: "vbxf8HL8_", width: "100%", X2yrtSssb: true }) }) })] }) }) }) });
});
var css3 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-ekLVh.framer-1kc41ol, .framer-ekLVh .framer-1kc41ol { display: block; }", ".framer-ekLVh.framer-eim0kk { align-content: flex-start; align-items: flex-start; cursor: pointer; display: flex; flex-direction: var(--1q37rq3); flex-wrap: nowrap; gap: var(--1ysjk0m); height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px; position: relative; width: min-content; }", ".framer-ekLVh .framer-1h7khqo-container, .framer-ekLVh .framer-1chkher-container, .framer-ekLVh .framer-1nxucr6-container, .framer-ekLVh .framer-mya0nq-container, .framer-ekLVh .framer-zlbux7-container { flex: none; height: auto; position: relative; width: auto; }", ".framer-ekLVh.framer-v-1cbuxkv.framer-eim0kk { flex-direction: column; gap: 15px; }"];
var FrameriGBwQs2yO = withCSS2(Component2, css3, "framer-ekLVh");
var iGBwQs2yO_default = FrameriGBwQs2yO;
FrameriGBwQs2yO.displayName = "Navigation/Menu Items";
FrameriGBwQs2yO.defaultProps = { height: 26, width: 396 };
addPropertyControls2(FrameriGBwQs2yO, { variant: { options: ["I3GaZxydO", "zzSGFktzP", "FJ1T56A5y", "jyprgoSzZ", "ZslCevpJO", "cSJJhEAR6"], optionTitles: ["Home Active", "About Active", "Portfolio Active", "Contact Active", "All Not Active", "Mobile Active"], title: "Variant", type: ControlType2.Enum }, AkGmmecg9: { title: "FAQ Link", type: ControlType2.Link }, Cror1qETX: { defaultValue: "row", displaySegmentedControl: true, optionIcons: ["direction-horizontal", "direction-vertical"], options: ["row", "column"], optionTitles: ["Horizontal", "Vertical"], title: "Direction", type: ControlType2.Enum }, UYX2736iE: { defaultValue: 40, min: 0, title: "Gap", type: ControlType2.Number }, enY1ir1No: { title: "Click", type: ControlType2.EventHandler } });
addFonts2(FrameriGBwQs2yO, [{ explicitInter: true, fonts: [] }, ...NavigationTextHoverFonts], { supportsExplicitInterCodegen: true });
export {
  iGBwQs2yO_default as default
};
