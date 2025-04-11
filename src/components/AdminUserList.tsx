
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Users,
  Edit,
  Trash2,
  Mail,
  FilterX,
  ArrowUpDown,
  UserPlus
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'subscriber';
  avatar: string;
  posts: number;
  comments: number;
  joinDate: string;
  lastActive: string;
}

export const AdminUserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Mock data for demonstration
  const users: User[] = [
    { id: "1", name: "Admin", email: "admin@example.com", role: "admin", avatar: "https://github.com/shadcn.png", posts: 15, comments: 32, joinDate: "2024-01-01", lastActive: "2025-04-10" },
    { id: "2", name: "Nguyễn Văn A", email: "nguyena@example.com", role: "author", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36", posts: 8, comments: 17, joinDate: "2025-02-15", lastActive: "2025-04-09" },
    { id: "3", name: "Trần Thị B", email: "tranb@example.com", role: "author", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", posts: 6, comments: 24, joinDate: "2025-03-01", lastActive: "2025-04-08" },
    { id: "4", name: "Lê Văn C", email: "lec@example.com", role: "subscriber", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", posts: 0, comments: 12, joinDate: "2025-03-15", lastActive: "2025-04-05" },
    { id: "5", name: "Phạm Thị D", email: "phamd@example.com", role: "subscriber", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", posts: 0, comments: 8, joinDate: "2025-04-01", lastActive: "2025-04-07" },
  ];

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearchTerm && matchesRole;
  });

  // Handle select all
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle individual select
  const handleSelectUser = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Người dùng</h2>
          <p className="text-muted-foreground">Quản lý tất cả người dùng trong hệ thống.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="author">Tác giả</SelectItem>
              <SelectItem value="subscriber">Người đăng ký</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setRoleFilter('all');
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
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Người dùng</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead className="text-right">Bài viết</TableHead>
              <TableHead className="text-right">Bình luận</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead>Hoạt động cuối</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-md text-xs ${
                    user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 
                    user.role === 'author' ? 'bg-purple-100 text-purple-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 
                     user.role === 'author' ? 'Tác giả' : 
                     'Người đăng ký'}
                  </span>
                </TableCell>
                <TableCell className="text-right">{user.posts}</TableCell>
                <TableCell className="text-right">{user.comments}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Mail className="h-4 w-4" />
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
            
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <Users className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">Không tìm thấy người dùng nào</h3>
                    <p className="text-muted-foreground mb-4">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
                    <Button onClick={() => {
                      setSearchTerm('');
                      setRoleFilter('all');
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

      {selectedUsers.length > 0 && (
        <div className="flex justify-between items-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Đã chọn {selectedUsers.length} người dùng
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-1" />
              Gửi email
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Chỉnh sửa
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Xóa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
