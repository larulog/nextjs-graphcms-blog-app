import React from "react";
import Image from "next/image";
import moment from "moment";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8 p-5">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            layout="fill"
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-8">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          width="100%"
          height="20rem"
          layout="fill"
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg cursor-pointer transition duration-400 hover:scale-[1.09]"
        />
      </div>
      <div className="block lg:flex text-center items-center justify-center mb-8">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-2">
          <Image
            src={post.author.photo.url}
            alt={post.author.name}
            width="40px"
            height="40px"
            layout="fixed"
            className="align-middle rounded-full"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 lg:ml-5 lg:mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <h1 className="mb-4 text-3xl font-semibold text-center">{post.title}</h1>
      {/* {console.log(post.content.raw)} */}
      {post.content.raw.children.map((typeObj, index) => {
        const children = typeObj.children.map((item, itemIndex) =>
          getContentFragment(itemIndex, item.text, item)
        );

        return getContentFragment(index, children, typeObj, typeObj.type);
      })}
    </div>
  );
};

export default PostDetail;
