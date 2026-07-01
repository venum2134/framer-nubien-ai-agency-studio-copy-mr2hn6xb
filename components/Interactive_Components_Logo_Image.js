// http-url:https://framerusercontent.com/modules/wkWRYgosSbCVngkMkpIk/Kzn8MgA1RFqWvtP5evPn/Jaq007kCb.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getLoadingLazyAtYPosition, Image, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "framer";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";
var serializationHash = "framer-fC072";
var variantClassNames = { cNV4xsdxO: "framer-v-104yw04" };
var toResponsiveImage = (value) => {
  if (typeof value === "object" && value !== null && typeof value.src === "string") {
    return value;
  }
  return typeof value === "string" ? { src: value } : void 0;
};
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var getProps = ({ height, id, logo, width, ...props }) => {
  return { ...props, gXOj0HXL2: logo ?? props.gXOj0HXL2 ?? { src: "https://framerusercontent.com/images/vniufJMsSAXh18yjYsUsriXaJgw.png" } };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const { activeLocale, setLocale } = useLocaleInfo();
  const { style, className, layoutId, variant, gXOj0HXL2, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ defaultVariant: "cNV4xsdxO", variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  const ref1 = React.useRef(null);
  const defaultLayoutId = React.useId();
  const componentViewport = useComponentViewport();
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(Image, { ...restProps, ...gestureHandlers, background: { alt: "", fit: "fill", loading: getLoadingLazyAtYPosition(componentViewport?.y || 0), pixelHeight: 240, pixelWidth: 240, sizes: componentViewport?.width || "100vw", ...toResponsiveImage(gXOj0HXL2), ...{ positionX: "center", positionY: "center" } }, className: cx(scopingClassNames, "framer-104yw04", className, classNames), "data-framer-name": "Primary", layoutDependency, layoutId: "cNV4xsdxO", ref: ref ?? ref1, style: { ...style } }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-fC072.framer-1ed5j4m, .framer-fC072 .framer-1ed5j4m { display: block; }", ".framer-fC072.framer-104yw04 { height: 80px; overflow: hidden; position: relative; width: 80px; }"];
var FramerJaq007kCb = withCSS(Component, css, "framer-fC072");
var Jaq007kCb_default = FramerJaq007kCb;
FramerJaq007kCb.displayName = "Interactive Components/Logo Image";
FramerJaq007kCb.defaultProps = { height: 80, width: 80 };
addPropertyControls(FramerJaq007kCb, { gXOj0HXL2: { __defaultAssetReference: "data:framer/asset-reference,vniufJMsSAXh18yjYsUsriXaJgw.png?originalFilename=1.png&preferredSize=auto", title: "Logo", type: ControlType.ResponsiveImage } });
addFonts(FramerJaq007kCb, [{ explicitInter: true, fonts: [] }], { supportsExplicitInterCodegen: true });
export {
  Jaq007kCb_default as default
};
