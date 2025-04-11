
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BlogPostCard } from "@/components/BlogPostCard";
import { BlogCategories } from "@/components/BlogCategories";
import { Newsletter } from "@/components/Newsletter";
import { Separator } from "@/components/ui/separator";
import { Search } from 'lucide-react';

interface Post {
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

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for demo
  const posts: Post[] = [
    {
      id: "1",
      title: "Bắt đầu với React và TypeScript trong năm 2025",
      excerpt: "Khám phá các tính năng mới nhất và cách tạo ứng dụng hiện đại với React và TypeScript",
      date: "2025-04-05",
      author: {
        name: "Nguyễn Văn A",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Lập trình",
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
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
    {
      id: "4",
      title: "Quản lý trạng thái toàn cục với Redux Toolkit",
      excerpt: "Cách tốt nhất để quản lý trạng thái ứng dụng phức tạp trong React",
      date: "2025-03-25",
      author: {
        name: "Phạm Thị D",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Redux",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "5",
      title: "Xây dựng API với Node.js và Express",
      excerpt: "Hướng dẫn từng bước để tạo một RESTful API bằng Node.js và Express",
      date: "2025-03-20",
      author: {
        name: "Hoàng Minh E",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Backend",
      coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "6",
      title: "Bảo mật trong ứng dụng web hiện đại",
      excerpt: "Các phương pháp bảo mật tốt nhất để bảo vệ ứng dụng web của bạn khỏi các mối đe dọa",
      date: "2025-03-15",
      author: {
        name: "Vũ Hoài F",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Bảo mật",
      coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => 
      (category === 'all' || post.category === category) &&
      (post.title.toLowerCase().includes(search.toLowerCase()) || 
       post.excerpt.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  const categories = ['Lập trình', 'Hiệu suất', 'UI/UX', 'Redux', 'Backend', 'Bảo mật'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Khám phá những bài viết mới nhất về lập trình, phát triển web và thiết kế UI/UX
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-3/4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất trước</SelectItem>
                  <SelectItem value="oldest">Cũ nhất trước</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Không tìm thấy bài viết nào</h3>
              <p className="text-muted-foreground">Vui lòng thử lại với từ khóa khác hoặc danh mục khác.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="lg:w-1/4">
          <BlogCategories />
          <Separator className="my-8" />
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Blog;
