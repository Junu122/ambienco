import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Heart, 
  MessageCircle, 
  Clock, 
  User,
  Send,
  Filter,
  TrendingUp,
  Sparkles,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { projectId } from '../utils/supabase/info';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  likes: number;
  replies: Reply[] | number; // Handle both array (from backend) and number (for display)
  repliesData?: Reply[]; // Store actual replies
  isLiked?: boolean;
}

interface Reply {
  id: string;
  postId?: string;
  content: string;
  author: string;
  createdAt: string;
}

export function ForumSection() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General', author: '' });
  const [newReply, setNewReply] = useState({ content: '', author: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-52299eb6`;

  const categories = ['All', 'General', 'Product Questions', 'Installation', 'Technical Support', 'Lighting Design', 'Smart Home'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBase}/forum/posts`);
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        // Map backend data to frontend structure if needed
        const mappedPosts = result.data.map((post: any) => ({
          ...post,
          likes: post.likes || 0,
          replies: Array.isArray(post.replies) ? post.replies.length : (post.replies || 0),
          repliesData: post.replies || [] // Store actual replies
        }));
        setPosts(mappedPosts);
      } else {
        // Fallback to demo data if backend is empty or fails
        console.warn('Using demo data as backend returned no posts');
        setPosts(demoPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load forum posts. Using offline mode.');
      setPosts(demoPosts);
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async () => {
    if (!newPost.title || !newPost.content || !newPost.author) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch(`${apiBase}/forum/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          author: newPost.author,
          category: newPost.category,
          likes: 0
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Discussion started successfully!');
        setNewPost({ title: '', content: '', category: 'General', author: '' });
        setIsCreatePostOpen(false);
        fetchPosts(); // Refresh list
      } else {
        throw new Error(result.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const createReply = async () => {
    if (!newReply.content || !newReply.author || !selectedPost) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch(`${apiBase}/forum/posts/${selectedPost.id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newReply.content,
          author: newReply.author
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Reply posted successfully!');
        
        // Add reply to local state for immediate feedback
        const newReplyObj = result.data;
        setReplies([...replies, newReplyObj]);
        setNewReply({ content: '', author: '' });
        
        // Update post reply count in the list
        setPosts(posts.map(post => 
          post.id === selectedPost.id 
            ? { ...post, replies: (typeof post.replies === 'number' ? post.replies : 0) + 1 }
            : post
        ));
      } else {
        throw new Error(result.error || 'Failed to post reply');
      }
    } catch (error) {
      console.error('Error creating reply:', error);
      toast.error('Failed to post reply. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo posts for fallback
  const demoPosts: ForumPost[] = [
    {
      id: 'post-1',
      title: 'Best LED Strip Installation Practices for Saudi Arabia Climate',
      content: 'I\'m planning to install LED strips in my Riyadh home. What are the best practices for installation in our hot climate? Any specific considerations for heat management?',
      author: 'Ahmed K.',
      category: 'Installation',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      likes: 24,
      replies: 3,
      isLiked: false
    },
    // ... (keep one demo post for brevity in code, but in reality we might want more)
  ];

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    // If post has replies data from backend, use it
    if (post.repliesData && Array.isArray(post.repliesData)) {
      setReplies(post.repliesData);
    } else {
      // Otherwise fetch or use demo replies (simplified here)
      setReplies([]);
    }
  };

  const likePost = (postId: string) => {
    // Optimistic update
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1, isLiked: true }
        : post
    ));
    // In a real app, we would also send this to backend
  };


  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="forum" className="py-20 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 backdrop-blur-sm relative"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <MessageSquare className="w-10 h-10 text-blue-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4">
            Community Forum
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-4">
            Connect with lighting professionals and enthusiasts across Saudi Arabia. Share knowledge, ask questions, and discover innovative solutions.
          </p>
          <p className="text-sm text-green-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-2" />
            Interactive demo - Join the conversation!
          </p>
        </motion.div>

        {/* Forum Header */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search and Filter */}
          <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800/50 border border-slate-600 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Create Post Button */}
          <Button
            onClick={() => setIsCreatePostOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Discussion
          </Button>
        </div>

        {/* Forum Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          likePost(post.id);
                        }}
                        className={`flex items-center space-x-1 text-xs ${
                          post.isLiked ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'
                        } transition-colors`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-3 h-3 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </motion.button>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MessageCircle className="w-3 h-3" />
                        <span>{typeof post.replies === 'number' ? post.replies : (Array.isArray(post.replies) ? post.replies.length : 0)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading discussions...</p>
          </div>
        )}

        {!isLoading && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No discussions found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter!</p>
          </div>
        )}

        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-amber-400 mr-2" />
            <h3 className="text-lg font-semibold text-foreground">Trending Topics</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { topic: 'Smart LED Installation', discussions: 45 },
              { topic: 'Energy Efficiency Tips', discussions: 38 },
              { topic: 'Color Temperature Guide', discussions: 32 }
            ].map(({ topic, discussions }, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-amber-500/10 to-blue-500/10 rounded-lg p-4 border border-slate-600 hover:border-amber-500/50 transition-colors cursor-pointer"
              >
                <div className="text-sm font-medium text-foreground">{topic}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {discussions} discussions
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreatePostOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsCreatePostOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-xl p-6 w-full max-w-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Start New Discussion
                <span className="text-sm text-green-400 font-normal ml-2">(Interactive Demo)</span>
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your name"
                    value={newPost.author}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                    className="bg-slate-800 border-slate-600"
                  />
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-sm"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <Input
                  placeholder="Discussion title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="bg-slate-800 border-slate-600"
                />
                <Textarea
                  placeholder="Share your thoughts, ask questions, or start a discussion..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="bg-slate-800 border-slate-600 min-h-[120px]"
                />
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreatePostOpen(false)}
                    className="border-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button onClick={createPost} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Post Discussion
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-2">
                    {selectedPost.category}
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground">{selectedPost.title}</h2>
                  <p className="text-xs text-green-400 mt-1">Interactive demo with sample replies</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)}>
                  ✕
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {selectedPost.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{selectedPost.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">{selectedPost.content}</p>
              
              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Replies ({replies.length})
                </h3>
                
                {/* Reply Form */}
                <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <Input
                    placeholder="Your name"
                    value={newReply.author}
                    onChange={(e) => setNewReply({...newReply, author: e.target.value})}
                    className="mb-3 bg-slate-800 border-slate-600"
                  />
                  <Textarea
                    placeholder="Write your reply..."
                    value={newReply.content}
                    onChange={(e) => setNewReply({...newReply, content: e.target.value})}
                    className="mb-3 bg-slate-800 border-slate-600"
                  />
                  <Button onClick={createReply} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
                
                {/* Replies List */}
                <div className="space-y-4">
                  {replies.map((reply, index) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-slate-800/30 rounded-lg border border-slate-700"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-amber-600 text-white text-xs">
                            {reply.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm text-foreground">{reply.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{reply.content}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}