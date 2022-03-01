curl "https://nextjs-rendering-modes.vercel.app/api/revalidate" \
  -X POST \
  -H "Content-Type: application/json" \
  -d "[\"/pokemon/1\"]"