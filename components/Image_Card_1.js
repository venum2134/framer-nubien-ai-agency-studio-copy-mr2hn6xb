// http-url:https://framerusercontent.com/modules/0bKPJ93QOUcpiv7ktgQu/iu7ZvCXtGG6gCdXk3IMd/gmGLzC77F.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getLoadingLazyAtYPosition, Image, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "framer";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";
import { useRef } from "react";
var serializationHash = "framer-CW9kX";
var variantClassNames = { bvo87k4Jy: "framer-v-1fw9rnf" };
var transition1 = { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" };
var toResponsiveImage = (value) => {
  if (typeof value === "object" && value !== null && typeof value.src === "string") {
    return value;
  }
  return typeof value === "string" ? { src: value } : void 0;
};
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var getProps = ({ height, id, image, width, ...props }) => {
  return { ...props, g8inBlkLf: image ?? props.g8inBlkLf ?? { pixelHeight: 1024, pixelWidth: 683, src: "https://framerusercontent.com/images/d13zFBAtzvooNSTOwOohK4Fqjk.png?scale-down-to=512", srcSet: "https://framerusercontent.com/images/d13zFBAtzvooNSTOwOohK4Fqjk.png 683w" } };
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
  const { style, className, layoutId, variant, g8inBlkLf, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ defaultVariant: "bvo87k4Jy", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-1fw9rnf", className, classNames), "data-border": true, "data-framer-name": "Desktop", layoutDependency, layoutId: "bvo87k4Jy", ref: refBinding, style: { "--border-bottom-width": "1px", "--border-color": "var(--token-30ee69d1-cae6-4a5c-9af2-db5c94a12e77, rgba(255, 255, 255, 0.05))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-74f48371-76c0-476a-a319-1331b3a438c2, rgb(8, 8, 8))", borderBottomLeftRadius: 26, borderBottomRightRadius: 26, borderTopLeftRadius: 26, borderTopRightRadius: 26, ...style }, children: /* @__PURE__ */ _jsx(Image, { background: { alt: "", fit: "fill", loading: getLoadingLazyAtYPosition((componentViewport?.y || 0) + 5 + (((componentViewport?.height || 110) - 10 - (Math.max(0, ((componentViewport?.height || 110) - 10 - 0) / 1) * 1 + 0)) / 2 + 0 + 0)), pixelHeight: 1024, pixelWidth: 1024, sizes: `calc(${componentViewport?.width || "100vw"} - 10px)`, ...toResponsiveImage(g8inBlkLf) }, className: "framer-16d4d68", "data-framer-name": "Image", layoutDependency, layoutId: "V8fmpikM5", style: { borderBottomLeftRadius: 22, borderBottomRightRadius: 22, borderTopLeftRadius: 22, borderTopRightRadius: 22 }, children: /* @__PURE__ */ _jsx(motion.div, { className: "framer-1hqsis2", "data-border": true, "data-framer-name": "Border", layoutDependency, layoutId: "UwEJVgx7y", style: { "--border-bottom-width": "0.5px", "--border-color": "var(--token-4ef09f89-9c35-4972-a9c1-8efc95820553, rgba(255, 255, 255, 0.2))", "--border-left-width": "0.5px", "--border-right-width": "0.5px", "--border-style": "solid", "--border-top-width": "1px", background: "linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)", borderBottomLeftRadius: 22, borderBottomRightRadius: 22, borderTopLeftRadius: 22, borderTopRightRadius: 22 } }) }) }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-CW9kX.framer-hobwkz, .framer-CW9kX .framer-hobwkz { display: block; }", ".framer-CW9kX.framer-1fw9rnf { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 154px; justify-content: center; overflow: hidden; padding: 5px; position: relative; width: 110px; will-change: var(--framer-will-change-override, transform); }", ".framer-CW9kX .framer-16d4d68 { -webkit-user-select: none; align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 1px; justify-content: center; overflow: visible; padding: 0px; pointer-events: none; position: relative; user-select: none; width: 100%; }", ".framer-CW9kX .framer-1hqsis2 { -webkit-user-select: none; bottom: 0px; flex: none; left: 0px; overflow: visible; pointer-events: none; position: absolute; right: 0px; top: 0px; user-select: none; z-index: 1; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-CW9kX.framer-1fw9rnf, .framer-CW9kX .framer-16d4d68 { gap: 0px; } .framer-CW9kX.framer-1fw9rnf > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-CW9kX.framer-1fw9rnf > :first-child { margin-top: 0px; } .framer-CW9kX.framer-1fw9rnf > :last-child { margin-bottom: 0px; } .framer-CW9kX .framer-16d4d68 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-CW9kX .framer-16d4d68 > :first-child { margin-left: 0px; } .framer-CW9kX .framer-16d4d68 > :last-child { margin-right: 0px; } }", '.framer-CW9kX[data-border="true"]::after, .framer-CW9kX [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'];
var FramergmGLzC77F = withCSS(Component, css, "framer-CW9kX");
var gmGLzC77F_default = FramergmGLzC77F;
FramergmGLzC77F.displayName = "Image Card 1";
FramergmGLzC77F.defaultProps = { height: 110, width: 110 };
addPropertyControls(FramergmGLzC77F, { g8inBlkLf: { __defaultAssetReference: "data:framer/asset-reference,d13zFBAtzvooNSTOwOohK4Fqjk.png?originalFilename=0mcD1RZ1djaCNIZF8eLbDbdcBhQ.png&preferredSize=auto", title: "Image", type: ControlType.ResponsiveImage } });
addFonts(FramergmGLzC77F, [{ explicitInter: true, fonts: [] }], { supportsExplicitInterCodegen: true });
export {
  gmGLzC77F_default as default
};
