// http-url:https://framerusercontent.com/modules/P1RMISfTV6yX09pCqAkt/4Mo3cyDkwwzeVfg7rFzW/AfQ53zqaz.js
import { jsx as _jsx3 } from "react/jsx-runtime";
import { addFonts as addFonts2, ComponentViewportProvider, cx as cx2, getFonts, SmartComponentScopedContainer, useComponentViewport as useComponentViewport2, useLocaleInfo as useLocaleInfo2, useVariantState as useVariantState2, withCSS as withCSS2 } from "framer";
import { LayoutGroup as LayoutGroup3, motion as motion3, MotionConfigContext as MotionConfigContext2 } from "framer-motion";
import * as React2 from "react";
import { useRef as useRef3 } from "react";

// http-url:https://framerusercontent.com/modules/B2xAlJLcN0gOnt11mSPw/jyRNgY7vYWXe6t31T0wo/Ticker.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, useLayoutEffect, useEffect, useState, useRef, useMemo, useCallback, cloneElement } from "react";
import { addPropertyControls, ControlType, RenderTarget } from "framer";
import { useReducedMotion, LayoutGroup, useInView, useMotionValue, useTransform, motion, frame } from "framer-motion";
import { resize } from "@motionone/dom";
var MAX_DUPLICATED_ITEMS = 100;
var directionTransformers = { left: (offset) => `translateX(-${offset}px)`, right: (offset) => `translateX(${offset}px)`, top: (offset) => `translateY(-${offset}px)`, bottom: (offset) => `translateY(${offset}px)` };
function Ticker(props) {
  let { slots = [], gap, padding, paddingPerSide, paddingTop, paddingRight, paddingBottom, paddingLeft, speed, hoverFactor, direction, alignment, sizingOptions, fadeOptions, style } = props;
  const { fadeContent, overflow, fadeWidth, fadeInset, fadeAlpha } = fadeOptions;
  const { widthType, heightType } = sizingOptions;
  const paddingValue = paddingPerSide ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px` : `${padding}px`;
  const currentTarget = RenderTarget.current();
  const isCanvas = currentTarget === RenderTarget.canvas || currentTarget === RenderTarget.export;
  const filteredSlots = slots.filter(Boolean);
  const numChildren = Children.count(filteredSlots);
  const hasChildren = numChildren > 0;
  if (direction === true) {
    direction = "left";
  }
  const isHorizontal = direction === "left" || direction === "right";
  const offset = useMotionValue(0);
  const transformer = directionTransformers[direction];
  const transform = useTransform(offset, transformer);
  const parentRef = useRef(null);
  const childrenRef = useMemo(() => {
    return [{ current: null }, { current: null }];
  }, []);
  const [size, setSize] = useState({ parent: null, children: null });
  let clonedChildren = null;
  let dupedChildren = [];
  let duplicateBy = 0;
  let opacity = 0;
  if (isCanvas) {
    duplicateBy = numChildren ? Math.floor(10 / numChildren) : 0;
    opacity = 1;
  }
  if (!isCanvas && hasChildren && size.parent) {
    duplicateBy = Math.round(size.parent / size.children * 2) + 1;
    duplicateBy = Math.min(duplicateBy, MAX_DUPLICATED_ITEMS);
    opacity = 1;
  }
  const measure = useCallback(() => {
    if (hasChildren && parentRef.current) {
      const parentLength = isHorizontal ? parentRef.current.offsetWidth : parentRef.current.offsetHeight;
      const start = childrenRef[0].current ? isHorizontal ? childrenRef[0].current.offsetLeft : childrenRef[0].current.offsetTop : 0;
      const end = childrenRef[1].current ? isHorizontal ? childrenRef[1].current.offsetLeft + childrenRef[1].current.offsetWidth : childrenRef[1].current.offsetTop + childrenRef[1].current.offsetHeight : 0;
      const childrenLength = end - start + gap;
      setSize({ parent: parentLength, children: childrenLength });
    }
  }, []);
  const childrenStyles = isCanvas ? { contentVisibility: "auto" } : {};
  if (hasChildren) {
    if (!isCanvas) {
      let initialResize = useRef(true);
      useLayoutEffect(() => {
        frame.read(measure, false, true);
        return resize(parentRef.current, ({ contentSize }) => {
          if (!initialResize.current && (contentSize.width || contentSize.height)) {
            frame.read(measure, false, true);
          }
          initialResize.current = false;
        });
      }, []);
    }
    clonedChildren = Children.map(filteredSlots, (child, index) => {
      let ref;
      if (index === 0) {
        ref = childrenRef[0];
      }
      if (index === filteredSlots.length - 1) {
        ref = childrenRef[1];
      }
      const size2 = { width: widthType ? child.props?.width : "100%", height: heightType ? child.props?.height : "100%" };
      return /* @__PURE__ */ _jsx(LayoutGroup, { inherit: "id", children: /* @__PURE__ */ _jsx("li", { ref, style: size2, children: /* @__PURE__ */ cloneElement(child, { style: { ...child.props?.style, ...size2, flexShrink: 0, ...childrenStyles }, layoutId: child.props.layoutId ? child.props.layoutId + "-original-" + index : void 0 }, child.props?.children) }) });
    });
  }
  const isInView = isCanvas ? true : useInView(parentRef);
  if (!isCanvas) {
    for (let i = 0; i < duplicateBy; i++) {
      dupedChildren = dupedChildren.concat(Children.map(filteredSlots, (child, childIndex) => {
        const size2 = { width: widthType ? child.props?.width : "100%", height: heightType ? child.props?.height : "100%", willChange: !isInView ? void 0 : "transform" };
        return /* @__PURE__ */ _jsx(LayoutGroup, { inherit: "id", children: /* @__PURE__ */ _jsx("li", { style: size2, "aria-hidden": true, children: /* @__PURE__ */ cloneElement(child, { key: i + " " + childIndex, style: { ...child.props?.style, width: widthType ? child.props?.width : "100%", height: heightType ? child.props?.height : "100%", flexShrink: 0, ...childrenStyles }, layoutId: child.props.layoutId ? child.props.layoutId + "-dupe-" + i : void 0 }, child.props?.children) }, i + "li" + childIndex) }, i + "lg" + childIndex);
      }));
    }
  }
  const animateToValue = size.children + size.children * Math.round(size.parent / size.children);
  const initialTime = useRef(null);
  const prevTime = useRef(null);
  const xOrY = useRef(0);
  const isHover = useRef(false);
  const isReducedMotion = useReducedMotion();
  const listRef = useRef(null);
  const animationRef = useRef(null);
  if (!isCanvas) {
    useEffect(() => {
      if (isReducedMotion || !animateToValue || !speed) {
        return;
      }
      animationRef.current = listRef.current.animate({ transform: [transformer(0), transformer(animateToValue)] }, { duration: Math.abs(animateToValue) / speed * 1e3, iterations: Infinity, easing: "linear" });
      return () => animationRef.current.cancel();
    }, [hoverFactor, animateToValue, speed]);
    const playOrPause = useCallback(() => {
      if (!animationRef.current) return;
      const hidden = document.hidden;
      if (isInView && !hidden && animationRef.current.playState === "paused") {
        animationRef.current.play();
      } else if ((!isInView || hidden) && animationRef.current.playState === "running") {
        animationRef.current.pause();
      }
    }, [isInView]);
    useEffect(() => {
      playOrPause();
    }, [isInView, hoverFactor, animateToValue, speed]);
    useEffect(() => {
      document.addEventListener("visibilitychange", playOrPause);
      return () => {
        document.removeEventListener("visibilitychange", playOrPause);
      };
    }, [playOrPause]);
  }
  const fadeDirection = isHorizontal ? "to right" : "to bottom";
  const fadeWidthStart = fadeWidth / 2;
  const fadeWidthEnd = 100 - fadeWidth / 2;
  const fadeInsetStart = clamp(fadeInset, 0, fadeWidthStart);
  const fadeInsetEnd = 100 - fadeInset;
  const fadeMask = `linear-gradient(${fadeDirection}, rgba(0, 0, 0, ${fadeAlpha}) ${fadeInsetStart}%, rgba(0, 0, 0, 1) ${fadeWidthStart}%, rgba(0, 0, 0, 1) ${fadeWidthEnd}%, rgba(0, 0, 0, ${fadeAlpha}) ${fadeInsetEnd}%)`;
  if (!hasChildren) {
    return /* @__PURE__ */ _jsxs("section", { style: placeholderStyles, children: [/* @__PURE__ */ _jsx("div", { style: emojiStyles, children: "\u2728" }), /* @__PURE__ */ _jsx("p", { style: titleStyles, children: "Connect to Content" }), /* @__PURE__ */ _jsx("p", { style: subtitleStyles, children: "Add layers or components to infinitely loop on your page." })] });
  }
  return /* @__PURE__ */ _jsx("section", { style: { ...containerStyle, opacity, WebkitMaskImage: fadeContent ? fadeMask : void 0, maskImage: fadeContent ? fadeMask : void 0, overflow: overflow ? "visible" : "hidden", padding: paddingValue }, ref: parentRef, children: /* @__PURE__ */ _jsxs(motion.ul, { ref: listRef, style: { ...containerStyle, gap, top: direction === "bottom" && isValidNumber(animateToValue) ? -animateToValue : void 0, left: direction === "right" && isValidNumber(animateToValue) ? -animateToValue : void 0, placeItems: alignment, position: "relative", flexDirection: isHorizontal ? "row" : "column", ...style, willChange: isCanvas || !isInView ? "auto" : "transform", transform: transformer(0) }, onMouseEnter: () => {
    isHover.current = true;
    if (animationRef.current) {
      animationRef.current.playbackRate = hoverFactor;
    }
  }, onMouseLeave: () => {
    isHover.current = false;
    if (animationRef.current) {
      animationRef.current.playbackRate = 1;
    }
  }, children: [clonedChildren, dupedChildren] }) });
}
Ticker.defaultProps = { gap: 10, padding: 10, sizingOptions: { widthType: true, heightType: true }, fadeOptions: { fadeContent: true, overflow: false, fadeWidth: 25, fadeAlpha: 0, fadeInset: 0 }, direction: true };
addPropertyControls(Ticker, { slots: { type: ControlType.Array, title: "Children", control: { type: ControlType.ComponentInstance } }, speed: { type: ControlType.Number, title: "Speed", min: 0, max: 1e3, defaultValue: 100, unit: "%", displayStepper: true, step: 5 }, direction: { type: ControlType.Enum, title: "Direction", options: ["left", "right", "top", "bottom"], optionIcons: ["direction-left", "direction-right", "direction-up", "direction-down"], optionTitles: ["Left", "Right", "Top", "Bottom"], defaultValue: "left", displaySegmentedControl: true }, alignment: { type: ControlType.Enum, title: "Align", options: ["flex-start", "center", "flex-end"], optionIcons: { direction: { right: ["align-top", "align-middle", "align-bottom"], left: ["align-top", "align-middle", "align-bottom"], top: ["align-left", "align-center", "align-right"], bottom: ["align-left", "align-center", "align-right"] } }, defaultValue: "center", displaySegmentedControl: true }, gap: { type: ControlType.Number, title: "Gap" }, padding: { title: "Padding", type: ControlType.FusedNumber, toggleKey: "paddingPerSide", toggleTitles: ["Padding", "Padding per side"], valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"], valueLabels: ["T", "R", "B", "L"], min: 0 }, sizingOptions: { type: ControlType.Object, title: "Sizing", controls: { widthType: { type: ControlType.Boolean, title: "Width", enabledTitle: "Auto", disabledTitle: "Stretch", defaultValue: true }, heightType: { type: ControlType.Boolean, title: "Height", enabledTitle: "Auto", disabledTitle: "Stretch", defaultValue: true } } }, fadeOptions: { type: ControlType.Object, title: "Clipping", controls: { fadeContent: { type: ControlType.Boolean, title: "Fade", defaultValue: true }, overflow: { type: ControlType.Boolean, title: "Overflow", enabledTitle: "Show", disabledTitle: "Hide", defaultValue: false, hidden(props) {
  return props.fadeContent === true;
} }, fadeWidth: { type: ControlType.Number, title: "Width", defaultValue: 25, min: 0, max: 100, unit: "%", hidden(props) {
  return props.fadeContent === false;
} }, fadeInset: { type: ControlType.Number, title: "Inset", defaultValue: 0, min: 0, max: 100, unit: "%", hidden(props) {
  return props.fadeContent === false;
} }, fadeAlpha: { type: ControlType.Number, title: "Opacity", defaultValue: 0, min: 0, max: 1, step: 0.05, hidden(props) {
  return props.fadeContent === false;
} } } }, hoverFactor: { type: ControlType.Number, title: "Hover", min: 0, max: 1, unit: "x", defaultValue: 1, step: 0.1, displayStepper: true, description: "Slows down the speed while you are hovering." } });
var containerStyle = { display: "flex", width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%", placeItems: "center", margin: 0, padding: 0, listStyleType: "none", textIndent: "none" };
var placeholderStyles = { display: "flex", width: "100%", height: "100%", placeContent: "center", placeItems: "center", flexDirection: "column", color: "#96F", background: "rgba(136, 85, 255, 0.1)", fontSize: 11, overflow: "hidden", padding: "20px 20px 30px 20px" };
var emojiStyles = { fontSize: 32, marginBottom: 10 };
var titleStyles = { margin: 0, marginBottom: 10, fontWeight: 600, textAlign: "center" };
var subtitleStyles = { margin: 0, opacity: 0.7, maxWidth: 150, lineHeight: 1.5, textAlign: "center" };
var clamp = (num, min, max) => Math.min(Math.max(num, min), max);
var isValidNumber = (value) => typeof value === "number" && !isNaN(value);

// http-url:https://framerusercontent.com/modules/wkWRYgosSbCVngkMkpIk/Kzn8MgA1RFqWvtP5evPn/Jaq007kCb.js
import { jsx as _jsx2 } from "react/jsx-runtime";
import { addFonts, addPropertyControls as addPropertyControls2, ControlType as ControlType2, cx, getLoadingLazyAtYPosition, Image, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "framer";
import { LayoutGroup as LayoutGroup2, motion as motion2, MotionConfigContext } from "framer-motion";
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
  return /* @__PURE__ */ _jsx2(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion2.create(React.Fragment);
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
  return /* @__PURE__ */ _jsx2(LayoutGroup2, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx2(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx2(Transition, { value: transition1, children: /* @__PURE__ */ _jsx2(Image, { ...restProps, ...gestureHandlers, background: { alt: "", fit: "fill", loading: getLoadingLazyAtYPosition(componentViewport?.y || 0), pixelHeight: 240, pixelWidth: 240, sizes: componentViewport?.width || "100vw", ...toResponsiveImage(gXOj0HXL2), ...{ positionX: "center", positionY: "center" } }, className: cx(scopingClassNames, "framer-104yw04", className, classNames), "data-framer-name": "Primary", layoutDependency, layoutId: "cNV4xsdxO", ref: ref ?? ref1, style: { ...style } }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-fC072.framer-1ed5j4m, .framer-fC072 .framer-1ed5j4m { display: block; }", ".framer-fC072.framer-104yw04 { height: 80px; overflow: hidden; position: relative; width: 80px; }"];
var FramerJaq007kCb = withCSS(Component, css, "framer-fC072");
var Jaq007kCb_default = FramerJaq007kCb;
FramerJaq007kCb.displayName = "Interactive Components/Logo Image";
FramerJaq007kCb.defaultProps = { height: 80, width: 80 };
addPropertyControls2(FramerJaq007kCb, { gXOj0HXL2: { __defaultAssetReference: "data:framer/asset-reference,vniufJMsSAXh18yjYsUsriXaJgw.png?originalFilename=1.png&preferredSize=auto", title: "Logo", type: ControlType2.ResponsiveImage } });
addFonts(FramerJaq007kCb, [{ explicitInter: true, fonts: [] }], { supportsExplicitInterCodegen: true });

// http-url:https://framerusercontent.com/modules/P1RMISfTV6yX09pCqAkt/4Mo3cyDkwwzeVfg7rFzW/AfQ53zqaz.js
var InteractiveComponentsLogoImageFonts = getFonts(Jaq007kCb_default);
var TickerFonts = getFonts(Ticker);
var serializationHash2 = "framer-dt2aJ";
var variantClassNames2 = { VEMWuMRbN: "framer-v-19r1qsz" };
var transition12 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var addImageAlt = (image, alt) => {
  if (!image || typeof image !== "object") {
    return;
  }
  return { ...image, alt };
};
var Transition2 = ({ value, children }) => {
  const config = React2.useContext(MotionConfigContext2);
  const transition = value ?? config.transition;
  const contextValue = React2.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx3(MotionConfigContext2.Provider, { value: contextValue, children });
};
var Variants2 = motion3.create(React2.Fragment);
var getProps2 = ({ height, id, width, ...props }) => {
  return { ...props };
};
var createLayoutDependency2 = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component2 = /* @__PURE__ */ React2.forwardRef(function(props, ref) {
  const fallbackRef = useRef3(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React2.useId();
  const { activeLocale, setLocale } = useLocaleInfo2();
  const componentViewport = useComponentViewport2();
  const { style, className, layoutId, variant, ...restProps } = getProps2(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState2({ defaultVariant: "VEMWuMRbN", ref: refBinding, variant, variantClassNames: variantClassNames2 });
  const layoutDependency = createLayoutDependency2(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx2(serializationHash2, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx3(LayoutGroup3, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx3(Variants2, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx3(Transition2, { value: transition12, children: /* @__PURE__ */ _jsx3(motion3.div, { ...restProps, ...gestureHandlers, className: cx2(scopingClassNames, "framer-19r1qsz", className, classNames), "data-framer-name": "Primary", layoutDependency, layoutId: "VEMWuMRbN", ref: refBinding, style: { ...style }, children: /* @__PURE__ */ _jsx3(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx3(SmartComponentScopedContainer, { className: "framer-c3kj4e-container", isAuthoredByUser: true, isModuleExternal: true, layoutDependency, layoutId: "LAHJprC31-container", nodeId: "LAHJprC31", rendersWithMotion: true, scopeId: "AfQ53zqaz", children: /* @__PURE__ */ _jsx3(Ticker, { alignment: "center", direction: "left", fadeOptions: { fadeAlpha: 0, fadeContent: true, fadeInset: 0, fadeWidth: 60, overflow: false }, gap: 40, height: "100%", hoverFactor: 1, id: "LAHJprC31", layoutId: "LAHJprC31", padding: 10, paddingBottom: 10, paddingLeft: 10, paddingPerSide: false, paddingRight: 10, paddingTop: 10, sizingOptions: { heightType: true, widthType: true }, slots: [/* @__PURE__ */ _jsx3(ComponentViewportProvider, { height: 80, width: "80px", children: /* @__PURE__ */ _jsx3(SmartComponentScopedContainer, { className: "framer-kul0r9-container", inComponentSlot: true, layoutDependency, layoutId: "DcIOmlDyW-container", nodeId: "DcIOmlDyW", rendersWithMotion: true, scopeId: "AfQ53zqaz", children: /* @__PURE__ */ _jsx3(Jaq007kCb_default, { height: "100%", id: "DcIOmlDyW", layoutId: "DcIOmlDyW", style: { height: "100%", width: "100%" }, width: "100%" }) }) }), /* @__PURE__ */ _jsx3(ComponentViewportProvider, { height: 80, width: "80px", children: /* @__PURE__ */ _jsx3(SmartComponentScopedContainer, { className: "framer-11cncg5-container", inComponentSlot: true, layoutDependency, layoutId: "mEjeNc_OX-container", nodeId: "mEjeNc_OX", rendersWithMotion: true, scopeId: "AfQ53zqaz", children: /* @__PURE__ */ _jsx3(Jaq007kCb_default, { gXOj0HXL2: addImageAlt({ pixelHeight: 240, pixelWidth: 240, src: "https://framerusercontent.com/images/yTyqzwdEKp9XJLQBwf8DmWnxws.png" }, "Logo"), height: "100%", id: "mEjeNc_OX", layoutId: "mEjeNc_OX", style: { height: "100%", width: "100%" }, width: "100%" }) }) }), /* @__PURE__ */ _jsx3(ComponentViewportProvider, { height: 80, width: "80px", children: /* @__PURE__ */ _jsx3(SmartComponentScopedContainer, { className: "framer-1l18v1y-container", inComponentSlot: true, layoutDependency, layoutId: "poocAmRaN-container", nodeId: "poocAmRaN", rendersWithMotion: true, scopeId: "AfQ53zqaz", children: /* @__PURE__ */ _jsx3(Jaq007kCb_default, { gXOj0HXL2: addImageAlt({ pixelHeight: 240, pixelWidth: 240, src: "https://framerusercontent.com/images/ffx7akDwhywGTdzIV6fqasW7N8.png" }, "Logo"), height: "100%", id: "poocAmRaN", layoutId: "poocAmRaN", style: { height: "100%", width: "100%" }, width: "100%" }) }) }), /* @__PURE__ */ _jsx3(ComponentViewportProvider, { height: 80, width: "80px", children: /* @__PURE__ */ _jsx3(SmartComponentScopedContainer, { className: "framer-1wewsxe-container", inComponentSlot: true, layoutDependency, layoutId: "DH5OWpVpl-container", nodeId: "DH5OWpVpl", rendersWithMotion: true, scopeId: "AfQ53zqaz", children: /* @__PURE__ */ _jsx3(Jaq007kCb_default, { gXOj0HXL2: addImageAlt({ pixelHeight: 240, pixelWidth: 240, src: "https://framerusercontent.com/images/QJyR5CNEY5EZDa18LPHJLBySZsY.png" }, "Logo"), height: "100%", id: "DH5OWpVpl", layoutId: "DH5OWpVpl", style: { height: "100%", width: "100%" }, width: "100%" }) }) })], speed: 25, style: { height: "100%", width: "100%" }, width: "100%" }) }) }) }) }) }) });
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-dt2aJ.framer-13hxa1r, .framer-dt2aJ .framer-13hxa1r { display: block; }", ".framer-dt2aJ.framer-19r1qsz { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 430px; }", ".framer-dt2aJ .framer-c3kj4e-container { flex: 1 0 0px; height: 80px; position: relative; width: 1px; }", ".framer-dt2aJ .framer-kul0r9-container, .framer-dt2aJ .framer-11cncg5-container, .framer-dt2aJ .framer-1l18v1y-container, .framer-dt2aJ .framer-1wewsxe-container { height: 80px; position: relative; width: 80px; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-dt2aJ.framer-19r1qsz { gap: 0px; } .framer-dt2aJ.framer-19r1qsz > * { margin: 0px; margin-left: calc(40px / 2); margin-right: calc(40px / 2); } .framer-dt2aJ.framer-19r1qsz > :first-child { margin-left: 0px; } .framer-dt2aJ.framer-19r1qsz > :last-child { margin-right: 0px; } }"];
var FramerAfQ53zqaz = withCSS2(Component2, css2, "framer-dt2aJ");
var AfQ53zqaz_default = FramerAfQ53zqaz;
FramerAfQ53zqaz.displayName = "Client Section";
FramerAfQ53zqaz.defaultProps = { height: 80, width: 430 };
addFonts2(FramerAfQ53zqaz, [{ explicitInter: true, fonts: [] }, ...InteractiveComponentsLogoImageFonts, ...TickerFonts], { supportsExplicitInterCodegen: true });
export {
  AfQ53zqaz_default as default
};
