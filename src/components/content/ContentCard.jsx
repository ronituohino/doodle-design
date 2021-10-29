import { animated, useSpring } from "react-spring"
import { Link } from "react-router-dom"

const ContentCard = ({ link, size, children }) => {
  const [{ blurSpread }, api] = useSpring(() => ({
    blurSpread: [12, 2],
  }))

  return (
    <>
      <Link to={link} style={{ textDecoration: "none", margin: 8 }}>
        <animated.div
          onMouseEnter={() =>
            api.start({
              to: { blurSpread: [16, 8] },
              config: { tension: 210, friction: 20 },
            })
          }
          onMouseLeave={() =>
            api.start({
              to: { blurSpread: [12, 2] },
              config: { tension: 210, friction: 20 },
            })
          }
          style={{
            width: size.width,
            height: size.height,
            borderRadius: 16,
            boxShadow: blurSpread.to(
              (blur, spread) =>
                `0px 0px ${blur}px ${spread}px rgba(0, 0, 0, 0.3)`
            ),
          }}
        >
          {children}
        </animated.div>
      </Link>
    </>
  )
}

export default ContentCard
