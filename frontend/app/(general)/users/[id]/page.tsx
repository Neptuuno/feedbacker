import {fetchWrapper} from "@/lib/fetchwrapper";
import {User} from "@/lib/Entities/User";
import ChatAppLinkButton from "@/components/ChatAppLinkButton";


async function getUserData(params: { id: number }): Promise<User> {
    const url = `${process.env.API_URL}/users/${(params).id}`;
    return await fetchWrapper(url);
}

export default async function UserDetail(
    props: {
        params: Promise<{ id: number }>
    }
) {
    const params = await props.params;
    const user: User = await getUserData(params)

    return (
        <div>
            <p>{user.username}</p>
            <ChatAppLinkButton
                className="w-[10%] bg-primary text-secondary rounded p-4"
                buttonText="Link account"
                appSlug="b2e97f6c-416c-46b8-ab71-31756d606335"
                chatAppBaseUrl="http://localhost:7000/login"
                redirectUri="http://localhost:4000/projects"
            />
        </div>
    )
}