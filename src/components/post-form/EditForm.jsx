import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from ".."; // Assuming your custom components are still used
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            category: post?.category || "art",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-2">Category:</label>
                    <div className="flex flex-col items-start">
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="art"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "art"}
                            />
                            Art
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="science"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "science"}
                            />
                            Science
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="technology"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "technology"}
                            />
                            Technology
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="cinema"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "cinema"}
                            />
                            Cinema
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="design"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "design"}
                            />
                            Design
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="food"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "food"}
                            />
                            Food
                        </label>
                    </div>
                </div>
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
