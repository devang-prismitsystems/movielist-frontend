import EditMovie from "@/components/EditMovie";

export default async function Page({ params }: { params: { id: string } }) {
    const slug = params.id;
    return (
        <EditMovie
            id={slug}
        />
    );
}
