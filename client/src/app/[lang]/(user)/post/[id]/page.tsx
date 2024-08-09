export default function Blog({
                               params,
                             }: {
  params: { id: string };
}) {
  return (
      <div>
        blog page {params.id}
      </div>
  )
}