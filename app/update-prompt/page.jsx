"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ nazwa: "", skladniki: "", instrukcje: "", liczbaPorcji: "", czasPrzygotowania: "", zdj: "",});
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        nazwa: data?.nazwa,
        skladniki: data?.skladniki,
        instrukcje: data?.instrukcje,
        liczbaPorcji: data?.liczbaPorcji,
        czasPrzygotowania: data?.czasPrzygotowania,
        zdj: data?.zdj,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          nazwa: post?.nazwa,
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
      type='Edytuj'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
