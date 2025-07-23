'use client'
const BubbleText = ({ text }: { text: string }) => {
  return (
    <span className="text-center text-5xl font-thin text-gray-800">
      {text.split('').map((child, idx) => (
        <span className="hoverText" key={idx}>
          {child}
          <style>{`
            .hoverText {
              transition:
                0.35s font-weight,
                0.35s color;
                transition-duration: .2s;
            }
            .hoverText:hover {
              font-weight: 900;
              color: #314155;
            }
            .hoverText:hover + .hoverText {
              font-weight: 500;
              color: #4b5563;
            }
            .hoverText:hover + .hoverText + .hoverText {
              font-weight: 300;
              color: #6b7280;
            }
            .hoverText:has(+ .hoverText:hover) {
              font-weight: 500;
              color: #4b5563;
            }
            .hoverText:has(+ .hoverText + .hoverText:hover) {
              font-weight: 300;
              color: #6b7280;
            }
          `}</style>
        </span>
      ))}
    </span>
  )
}

export default BubbleText
