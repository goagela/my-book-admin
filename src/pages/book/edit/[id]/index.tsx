import BookForm from "@/components/BookForm";
import Content from "@/components/Content";

export default function Home() {
  return (
    <Content title='图书添加'>
      <BookForm></BookForm>
    </Content>
  )
}