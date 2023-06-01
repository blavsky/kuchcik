"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const WriteIngredients = ({ post }) => {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])

  return (
    <div>
      <div className='font-satoshi font-bold text-gray-900 text-lg pt-3'>
        {post?.nazwa}
      </div>
      <div className='font-satoshi font-medium text-gray-900 text-lg'>
        Składniki
      </div>
      <div style={{whiteSpace: 'pre-line'}} className='font-inter text-sm text-gray-600'>
        {post?.skladniki}
      </div>
      <div className='font-satoshi font-medium text-gray-900 text-lg'>
        Instrukcje
      </div>
      <div style={{whiteSpace: 'pre-line'}} className='font-inter text-sm text-gray-600'>
        {post?.instrukcje}
      </div>
      <div className='font-satoshi font-medium text-gray-900 text-lg'>
        Liczba porcji: 
        <span className='font-inter font-normal text-gray-600 pl-1'> 
          {post?.liczbaPorcji}
        </span>
      </div>
      <div className='font-satoshi font-medium text-gray-900 text-lg'>
        Czas przygotowania:
        <span className='font-inter font-normal text-gray-600 pl-1'> 
          {post?.czasPrzygotowania}
        </span>
      </div>
      <div>
        <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
          <img src={post?.zdj} alt="photo"/>
        </ControlledZoom>
      </div>
    </div>
  );
}

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
      <div>
        <div className='flex justify-between items-start gap-5 text-xs'>
          <div
            className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
            onClick={handleProfileClick}
          >
            <Image
              src={post.creator?.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />

            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-gray-900'>
                {post.creator?.username}
              </h3>
              <p className='font-inter text-sm text-gray-500'>
                {post.creator?.email}
              </p>
            </div>
          </div>

          <div className='copy_btn' onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
              width={12}
              height={12}
            />
          </div>
        </div>

        <WriteIngredients post={post} />
        {/* <p
          className='font-inter text-sm blue_gradient cursor-pointer'
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p> */}

        {session?.user.id === post.creator?._id && pathName === "/profile" && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p
              className='font-inter text-sm green_gradient cursor-pointer'
              onClick={handleEdit}
            >
              Edytuj
            </p>
            <p
              className='font-inter text-sm orange_gradient cursor-pointer'
              onClick={handleDelete}
            >
              Usuń
            </p>
          </div>
        )}
    </div>
  </div>
  );
};

export default PromptCard;
