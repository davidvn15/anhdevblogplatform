import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  PenLine,
  FilterX,
  ArrowUpDown
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Post {
  id: string;
  title: string;
  status: 'draft' | 'published';
  category: string;
  author: string;
  date: string;
  views: number;
  comments: number;
}

export const AdminPostList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  
  const posts: Post[] = [
    { id: "1", title: "Bắt đầu với React và TypeScript", status: "published", category: "Lập trình", author: "Admin", date: "2025-04-05", views: 1205, comments: 25 },
    { id: "2", title: "Tối ưu hóa hiệu suất trong React", status: "published", category: "Hiệu suất", author: "Admin", date: "2025-04-01", views: 843, comments: 12 },
    { id: "3", title: "Thiết kế UI/UX với Tailwind CSS", status: "published", category: "UI/UX", author: "Editor", date: "2025-03-28", views: 725, comments: 8 },
    { id: "4", title: "Quản lý trạng thái với Redux Toolkit", status: "draft", category: "Redux", author: "Admin", date: "2025-03-25", views: 0, comments: 0 },
    { id: "5", title: "Xây dựng API với Node.js", status: "draft", category: "Backend", author: "Editor", date: "2025-03-20", views: 0, comments: 0 },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearchTerm = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearchTerm && matchesStatus;
  });

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedPosts(filteredPosts.map(post => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPosts([...selectedPosts, id]);
    } else {
      setSelectedPosts(selectedPosts.filter(postId => postId !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Bài viết</CardTitle>
              <CardDescription>Quản lý tất cả bài viết trong blog của bạn.</CardDescription>
            </div>
            <Button asChild>
              <Link to="/admin/create-post">
                <FileText className="mr-2 h-4 w-4" />
                Tạo bài viết mới
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm bài viết..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="published">Đã xuất bản</SelectItem>
                    <SelectItem value="draft">Bản nháp</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}>
                  <FilterX className="mr-2 h-4 w-4" />
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center space-x-1">
                        <span>Tiêu đề</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead className="text-right">Lượt xem</TableHead>
                    <TableHead className="text-right">Bình luận</TableHead>
                    <TableHead className="text-right w-24">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map(post => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedPosts.includes(post.id)}
                          onCheckedChange={(checked) => handleSelectPost(post.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs ${
                          post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </span>
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{post.comments}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredPosts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <div className="flex flex-col items-center">
                          <PenLine className="h-12 w-12 text-muted-foreground mb-3" />
                          <h3 className="text-lg font-medium mb-1">Không tìm thấy bài viết nào</h3>
                          <p className="text-muted-foreground mb-4">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
                          <Button onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('all');
                          }}>
                            <FilterX className="mr-2 h-4 w-4" />
                            Xóa bộ lọc
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedPosts.length > 0 ? (
              <>Đã chọn {selectedPosts.length} bài viết</>
            ) : (
              <>Hiển thị {filteredPosts.length} trong tổng số {posts.length} bài viết</>
            )}
          </div>
          {selectedPosts.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Chỉnh sửa
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Xóa
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
