export default function TestPage() {
  return (
    <div className="p-10">
      <pre>
        {JSON.stringify(
          {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20),
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}