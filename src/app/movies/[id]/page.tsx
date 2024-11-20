import EditMovie from "@/components/EditMovie";
import Apiservices from "@/apiservices/apiServices";

export default async function Page({ params }: { params: { id: string } }) {
    const slug = params.id;


    return (
        <EditMovie
            id={slug}
        />
    );
}
