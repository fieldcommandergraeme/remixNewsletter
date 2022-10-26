import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main
      style={{
        fontFamily: "system-ui, san-serif",
        lineHeight: "1.4",
      }}
    >
      <h1>Welcome to remix!</h1>
      <Link to="people">People</Link>
    </main>
  )
}