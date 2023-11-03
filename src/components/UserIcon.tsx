import { User } from "../model/user"




export const UserIcon = ({className, user}: {className?: string, user: User | undefined}) => {
    console.log(user)
    return (
        <div className={className}>
            {/* <img src={user?.imageUrl} alt="user profile" /> */}
        </div>
    )
}