'use client'
import React from 'react';

const BubbleText = ({ text }: { text: string }) => {
  return (
    <span className="text-center text-5xl font-thin text-gray-800 bubble-text-wrapper">
      {text.split('').map((child, idx) => (
        <span className="hoverText" key={idx}>
          {child}
        </span>
      ))}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .bubble-text-wrapper .hoverText {
            transition:
              0.35s font-weight,
              0.35s color;
            transition-duration: .2s;
          }
          .bubble-text-wrapper .hoverText:hover {
            font-weight: 900;
            color: #314155;
          }
          .bubble-text-wrapper .hoverText:hover + .hoverText {
            font-weight: 500;
            color: #4b5563;
          }
          .bubble-text-wrapper .hoverText:hover + .hoverText + .hoverText {
            font-weight: 300;
            color: #6b7280;
          }
          .bubble-text-wrapper .hoverText:has(+ .hoverText:hover) {
            font-weight: 500;
            color: #4b5563;
          }
          .bubble-text-wrapper .hoverText:has(+ .hoverText + .hoverText:hover) {
            font-weight: 300;
            color: #6b7280;
          }
        }
      `}</style>
    </span>
  );
};

export default BubbleText;