"use client";

import { AuthSocialButton } from "@/app/(site)/components/AuthSocialButton";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/inputs/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

interface IAuthFormProps {}

type Variant = "LOGIN" | "REGISTER";

export const AuthForm: FC<IAuthFormProps> = (props) => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session.status === "authenticated") router.push("/users");
    }, [session, router]);

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") setVariant("REGISTER");
        else setVariant("LOGIN");
    }, [variant]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            axios
                .post("/api/register", data)
                .then(() => signIn("credentials", data))
                .catch(() => toast.error("Something went wrong"))
                .finally(() => setIsLoading(false));
        }

        if (variant === "LOGIN") {
            signIn("credentials", { ...data, redirect: false })
                .then((callback) => {
                    if (callback?.error) toast.error("Invalid Credentials");
                    if (callback?.ok && !callback.error) {
                        toast.success("Logged In");
                        router.push("/users");
                    }
                })
                .finally(() => setIsLoading(false));
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) toast.error("Invalid Credentials");
                if (callback?.ok && !callback.error) {
                    toast.success("Logged In");
                    router.push("/users");
                }
            })
            .finally(() => setIsLoading(false));
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}

                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />

                    <Button disabled={isLoading} fullWidth type="submit">
                        {variant === "LOGIN" ? "Sign In" : "Register"}
                    </Button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-500 bg-white">
                                Or Continue with
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction("github")}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction("google")}
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500">
                    <div>
                        {variant === "LOGIN"
                            ? "New to Messenger"
                            : "Already a Member"}
                    </div>
                    <div
                        className="text-gray-500 underline cursor-pointer"
                        onClick={toggleVariant}
                    >
                        {variant === "LOGIN" ? "Create an Account" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    );
};
