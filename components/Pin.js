// http-url:https://framerusercontent.com/modules/c3qMqEatlZdxEAEzlTS9/4qqvKeDTnFTUQs2VSVQj/rJPMK1wia.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getFontsFromSharedStyle, RichText, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "framer";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";
import { useRef } from "react";

// http-url:https://framerusercontent.com/modules/1nbUGgbws2vWsNnPufSy/UTJoCeu5ph7PorGXSV8g/VqRaec8fA.js
import { fontStore } from "framer";
fontStore.loadFonts(["GF;DM Sans-500", "GF;DM Sans-700", "GF;DM Sans-700italic", "GF;DM Sans-500italic"]);
var fonts = [{ explicitInter: true, fonts: [{ family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhS2f3ZGMZpg.woff2", weight: "500" }, { family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthS2f3ZGMZpg.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm32RmYJpso5.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-7DW32RmYJpso5.woff2", weight: "500" }] }];
var css = ['.framer-u628B .framer-styles-preset-2mfvz6:not(.rich-text-wrapper), .framer-u628B .framer-styles-preset-2mfvz6.rich-text-wrapper p { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 500; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 500; --framer-letter-spacing: -0.5px; --framer-line-height: 26px; --framer-paragraph-spacing: 0px; --framer-text-alignment: start; --framer-text-color: var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className = "framer-u628B";

// http-url:https://framerusercontent.com/modules/c3qMqEatlZdxEAEzlTS9/4qqvKeDTnFTUQs2VSVQj/rJPMK1wia.js
var serializationHash = "framer-Pi4Tf";
var variantClassNames = { bE5o15lpBWNEulL9fn: "framer-v-13r6p43" };
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var getProps = ({ background, height, id, title, width, ...props }) => {
  return { ...props, eLJBf2lXN: title ?? props.eLJBf2lXN ?? "Problem Solved", ttssQUkSZ: background ?? props.ttssQUkSZ ?? "var(--token-f951c3a8-aa43-4825-aa75-915aa92c20d1, rgb(79, 26, 214))" };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const fallbackRef = useRef(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const { style, className: className2, layoutId, variant, eLJBf2lXN, ttssQUkSZ, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ defaultVariant: "bE5o15lpBWNEulL9fn", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [className];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsxs(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-13r6p43", className2, classNames), "data-framer-name": "Primary", draggable: "false", layoutDependency, layoutId: "bE5o15lpBWNEulL9fn", ref: refBinding, style: { backgroundColor: ttssQUkSZ, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, ...style }, children: [/* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-2mfvz6", "data-styles-preset": "VqRaec8fA", children: "Problem Solved" }) }), className: "framer-1dohs3y", "data-framer-name": "Text", fonts: ["Inter"], layoutDependency, layoutId: "bE5o15lpBJUe7GOhGh", style: { "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: eLJBf2lXN, verticalAlignment: "top", withExternalLayout: true }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-zdhecl", "data-framer-name": "Diamond", layoutDependency, layoutId: "bE5o15lpBrgwSSotHq", style: { backgroundColor: ttssQUkSZ, rotate: -45 } })] }) }) }) });
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-Pi4Tf.framer-11alzfi, .framer-Pi4Tf .framer-11alzfi { display: block; }", ".framer-Pi4Tf.framer-13r6p43 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 6px 10px 6px 10px; position: relative; width: min-content; }", ".framer-Pi4Tf .framer-1dohs3y { flex: none; height: auto; position: relative; white-space: pre; width: auto; }", ".framer-Pi4Tf .framer-zdhecl { bottom: -5px; flex: none; height: 10px; left: 23px; overflow: hidden; position: absolute; width: 10px; z-index: 1; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-Pi4Tf.framer-13r6p43 { gap: 0px; } .framer-Pi4Tf.framer-13r6p43 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-Pi4Tf.framer-13r6p43 > :first-child { margin-left: 0px; } .framer-Pi4Tf.framer-13r6p43 > :last-child { margin-right: 0px; } }", ...css];
var FramerrJPMK1wia = withCSS(Component, css2, "framer-Pi4Tf");
var rJPMK1wia_default = FramerrJPMK1wia;
FramerrJPMK1wia.displayName = "Pin";
FramerrJPMK1wia.defaultProps = { height: 38, width: 130 };
addPropertyControls(FramerrJPMK1wia, { eLJBf2lXN: { defaultValue: "Problem Solved", displayTextArea: true, title: "Title", type: ControlType.String }, ttssQUkSZ: { defaultValue: 'var(--token-f951c3a8-aa43-4825-aa75-915aa92c20d1, rgb(79, 26, 214)) /* {"name":"Purple"} */', title: "Background", type: ControlType.Color } });
addFonts(FramerrJPMK1wia, [{ explicitInter: true, fonts: [{ family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...getFontsFromSharedStyle(fonts)], { supportsExplicitInterCodegen: true });
export {
  rJPMK1wia_default as default
};
