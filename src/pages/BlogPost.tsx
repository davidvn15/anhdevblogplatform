
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BlogPostCard } from "@/components/BlogPostCard";
import { BlogCategories } from "@/components/BlogCategories";
import { Newsletter } from "@/components/Newsletter";
import { Share, MessageCircle, ThumbsUp, Facebook, Twitter, Linkedin, Link as LinkIcon, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
  likes: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  coverImage: string;
  tags: string[];
  comments: Comment[];
}

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  coverImage: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();
  
  // Mock data for demo
  const post: Post = {
    id: "1",
    title: "Bắt đầu với React và TypeScript trong năm 2025",
    content: `
      <p>React và TypeScript là một sự kết hợp mạnh mẽ đang trở thành tiêu chuẩn trong phát triển frontend hiện đại. Bài viết này sẽ hướng dẫn bạn về cách bắt đầu với React và TypeScript trong năm 2025, khi cả hai công nghệ đã có nhiều cải tiến đáng kể.</p>
      
      <h2>Tại sao nên sử dụng TypeScript với React?</h2>
      <p>TypeScript cung cấp kiểu dữ liệu tĩnh cho JavaScript, giúp phát hiện lỗi sớm hơn trong quá trình phát triển. Khi kết hợp với React, TypeScript mang lại nhiều lợi ích:</p>
      <ul>
        <li>Phát hiện lỗi sớm hơn trong quá trình phát triển</li>
        <li>Trải nghiệm phát triển tốt hơn với IntelliSense và auto-completion</li>
        <li>Refactoring code an toàn và dễ dàng hơn</li>
        <li>Documentation tốt hơn cho các components và props</li>
      </ul>
      
      <h2>Thiết lập môi trường phát triển</h2>
      <p>Với sự phát triển của các công cụ hiện đại, việc thiết lập môi trường phát triển React + TypeScript trở nên dễ dàng hơn bao giờ hết. Cách đơn giản nhất là sử dụng Vite:</p>
      <pre><code>npm create vite@latest my-react-ts-app -- --template react-ts</code></pre>
      <p>Hoặc nếu bạn muốn sử dụng Create React App (mặc dù nó đang dần được thay thế bởi các tool hiện đại hơn):</p>
      <pre><code>npx create-react-app my-app --template typescript</code></pre>
      
      <h2>Các khái niệm cơ bản khi làm việc với TypeScript trong React</h2>
      <h3>1. Định nghĩa props cho components</h3>
      <p>Một trong những việc phổ biến nhất khi sử dụng TypeScript với React là định nghĩa kiểu dữ liệu cho props:</p>
      <pre><code>
      interface ButtonProps {
        text: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary' | 'danger';
        disabled?: boolean;
      }
      
      const Button: React.FC<ButtonProps> = ({
        text,
        onClick,
        variant = 'primary',
        disabled = false
      }) => {
        return (
          &lt;button
            onClick={onClick}
            disabled={disabled}
            className={\`btn btn-\${variant}\`}
          &gt;
            {text}
          &lt;/button&gt;
        );
      };
      </code></pre>
      
      <h3>2. Các hooks với TypeScript</h3>
      <p>TypeScript có thể cải thiện đáng kể trải nghiệm khi làm việc với React hooks:</p>
      <pre><code>
      // useState với kiểu dữ liệu rõ ràng
      const [count, setCount] = useState<number>(0);
      
      // useReducer với kiểu dữ liệu đầy đủ
      interface State {
        count: number;
        text: string;
      }
      
      type Action =
        | { type: 'INCREMENT' }
        | { type: 'DECREMENT' }
        | { type: 'SET_TEXT'; payload: string };
      
      const reducer = (state: State, action: Action): State => {
        switch (action.type) {
          case 'INCREMENT':
            return { ...state, count: state.count + 1 };
          case 'DECREMENT':
            return { ...state, count: state.count - 1 };
          case 'SET_TEXT':
            return { ...state, text: action.payload };
        }
      };
      
      const [state, dispatch] = useReducer(reducer, { count: 0, text: '' });
      </code></pre>
      
      <h2>Best practices trong năm 2025</h2>
      <p>Dưới đây là một số best practices khi làm việc với React và TypeScript trong năm 2025:</p>
      <ul>
        <li>Sử dụng functional components thay vì class components</li>
        <li>Tận dụng React.FC cho các component đơn giản</li>
        <li>Sử dụng interface cho props, state và context</li>
        <li>Tách biệt các kiểu dữ liệu phức tạp vào các file riêng</li>
        <li>Sử dụng generic types cho các hooks và components tái sử dụng</li>
        <li>Tận dụng các utility types của TypeScript như Partial, Required, Pick, Omit, etc.</li>
      </ul>
      
      <h2>Kết luận</h2>
      <p>Trong năm 2025, sự kết hợp giữa React và TypeScript tiếp tục là lựa chọn hàng đầu cho các dự án frontend hiện đại. Với những tiến bộ về công cụ và ecosystem, việc phát triển ứng dụng trở nên hiệu quả và an toàn hơn. Bắt đầu áp dụng TypeScript vào dự án React của bạn ngay từ hôm nay để tận hưởng những lợi ích mà nó mang lại.</p>
    `,
    excerpt: "Khám phá các tính năng mới nhất và cách tạo ứng dụng hiện đại với React và TypeScript",
    date: "2025-04-05",
    readTime: "8 phút đọc",
    author: {
      name: "Nguyễn Văn A",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      bio: "Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển web. Chuyên gia về React và TypeScript.",
    },
    category: "Lập trình",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "TypeScript", "Frontend", "JavaScript", "Web Development"],
    comments: [
      {
        id: "c1",
        author: {
          name: "Trần Thị B",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        },
        date: "2025-04-06",
        content: "Bài viết rất hữu ích! Tôi đã học được nhiều điều mới về cách sử dụng TypeScript với React.",
        likes: 3,
      },
      {
        id: "c2",
        author: {
          name: "Lê Văn C",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        },
        date: "2025-04-05",
        content: "Tôi đã áp dụng những kỹ thuật trong bài viết này vào dự án của mình và thấy hiệu quả rõ rệt. Cảm ơn tác giả!",
        likes: 5,
      }
    ],
  };

  const relatedPosts: RelatedPost[] = [
    {
      id: "2",
      title: "Tối ưu hóa hiệu suất trong ứng dụng React",
      excerpt: "Các kỹ thuật và phương pháp để cải thiện tốc độ và trải nghiệm người dùng",
      date: "2025-04-01",
      author: {
        name: "Trần Thị B",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Hiệu suất",
      coverImage: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "3",
      title: "Thiết kế UI/UX hiện đại với Tailwind CSS",
      excerpt: "Tạo giao diện đẹp mắt và đáp ứng nhanh với Tailwind CSS",
      date: "2025-03-28",
      author: {
        name: "Lê Văn C",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "UI/UX",
      coverImage: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      toast({
        title: "Bình luận đã được gửi",
        description: "Bình luận của bạn đang chờ phê duyệt."
      });
      setCommentText('');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: "Đường dẫn đã được sao chép",
            description: "Đường dẫn bài viết đã được sao chép vào clipboard."
          });
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2 flex items-center">
            <Link to={`/categories/${post.category}`} className="hover:text-primary">{post.category}</Link>
            <span className="mx-2">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/author/${post.author.name}`} className="font-medium hover:text-primary">{post.author.name}</Link>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-auto rounded-lg object-cover" 
          />
        </div>

        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <Link 
                key={tag} 
                to={`/tags/${tag}`} 
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Thích
              </Button>
              <Button variant="outline" size="sm" onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}>
                <MessageCircle className="h-4 w-4 mr-2" />
                {post.comments.length} Bình luận
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Chia sẻ:</span>
              <Button variant="ghost" size="icon" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('twitter')}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('copy')}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-muted rounded-lg mb-12">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
          <Button>Theo dõi</Button>
        </div>

        <div id="comments" className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Bình luận ({post.comments.length})</h3>
          
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <Textarea
              placeholder="Viết bình luận của bạn..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <Button type="submit" disabled={!commentText.trim()}>Gửi bình luận</Button>
          </form>
          
          {post.comments.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div key={comment.id} className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{comment.author.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="mb-2">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm">Phản hồi</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          )}
        </div>
      </article>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Bài viết liên quan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Newsletter />
        </div>
        <div className="md:col-span-1">
          <BlogCategories />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
