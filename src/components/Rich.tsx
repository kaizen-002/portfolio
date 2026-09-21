// Renders content strings where `backticks` mark code, e.g. commands and file names.
export function Rich({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))}
    </>
  );
}
