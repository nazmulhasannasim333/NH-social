// import Link from "next/link";

// type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// };

// type MessagePageProps = {
//   data?: Post;
// };

// const MessagePage: React.FC<MessagePageProps> = ({ data }) => {
//   console.log("from server", data);
//   return (
//     <div>
//       <Link href="/">Home</Link>
//       <h1 className="text-blue-600 text-2xl">Message Page {data?.title}</h1>
//     </div>
//   );
// };

// export const getServerSideProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//   return { props: { data } };
// };

// export default MessagePage;
