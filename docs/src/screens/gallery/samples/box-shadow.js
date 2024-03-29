const code = `
function BoxShadow() {
  const [props] = useFriction({
    from: {
      boxShadow: "-1rem 1rem teal, 1rem -1rem #f2cf63",
      transform: "translate(-2rem, -2rem)"
    },
    to: {
      boxShadow: "1rem -1rem orange, -1rem 1rem #f25050",
      transform: "translate(2rem, 2rem)"
    },
    config: {
      mu: 0.4,
      mass: 25,
      initialVelocity: 10
    },
    repeat: Infinity
  });

  return <div className="lp__m lp__m--sm" {...props} />;
}
`;

export const boxShadow = {
  title: 'Box Shadow',
  slug: 'box-shadow/',
  code,
  demoLink: 'https://codesandbox.io/s/renature-box-shadow-1ytkc',
};
