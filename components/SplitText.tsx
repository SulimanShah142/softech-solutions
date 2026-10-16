'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
  duration?: number;
  wordsClass?: string;
  hideUntilReady?: boolean;
  ease?: string | ((t: number) => number);
  splitType?: 'none' | 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  startDelay = 0,
  duration = 1.25,
  wordsClass = 'split-word',
  hideUntilReady = false,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const animationStartedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useGSAP(
    () => {
      if (!ref.current || !text) return;
      animationCompletedRef.current = false;
      const el = ref.current;
      if (hideUntilReady) el.style.visibility = 'hidden';
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        el.style.visibility = 'visible';
        animationCompletedRef.current = true;
        onCompleteRef.current?.();
        return;
      }

      animationStartedRef.current = false;
      let observer: IntersectionObserver | undefined;
      const animateTargets = (targets: Element[]) => {
        if (!targets.length) {
          el.style.visibility = 'visible';
          return;
        }

        const animate = () => {
          if (animationStartedRef.current) return;
          animationStartedRef.current = true;
          gsap.to(targets, {
            ...to,
            delay: startDelay / 1000,
            duration,
            ease,
            stagger: delay / 1000,
            onComplete: () => {
              gsap.set(targets, {
                clearProps: 'transform,filter,willChange'
              });
              animationCompletedRef.current = true;
              onCompleteRef.current?.();
            },
            willChange: 'transform, opacity',
            force3D: false
          });
        };

        gsap.set(targets, { ...from, willChange: 'transform, opacity', force3D: false });
        if (hideUntilReady) el.style.visibility = 'visible';

        if (!('IntersectionObserver' in window)) {
          animate();
          return;
        }

        try {
          observer = new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                observer?.disconnect();
                animate();
              }
            },
            {
              rootMargin,
              threshold: Math.min(1, Math.max(0, threshold))
            }
          );
          observer.observe(el);
        } catch {
          animate();
        }
      };

      if (splitType === 'none') {
        animateTargets([el]);
        return () => observer?.disconnect();
      }

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: splitType.includes('lines'),
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass,
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          const targets = splitType.includes('chars') && self.chars.length
            ? self.chars
            : splitType.includes('words') && self.words.length
              ? self.words
              : splitType.includes('lines') && self.lines.length
                ? self.lines
                : self.chars.length
                  ? self.chars
                  : self.words.length
                    ? self.words
                    : self.lines;

          animateTargets(targets);
        }
      });

      return () => {
        observer?.disconnect();
        splitInstance.revert();
      };
    },
    {
      dependencies: [
        text,
        delay,
        startDelay,
        duration,
        wordsClass,
        hideUntilReady,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin
      ],
        scope: ref,
        revertOnUpdate: true
      }
  );

  const renderTag = () => {
      const style: React.CSSProperties = {
        textAlign,
        whiteSpace: 'normal'
    };
      const classes = `split-parent whitespace-normal ${className}`;
    const Tag: React.ElementType = tag || 'p';

    return (
      <Tag
        ref={ref as React.Ref<HTMLHeadingElement>}
        style={style}
        className={`${classes}${hideUntilReady ? ' split-text-pending' : ''}`}
      >
        {text}
      </Tag>
    );
  };

  return renderTag();
};

export default SplitText;
