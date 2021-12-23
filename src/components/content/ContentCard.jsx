import { animated, useSpring } from "react-spring"

const ContentCard = ({ disableHover, size, children, sx }) => {
  const [{ blurSpread }, api] = useSpring(() => ({
    blurSpread: [8, 2],
  }))

  return (
    <animated.div
      onMouseEnter={() => {
        if (!disableHover) {
          api.start({
            to: { blurSpread: [12, 6] },
            config: { tension: 210, friction: 20 },
          })
        }
      }}
      onMouseLeave={() => {
        if (!disableHover) {
          api.start({
            to: { blurSpread: [8, 2] },
            config: { tension: 210, friction: 20 },
          })
        }
      }}
      style={{
        width: size.width,
        height: size.height,
        borderRadius: 4,
        boxShadow: blurSpread.to(
          (blur, spread) =>
            `0px 0px ${blur}px ${spread}px rgba(0, 0, 0, 0.3)`
        ),
        ...sx,
      }}
    >
      {children}
    </animated.div>
  )
}

export default ContentCard
