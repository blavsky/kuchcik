"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ nazwa: "", skladniki: "", instrukcje: "", liczbaPorcji: "", czasPrzygotowania: "", zdj: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          nazwa: post?.nazwa,
          userId: session?.user.id,
          skladniki: post?.skladniki,
          instrukcje: post?.instrukcje,
          liczbaPorcji: post?.liczbaPorcji,
          czasPrzygotowania: post?.czasPrzygotowania,
          zdj: post?.zdj,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
