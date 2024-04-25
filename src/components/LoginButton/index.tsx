'use client'

import {useRouter} from 'next/navigation'

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal"| "redirect",
    asChild?: boolean
}

export const LoginButton = ({
    children, 
    mode = 'redirect', //redirect as default
    asChild
}: LoginButtonProps) => {
    const router = useRouter();
    const handleLoginClick = ()=> {
        console.log("clicked")
        router.push("/auth/login");
    }

    if(mode==="modal"){
        return (
            <>Modal</>
        )
    }
    return (
        <span onClick={()=> handleLoginClick()}>
            {children}
        </span>
    )
}