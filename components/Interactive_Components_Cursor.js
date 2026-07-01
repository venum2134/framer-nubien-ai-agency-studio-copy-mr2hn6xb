// http-url:https://framerusercontent.com/modules/6tCdNB911C7z09oPjjLU/ByScKl7S1p6QCYFB6bqh/RMpAvj7R1.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getFontsFromSharedStyle, RichText, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "framer";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";

// http-url:https://framerusercontent.com/modules/Sei6LHtrKYroZDcZaxIO/VhTs1yj9qkpe1mUAbJe8/ZWufQQ1Qp.js
import { fontStore } from "framer";
fontStore.loadFonts(["GF;DM Sans-700", "GF;DM Sans-900", "GF;DM Sans-900italic", "GF;DM Sans-700italic"]);
var fonts = [{ explicitInter: true, fonts: [{ family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthS2f3ZGMZpg.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAC5thS2f3ZGMZpg.woff2", weight: "900" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8gCm32RmYJpso5.woff2", weight: "900" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm32RmYJpso5.woff2", weight: "700" }] }];
var css = ['.framer-wwGca .framer-styles-preset-1b18csx:not(.rich-text-wrapper), .framer-wwGca .framer-styles-preset-1b18csx.rich-text-wrapper p { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", sans-serif; --framer-font-family-bold-italic: "DM Sans", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 700; --framer-font-weight-bold: 900; --framer-font-weight-bold-italic: 900; --framer-font-weight-italic: 700; --framer-letter-spacing: -0.5px; --framer-line-height: 26px; --framer-paragraph-spacing: 20px; --framer-text-alignment: start; --framer-text-color: var(--token-561b3d91-c258-4609-94c9-3cc008fdd628, #131313); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className = "framer-wwGca";

// http-url:https://framerusercontent.com/modules/6tCdNB911C7z09oPjjLU/ByScKl7S1p6QCYFB6bqh/RMpAvj7R1.js
var enabledGestures = { VKeZmVTKZ: { pressed: true } };
var cycleOrder = ["VKeZmVTKZ", "wRJ1cSVYi", "GS1Al26zO"];
var serializationHash = "framer-xmgZV";
var variantClassNames = { GS1Al26zO: "framer-v-1zq07m", VKeZmVTKZ: "framer-v-1bfsdk6", wRJ1cSVYi: "framer-v-9ark45" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = { "Hover Team": "GS1Al26zO", Default: "VKeZmVTKZ", Hover: "wRJ1cSVYi" };
var getProps = ({ height, id, width, ...props }) => {
  return { ...props, variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "VKeZmVTKZ" };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const { activeLocale, setLocale } = useLocaleInfo();
  const { style, className: className2, layoutId, variant, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "VKeZmVTKZ", enabledGestures, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [className];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  const ref1 = React.useRef(null);
  const isDisplayed = () => {
    if (["wRJ1cSVYi", "GS1Al26zO"].includes(baseVariant)) return true;
    return false;
  };
  const defaultLayoutId = React.useId();
  const componentViewport = useComponentViewport();
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-1bfsdk6", className2, classNames), "data-framer-name": "Default", layoutDependency, layoutId: "VKeZmVTKZ", ref: ref ?? ref1, style: { backgroundColor: "var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, rgb(255, 255, 255))", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, boxShadow: "none", ...style }, variants: { "VKeZmVTKZ-pressed": { boxShadow: "none" }, GS1Al26zO: { borderBottomLeftRadius: 45, borderBottomRightRadius: 45, borderTopLeftRadius: 45, borderTopRightRadius: 45, boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.1)" }, wRJ1cSVYi: { borderBottomLeftRadius: 45, borderBottomRightRadius: 45, borderTopLeftRadius: 45, borderTopRightRadius: 45, boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.1)" } }, ...addPropertyOverrides({ "VKeZmVTKZ-pressed": { "data-framer-name": void 0 }, GS1Al26zO: { "data-framer-name": "Hover Team" }, wRJ1cSVYi: { "data-framer-name": "Hover" } }, baseVariant, gestureVariant), children: isDisplayed() && /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-1b18csx", "data-styles-preset": "ZWufQQ1Qp", children: "View Now" }) }), className: "framer-1jyvwp6", "data-framer-name": "Text", fonts: ["Inter"], layoutDependency, layoutId: "TzUGBYJHu", style: { "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, verticalAlignment: "top", withExternalLayout: true, ...addPropertyOverrides({ GS1Al26zO: { children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-1b18csx", "data-styles-preset": "ZWufQQ1Qp", children: "Open LinkedIn" }) }) } }, baseVariant, gestureVariant) }) }) }) }) });
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-xmgZV.framer-1kzwjlp, .framer-xmgZV .framer-1kzwjlp { display: block; }", ".framer-xmgZV.framer-1bfsdk6 { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; min-height: 14px; min-width: 14px; overflow: hidden; padding: 0px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-xmgZV .framer-1jyvwp6 { flex: none; height: auto; position: relative; white-space: pre; width: auto; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-xmgZV.framer-1bfsdk6 { gap: 0px; } .framer-xmgZV.framer-1bfsdk6 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-xmgZV.framer-1bfsdk6 > :first-child { margin-left: 0px; } .framer-xmgZV.framer-1bfsdk6 > :last-child { margin-right: 0px; } }", ".framer-xmgZV.framer-v-9ark45.framer-1bfsdk6, .framer-xmgZV.framer-v-1zq07m.framer-1bfsdk6 { cursor: unset; min-height: unset; min-width: unset; padding: 5px 15px 5px 15px; }", ".framer-xmgZV.framer-v-1bfsdk6.pressed.framer-1bfsdk6 { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 10px); min-height: unset; min-width: unset; width: 10px; }", ...css];
var FramerRMpAvj7R1 = withCSS(Component, css2, "framer-xmgZV");
var RMpAvj7R1_default = FramerRMpAvj7R1;
FramerRMpAvj7R1.displayName = "Interactive Components/Cursor";
FramerRMpAvj7R1.defaultProps = { height: 14, width: 14 };
addPropertyControls(FramerRMpAvj7R1, { variant: { options: ["VKeZmVTKZ", "wRJ1cSVYi", "GS1Al26zO"], optionTitles: ["Default", "Hover", "Hover Team"], title: "Variant", type: ControlType.Enum } });
addFonts(FramerRMpAvj7R1, [{ explicitInter: true, fonts: [{ family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...getFontsFromSharedStyle(fonts)], { supportsExplicitInterCodegen: true });
export {
  RMpAvj7R1_default as default
};
