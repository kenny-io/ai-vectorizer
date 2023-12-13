'use server';
export default async function vectorizeText(inputText: string) {
  const text = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input: inputText,
      model: 'text-embedding-ada-002',
    }),
  }).then((res) => res.json());
  return text;
}
