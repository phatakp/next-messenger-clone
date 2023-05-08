import { AuthForm } from "@/app/(site)/components/AuthForm";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    height={48}
                    width={48}
                    className="w-auto mx-auto"
                />

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                    Sign in to you account
                </h2>
            </div>

            <AuthForm />
        </main>
    );
}
