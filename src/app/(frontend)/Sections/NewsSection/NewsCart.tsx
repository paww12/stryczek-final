interface NewsCartProps {
  slide: string
}

const NewsCart: React.FC<NewsCartProps> = ({ slide }) => {
  return <div>NewsCart {slide}</div>
}

export default NewsCart
