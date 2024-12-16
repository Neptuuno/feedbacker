export default async function Page({
params,
 }: {
    params: Promise<{ id: number }>
}) {
    const id = (await params).id
    return <div>Project id: {id}</div>
}