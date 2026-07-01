// http-url:https://framerusercontent.com/modules/XxmbphdxppLKa8fp8zDw/ca7n0xFYJFDDo6SMfzXk/J0AtEhOB5.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getLoadingLazyAtYPosition, Image, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "framer";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";
import { useRef } from "react";
var serializationHash = "framer-xc7mg";
var variantClassNames = { eDukm1aHd: "framer-v-vq54n6" };
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
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
  return { ...props, Or6fUaHBj: image ?? props.Or6fUaHBj ?? { alt: "", pixelHeight: 1280, pixelWidth: 896, src: "https://framerusercontent.com/images/kaI0Lz0RW30Awo1Y289wwm2NWJU.png?scale-down-to=512", srcSet: "https://framerusercontent.com/images/kaI0Lz0RW30Awo1Y289wwm2NWJU.png?scale-down-to=1024 716w,https://framerusercontent.com/images/kaI0Lz0RW30Awo1Y289wwm2NWJU.png 896w" } };
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
  const { style, className, layoutId, variant, Or6fUaHBj, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ defaultVariant: "eDukm1aHd", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-vq54n6", className, classNames), "data-border": true, "data-framer-name": "Primary", layoutDependency, layoutId: "eDukm1aHd", ref: refBinding, style: { "--border-bottom-width": "1px", "--border-color": "var(--token-30ee69d1-cae6-4a5c-9af2-db5c94a12e77, rgba(255, 255, 255, 0.05))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-74f48371-76c0-476a-a319-1331b3a438c2, rgb(8, 8, 8))", borderBottomLeftRadius: 26, borderBottomRightRadius: 26, borderTopLeftRadius: 26, borderTopRightRadius: 26, ...style }, children: /* @__PURE__ */ _jsx(Image, { background: { alt: "", fit: "fill", loading: getLoadingLazyAtYPosition((componentViewport?.y || 0) + 5 + (((componentViewport?.height || 184) - 10 - (Math.max(0, ((componentViewport?.height || 184) - 10 - 0) / 1) * 1 + 0)) / 2 + 0 + 0)), pixelHeight: 1280, pixelWidth: 896, sizes: `calc(${componentViewport?.width || "100vw"} - 10px)`, ...toResponsiveImage(Or6fUaHBj) }, className: "framer-1lfbj3d", "data-framer-name": "Image", draggable: "false", layoutDependency, layoutId: "bE5o15lpBME8uUTrbz", style: { borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }, children: /* @__PURE__ */ _jsx(motion.div, { className: "framer-lchchb", "data-border": true, "data-framer-name": "Overlay", layoutDependency, layoutId: "uCaI8bywx", style: { "--border-bottom-width": "1px", "--border-color": "var(--token-d86f1591-0c16-44cd-be10-19334dfa9293, rgba(255, 255, 255, 0.1))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", background: "linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)", borderBottomLeftRadius: 23, borderBottomRightRadius: 23, borderTopLeftRadius: 23, borderTopRightRadius: 23 } }) }) }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-xc7mg.framer-mwt96a, .framer-xc7mg .framer-mwt96a { display: block; }", ".framer-xc7mg.framer-vq54n6 { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 184px; justify-content: center; overflow: hidden; padding: 5px; position: relative; width: 184px; will-change: var(--framer-will-change-override, transform); }", ".framer-xc7mg .framer-1lfbj3d { flex: 1 0 0px; height: 1px; overflow: hidden; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }", ".framer-xc7mg .framer-lchchb { -webkit-user-select: none; bottom: 0px; flex: none; left: 0px; overflow: visible; pointer-events: none; position: absolute; right: 0px; top: 0px; user-select: none; z-index: 1; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-xc7mg.framer-vq54n6 { gap: 0px; } .framer-xc7mg.framer-vq54n6 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-xc7mg.framer-vq54n6 > :first-child { margin-top: 0px; } .framer-xc7mg.framer-vq54n6 > :last-child { margin-bottom: 0px; } }", '.framer-xc7mg[data-border="true"]::after, .framer-xc7mg [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'];
var FramerJ0AtEhOB5 = withCSS(Component, css, "framer-xc7mg");
var J0AtEhOB5_default = FramerJ0AtEhOB5;
FramerJ0AtEhOB5.displayName = "Image Card 2";
FramerJ0AtEhOB5.defaultProps = { height: 184, width: 184 };
addPropertyControls(FramerJ0AtEhOB5, { Or6fUaHBj: { __defaultAssetReference: "data:framer/asset-reference,kaI0Lz0RW30Awo1Y289wwm2NWJU.png?originalFilename=visualelectric-1740465438901.png&preferredSize=auto", __vekterDefault: { alt: "", assetReference: "data:framer/asset-reference,kaI0Lz0RW30Awo1Y289wwm2NWJU.png?originalFilename=visualelectric-1740465438901.png&preferredSize=auto" }, title: "Image", type: ControlType.ResponsiveImage } });
addFonts(FramerJ0AtEhOB5, [{ explicitInter: true, fonts: [] }], { supportsExplicitInterCodegen: true });
export {
  J0AtEhOB5_default as default
};
