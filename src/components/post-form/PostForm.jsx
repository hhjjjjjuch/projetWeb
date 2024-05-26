import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from ".."; // Assuming your custom components are still used
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
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
                    name="title" // Named title
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    name="slug" // Named slug
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    name="content" // Named content
                />
            </div>
            <div className="w-1/3 px-2">
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <div className="mb-5" style={{ background: "white" }}>
                    <label className="block mb-2" style={{ fontSize: "30px", marginRight: "500px" }}>
                        Publish:
                    </label>
                    <label className="block mb-2 font-bold" style={{ fontSize: "15px", marginRight: "350px" }}>
                        Status:
                    </label>
                    <label className="block mb-2 font-bold" style={{ fontSize: "15px", marginRight: "350px" }}>
                        Visibility:
                    </label>
                    <Input
                        style={{ alignItems: "10px" }}
                        label="Upload Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                        name="image" // Named image
                    />
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="submit"
                            className="w-full"
                            name="save_draft"
                            style={{ textAlign: "left", paddingLeft: "9px", background: "white", color: "green", width: "130px", marginRight: "auto" }}
                        >
                            Save as Draft
                        </Button>
                        <Button
                            type="submit"
                            className="w-full"
                            style={{ background: "green", color: "white", fontSize: "20px", width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}
                            name="update_or_submit"
                        >
                            {post ? "Update" : "Submit"}
                        </Button>
                    </div>
                </div>
                <div className="mb-4" style={{ background: "white" }}>
                    <label className="block mb-2" style={{ fontSize: "30px", marginRight: "500px" }}>
                        Category:
                    </label>
                    <div className="flex flex-col items-start">
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="art"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "art"}
                                name="category" // Named category
                            />
                            Art
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="science"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "science"}
                                name="category" // Named category
                            />
                            Science
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="technology"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "technology"}
                                name="category" // Named category
                            />
                            Technology
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="cinema"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "cinema"}
                                name="category" // Named category
                            />
                            Cinema
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="Design"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "design"}
                                name="category" // Named category
                            />
                            Design
                        </label>
                        <label className="mb-2">
                            <input
                                type="radio"
                                value="Food"
                                {...register("category", { required: true })}
                                defaultChecked={getValues("category") === "food"}
                                name="category" // Named category
                            />
                            Food
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
}
